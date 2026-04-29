import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import './Decks.css';

const Decks = () => {
  const [formData, setFormData] = useState({
    owner: '',
    decklistLink: '',
    powerLevel: 5,
    onlineOnly: false,
    notes: '',
    archetype: '',
    commander: ''
  });

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

    if (!formData.commander || !formData.owner || !formData.powerLevel) {
      setError('Please fill in all required fields (Commander, Owner, Power Level)');
      return;
    }

    try {
      setSubmitting(true);
      const decksRef = collection(db, 'decks');
      await addDoc(decksRef, {
        ...formData,
        powerLevel: parseInt(formData.powerLevel),
        timestamp: new Date()
      });

      setFormData({
        owner: '',
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
            <label htmlFor='owner'>Owner *</label>
            <input
              type='text'
              id='owner'
              name='owner'
              value={formData.owner}
              onChange={handleInputChange}
              placeholder='Name'
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(level => (
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
                      setFormData(prev => ({
                        ...prev,
                        onlineOnly: e.target.checked
                      }));
                    }
                  }}
                />
                <span>Online only?</span>
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
              {uniquePowerLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor='filter-onlineOnly'>Online Only</label>
            <select
              id='filter-onlineOnly'
              name='onlineOnly'
              value={filters.onlineOnly}
              onChange={handleFilterChange}
            >
              <option value=''>All Decks</option>
              <option value='true'>Online Only</option>
              <option value='false'>Offline</option>
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
        <h2>Submitted Decks ({filteredDecks.length})</h2>
        {loading ? (
          <p className='loading'>Loading decks...</p>
        ) : filteredDecks.length === 0 ? (
          <p className='no-decks'>No decks found. Be the first to submit one!</p>
        ) : (
          <div className='table-wrapper'>
            <table className='decks-table'>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Archetype</th>
                  <th>Commander</th>
                  <th>Power Level</th>
                  <th>Online Only</th>
                  <th>Decklist Link</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredDecks.map(deck => (
                  <tr key={deck.id}>
                    <td>{deck.owner}</td>
                    <td>{deck.archetype}</td>
                    <td>{deck.commander || '-'}</td>
                    <td className='power-level'>{deck.powerLevel}</td>
                    <td>{deck.onlineOnly ? '✓ Yes' : 'No'}</td>
                    <td>
                      <a href={deck.decklistLink} target='_blank' rel='noopener noreferrer'>
                        View Deck
                      </a>
                    </td>
                    <td>{deck.notes || '-'}</td>
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