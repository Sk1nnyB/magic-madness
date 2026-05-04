import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';
import './Decks.css';

const Decks = () => {
  const [formData, setFormData] = useState({
    decklistLink: '',
    powerLevel: 5,
    onlineOnly: false,
    notes: '',
    archetype: '',
    commander: ''
  });

  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    owner: '',
    powerLevel: '',
    onlineOnly: '',
    archetype: '',
    commander: ''
  });

  // Sorting
  const [sortBy, setSortBy] = useState('owner');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch decks from Firebase
  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      const decksRef = collection(db, 'decks');
      const q = query(decksRef);
      const querySnapshot = await getDocs(q);
      const decksArray = [];
      querySnapshot.forEach((doc) => {
        decksArray.push({ id: doc.id, ...doc.data() });
      });
      setDecks(decksArray);
      setError('');
    } catch (err) {
      console.error('Error fetching decks:', err);
      setError('Failed to load decks. Make sure Firebase is configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be signed in to submit decks.');
      return;
    }

    if (!formData.commander || !formData.powerLevel) {
      setError('Please fill in all required fields (Commander and Power Level)');
      return;
    }

    try {
      setSubmitting(true);
      const decksRef = collection(db, 'decks');
      await addDoc(decksRef, {
        ...formData,
        owner: profile?.username || user.email || 'anonymous',
        ownerUsername: profile?.username || user.email || 'anonymous',
        ownerNickname: profile?.nickname || profile?.username || user.email || 'anonymous',
        powerLevel: parseInt(formData.powerLevel),
        timestamp: new Date()
      });

      setFormData({
        decklistLink: '',
        powerLevel: 5,
        onlineOnly: false,
        notes: '',
        archetype: '',
        commander: ''
      });

      setError('');
      fetchDecks();
    } catch (err) {
      console.error('Error adding deck:', err);
      setError('Failed to submit deck. Make sure Firebase is configured.');
    } finally {
      setSubmitting(false);
    }
  };

  const isDeckOwner = (deck) => {
    if (!user) return false;
    const ownerValue = profile?.username?.toLowerCase() || user.email?.toLowerCase();
    const deckOwner = (deck.owner || deck.ownerUsername || '').toString().toLowerCase();
    return deckOwner === ownerValue;
  };

  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDoc(doc(db, 'decks', deckId));
      fetchDecks();
    } catch (error) {
      console.error('Error deleting deck:', error);
      setError('Unable to delete deck.');
    }
  };

  // Filter decks based on active filters
  const filteredDecks = decks.filter(deck => {
    return (
      (!filters.owner || (deck.owner && deck.owner.toLowerCase().includes(filters.owner.toLowerCase()))) &&
      (!filters.powerLevel || deck.powerLevel.toString() === filters.powerLevel) &&
      (filters.onlineOnly === '' || (filters.onlineOnly === 'true' ? deck.onlineOnly : !deck.onlineOnly)) &&
      (!filters.archetype || (deck.archetype && deck.archetype.toLowerCase().includes(filters.archetype.toLowerCase()))) &&
      (!filters.commander || (deck.commander && deck.commander.toLowerCase().includes(filters.commander.toLowerCase())))
    );
  });

  // Sort filtered decks
  const sortedDecks = [...filteredDecks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle different data types
    if (sortBy === 'powerLevel') {
      aValue = aValue || 0;
      bValue = bValue || 0;
    } else if (sortBy === 'onlineOnly') {
      aValue = aValue ? 1 : 0;
      bValue = bValue ? 1 : 0;
    } else {
      aValue = (aValue || '').toString().toLowerCase();
      bValue = (bValue || '').toString().toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortArrow = (column) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  // Get unique values for filter dropdowns
  const uniqueOwners = [...new Set(decks.map(d => d.owner))].sort();
  const uniquePowerLevels = [...new Set(decks.map(d => d.powerLevel))].sort((a, b) => a - b);
  const uniqueArchetypes = [...new Set(decks.map(d => d.archetype))].sort();
  const uniqueCommanders = [...new Set(decks.map(d => d.commander))].filter(Boolean).sort();

  return (
    <div className='decks-container'>
      <h1 className='decks-title'>Magic: The Gathering Decks</h1>

      {error && <div className='error-message'>{error}</div>}

      {/* Deck Submission Form */}
      <div className='form-section'>
        <div className='form-header' onClick={() => setFormOpen(!formOpen)}>
          <h2>Submit Your Deck</h2>
          <span className={`toggle-icon ${formOpen ? 'open' : ''}`}>▼</span>
        </div>
        {formOpen && (
          user ? (
            <form onSubmit={handleSubmit} className='deck-form'>
              <div className='form-group'>
                <label htmlFor='commander'>Commander *</label>
                <input
                  type='text'
                  id='commander'
                  name='commander'
                  value={formData.commander}
                  onChange={handleInputChange}
                  placeholder='e.g., Atraxa, Praetors Voice'
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='decklistLink'>Decklist Link</label>
                <input
                  type='url'
                  id='decklistLink'
                  name='decklistLink'
                  value={formData.decklistLink}
                  onChange={handleInputChange}
                  placeholder='https://example.com/decklist'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='archetype'>Archetype</label>
                <input
                  type='text'
                  id='archetype'
                  name='archetype'
                  value={formData.archetype}
                  onChange={handleInputChange}
                  placeholder='e.g., Control, Aggro, Combo'
                />
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='powerLevel'>Power Level *</label>
                  <select
                    id='powerLevel'
                    name='powerLevel'
                    value={formData.powerLevel}
                    onChange={handleInputChange}
                  >
                    {[11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className='form-group checkbox-group'>
                  <label htmlFor='onlineOnly'>
                    <input
                      type='checkbox'
                      id='onlineOnly'
                      name='onlineOnly'
                      checked={formData.onlineOnly || false}
                      onChange={(e) => {
                        if (e && e.target) {
                          const isChecked = e.target.checked;
                          setFormData(prev => ({
                            ...prev,
                            onlineOnly: isChecked
                          }));
                        }
                      }}
                    />
                    <span>IRL</span>
                  </label>
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='notes'>Notes</label>
                <textarea
                  id='notes'
                  name='notes'
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder='Optional notes about your deck'
                  rows='6'
                />
              </div>

              <button type='submit' disabled={submitting} className='submit-btn'>
                {submitting ? 'Submitting...' : 'Submit Deck'}
              </button>
            </form>
          ) : (
            <div className='deck-login-prompt'>
              <p>You must be signed in to submit a deck.</p>
              <p>
                <Link to='/login'>Log in</Link> or <Link to='/signup'>Sign up</Link> to continue.
              </p>
            </div>
          )
        )}
      </div>

      {/* Filters Section */}
      <div className='filters-section'>
        <h2>Filter Decks</h2>
        <div className='filters-grid'>
          <div className='filter-group'>
            <label htmlFor='filter-owner'>Owner</label>
            <select
              id='filter-owner'
              name='owner'
              value={filters.owner}
              onChange={handleFilterChange}
            >
              <option value=''>All Owners</option>
              {uniqueOwners.map(owner => (
                <option key={owner} value={owner}>{owner}</option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor='filter-powerLevel'>Power Level</label>
            <select
              id='filter-powerLevel'
              name='powerLevel'
              value={filters.powerLevel}
              onChange={handleFilterChange}
            >
              <option value=''>All Power Levels</option>
              {[...uniquePowerLevels].sort((a, b) => b - a).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor='filter-onlineOnly'>IRL</label>
            <select
              id='filter-onlineOnly'
              name='onlineOnly'
              value={filters.onlineOnly}
              onChange={handleFilterChange}
            >
              <option value=''>All Decks</option>
              <option value='false'>IRL</option>
              <option value='true'>Online Only</option>
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor='filter-archetype'>Archetype</label>
            <select
              id='filter-archetype'
              name='archetype'
              value={filters.archetype}
              onChange={handleFilterChange}
            >
              <option value=''>All Archetypes</option>
              {uniqueArchetypes.map(archetype => (
                <option key={archetype} value={archetype}>{archetype}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Decks Table */}
      <div className='table-section'>
        <h2>Submitted Decks ({sortedDecks.length})</h2>
        {loading ? (
          <p className='loading'>Loading decks...</p>
        ) : sortedDecks.length === 0 ? (
          <p className='no-decks'>No decks found. Be the first to submit one!</p>
        ) : (
          <div className='table-wrapper'>
            <table className='decks-table'>
              <thead>
                <tr>
                  <th onClick={() => handleSort('owner')} style={{cursor: 'pointer'}}>
                    Owner {getSortArrow('owner')}
                  </th>
                  <th onClick={() => handleSort('archetype')} style={{cursor: 'pointer'}}>
                    Archetype {getSortArrow('archetype')}
                  </th>
                  <th onClick={() => handleSort('commander')} style={{cursor: 'pointer'}}>
                    Commander {getSortArrow('commander')}
                  </th>
                  <th onClick={() => handleSort('powerLevel')} style={{cursor: 'pointer'}}>
                    Power Level {getSortArrow('powerLevel')}
                  </th>
                  <th onClick={() => handleSort('onlineOnly')} style={{cursor: 'pointer'}}>
                    IRL {getSortArrow('onlineOnly')}
                  </th>
                  <th>Decklist Link</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedDecks.map(deck => (
                  <tr key={deck.id}>
                    <td>{deck.ownerNickname || deck.owner || deck.ownerUsername || '-'}</td>
                    <td>{deck.archetype || '-'}</td>
                    <td>{deck.commander || '-'}</td>
                    <td className='power-level'>{deck.powerLevel}</td>
                    <td>{deck.onlineOnly ?  '✓' : '✗'}</td>
                    <td>
                      <a href={deck.decklistLink} target='_blank' rel='noopener noreferrer'>
                        View Deck
                      </a>
                    </td>
                    <td>{deck.notes || '-'}</td>
                    <td className='deck-actions'>
                      {isDeckOwner(deck) ? (
                        <>
                          <button type='button' className='action-btn' onClick={() => navigate('/account')}>
                            Manage
                          </button>
                          <button type='button' className='action-btn delete-btn' onClick={() => handleDeleteDeck(deck.id)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Decks;