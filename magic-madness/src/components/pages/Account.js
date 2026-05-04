import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../../utils/firebase';
import { useAuth } from '../../AuthContext';
import './Decks.css';

function Account() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [decks, setDecks] = useState([]);
  const [loadingDecks, setLoadingDecks] = useState(false);
  const [error, setError] = useState('');
  const [editDeckId, setEditDeckId] = useState(null);
  const [editDeckData, setEditDeckData] = useState({
    commander: '',
    archetype: '',
    decklistLink: '',
    powerLevel: 5,
    onlineOnly: false,
    notes: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editNickname, setEditNickname] = useState('');

  useEffect(() => {
    if (profile) {
      setEditNickname(profile.nickname ?? profile.username ?? '');
    }
  }, [profile]);

  useEffect(() => {
    if (user && profile) {
      fetchDecks();
    }
  }, [user, profile]);

  const handleEditChange = (field, value) => {
    setEditDeckData(prev => ({ ...prev, [field]: value }));
  };

  const startEdit = (deck) => {
    setEditDeckId(deck.id);
    setEditDeckData({
      commander: deck.commander ?? '',
      archetype: deck.archetype ?? '',
      decklistLink: deck.decklistLink ?? '',
      powerLevel: deck.powerLevel ?? 5,
      onlineOnly: deck.onlineOnly ?? false,
      notes: deck.notes ?? ''
    });
  };

  const cancelEdit = () => {
    setEditDeckId(null);
    setEditDeckData({
      commander: '',
      archetype: '',
      decklistLink: '',
      powerLevel: 5,
      onlineOnly: false,
      notes: ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editDeckId) return;

    try {
      const deckRef = doc(db, 'decks', editDeckId);
      await updateDoc(deckRef, {
        commander: editDeckData.commander,
        archetype: editDeckData.archetype,
        decklistLink: editDeckData.decklistLink,
        powerLevel: editDeckData.powerLevel,
        onlineOnly: editDeckData.onlineOnly,
        notes: editDeckData.notes
      });
      setEditDeckId(null);
      fetchDecks();
      setError('');
    } catch (err) {
      console.error('Error updating deck:', err);
      setError('Unable to save deck changes.');
    }
  };

  const handleProfileSave = async () => {
    if (!user) return;

    const newNickname = editNickname.trim();
    if (!newNickname) {
      setError('Nickname cannot be empty.');
      return;
    }

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: newNickname,
        });
      }

      await updateDoc(doc(db, 'users', user.uid), {
        nickname: newNickname,
      });

      if (profile?.username) {
        const usernameDoc = doc(db, 'usernames', profile.username);
        await updateDoc(usernameDoc, {
          nickname: newNickname,
        });
      }

      await refreshProfile(user);
      setIsEditingProfile(false);
      setError('');
    } catch (err) {
      console.error('Error saving profile changes:', err);
      setError('Unable to save profile updates.');
    }
  };

  const handleDelete = async (deckId) => {
    try {
      await deleteDoc(doc(db, 'decks', deckId));
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
      if (editDeckId === deckId) {
        cancelEdit();
      }
      setError('');
    } catch (err) {
      console.error('Error deleting deck:', err);
      setError('Unable to delete deck.');
    }
  };

  const fetchDecks = async () => {
    try {
      setLoadingDecks(true);
      const decksRef = collection(db, 'decks');
      const querySnapshot = await getDocs(decksRef);
      const ownerKey = (profile?.username || user.email || '').toString().trim().toLowerCase();
      const userDecks = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const owner = (data.owner || data.ownerUsername || '').toString().trim().toLowerCase();
        if (owner && owner === ownerKey) {
          userDecks.push({ id: doc.id, ...data });
        }
      });

      setDecks(userDecks);
      setError('');
    } catch (err) {
      console.error('Error fetching account decks:', err);
      setError('Unable to load your decks.');
    } finally {
      setLoadingDecks(false);
    }
  };

  if (loading) {
    return <div className='decks-container'><p className='loading'>Loading account...</p></div>;
  }

  if (!user) {
    return (
      <div className='decks-container'>
        <h1 className='decks-title'>Account</h1>
        <p className='no-decks'>Please log in to view your decks.</p>
      </div>
    );
  }

  const nickname = profile?.nickname ?? profile?.username ?? user.email ?? 'Player';
  const memberSince = profile?.createdAt?.seconds ? new Date(profile.createdAt.seconds * 1000) : profile?.createdAt ? new Date(profile.createdAt) : null;
  const subtitle = profile?.username ? `@${profile.username}` : user.email;

  return (
    <div className='decks-container account-page'>
      <div className='account-panel'>
        <div className='profile-card'>
          <div className='profile-avatar'>
            {user.photoURL ? (
              <img src={user.photoURL} alt={`${nickname}'s avatar`} />
            ) : (
              nickname.charAt(0).toUpperCase()
            )}
          </div>
          <div className='profile-details'>
            <div className='profile-header-row'>
              <div>
                <h1>{nickname}</h1>
                <p className='profile-handle'>{subtitle}</p>
              </div>
              <button
                type='button'
                className='action-btn profile-edit-toggle'
                onClick={() => {
                  if (isEditingProfile) {
                    setIsEditingProfile(false);
                    setEditNickname(profile?.nickname || profile?.username || '');
                  } else {
                    setIsEditingProfile(true);
                  }
                }}
              >
                {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
            <p>{user.email}</p>
            {memberSince && <p>Member since {memberSince.toLocaleDateString()}</p>}
          </div>
        </div>
        {isEditingProfile && (
          <div className='profile-edit-panel'>
            <div className='form-group'>
              <label htmlFor='edit-nickname'>Nickname</label>
              <input
                id='edit-nickname'
                type='text'
                value={editNickname ?? ''}
                onChange={(e) => setEditNickname(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <button type='button' className='submit-btn' onClick={handleProfileSave}>
                Save Profile
              </button>
              <button
                type='button'
                className='submit-btn cancel-btn'
                onClick={() => {
                  setIsEditingProfile(false);
                  setEditNickname(profile?.nickname ?? profile?.username ?? '');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <h2 className='decks-title'>Your Decks</h2>
      <p className='account-subtitle'>Showing decks created by {nickname}</p>
      {error && <div className='error-message'>{error}</div>}
      {loadingDecks ? (
        <p className='loading'>Loading your decks...</p>
      ) : decks.length === 0 ? (
        <p className='no-decks'>No decks found for your account.</p>
      ) : (
        <>
          {editDeckId && (
            <div className='account-edit-panel'>
              <h2>Edit Deck</h2>
              <div className='deck-form'>
                <div className='form-group'>
                  <label htmlFor='edit-commander'>Commander</label>
                  <input
                    id='edit-commander'
                    name='commander'
                    value={editDeckData.commander || ''}
                    onChange={(e) => handleEditChange('commander', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='edit-archetype'>Archetype</label>
                  <input
                    id='edit-archetype'
                    name='archetype'
                    value={editDeckData.archetype || ''}
                    onChange={(e) => handleEditChange('archetype', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='edit-decklistLink'>Decklist Link</label>
                  <input
                    id='edit-decklistLink'
                    name='decklistLink'
                    value={editDeckData.decklistLink || ''}
                    onChange={(e) => handleEditChange('decklistLink', e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='edit-powerLevel'>Power Level</label>
                  <select
                    id='edit-powerLevel'
                    name='powerLevel'
                    value={editDeckData.powerLevel ?? 5}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      handleEditChange('powerLevel', val);
                    }}
                  >
                    {[11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className='form-group checkbox-group'>
                  <label htmlFor='edit-onlineOnly'>
                    <input
                      id='edit-onlineOnly'
                      type='checkbox'
                      checked={editDeckData.onlineOnly ?? false}
                      onChange={(e) => handleEditChange('onlineOnly', e.target.checked)}
                    />
                    IRL
                  </label>
                </div>
                <div className='form-group'>
                  <label htmlFor='edit-notes'>Notes</label>
                  <textarea
                    id='edit-notes'
                    name='notes'
                    value={editDeckData.notes || ''}
                    onChange={(e) => handleEditChange('notes', e.target.value)}
                    rows='4'
                  />
                </div>
                <div className='form-row'>
                  <button type='button' className='submit-btn' onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button type='button' className='submit-btn cancel-btn' onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className='table-wrapper'>
            <table className='decks-table'>
              <thead>
                <tr>
                  <th>Creator</th>
                  <th>Archetype</th>
                  <th>Commander</th>
                  <th>Power Level</th>
                  <th>IRL</th>
                  <th>Decklist Link</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {decks.map((deck) => (
                  <tr key={deck.id}>
                    <td>{deck.ownerNickname ?? deck.owner ?? deck.ownerUsername ?? '-'}</td>
                    <td>{deck.archetype ?? '-'}</td>
                    <td>{deck.commander ?? '-'}</td>
                    <td className='power-level'>{deck.powerLevel ?? '-'}</td>
                    <td>{deck.onlineOnly ? '✓' : '✗'}</td>
                    <td>
                      {deck.decklistLink ? (
                        <a href={deck.decklistLink} target='_blank' rel='noopener noreferrer'>
                          View Deck
                        </a>
                      ) : '-'}
                    </td>
                    <td>{deck.notes ?? '-'}</td>
                    <td className='deck-actions'>
                      <button type='button' onClick={() => startEdit(deck)} className='action-btn'>Edit</button>
                      <button type='button' onClick={() => handleDelete(deck.id)} className='action-btn delete-btn'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
