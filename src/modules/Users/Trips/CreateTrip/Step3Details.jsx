import React from 'react';

const Step3Details = ({ data, setData }) => {
  const toggleInterest = (interest) => {
    const current = data.interests;
    if (current.includes(interest)) {
      setData({ ...data, interests: current.filter(i => i !== interest) });
    } else {
      setData({ ...data, interests: [...current, interest] });
    }
  };

  const setTripPace = (pace) => {
    setData({ ...data, tripPace: pace });
  };

  const setFoodPreference = (food) => {
    setData({ ...data, foodPreference: food });
  };

  return (
    <div className="step-content">
      <h3 className="step-title">activities & vibe</h3>
      
      {/* Interests */}
      <div style={{ marginBottom: '35px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          What are your interests? <span style={{fontSize: '13px', color: '#9CA3AF'}}>(Select multiple)</span>
        </label>
        <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}>
          {[
            { id: 'Adventure', icon: 'bi-compass' },
            { id: 'Beaches', icon: 'bi-water' },
            { id: 'History', icon: 'bi-bank' },
            { id: 'Food', icon: 'bi-cup-hot' },
            { id: 'Shopping', icon: 'bi-bag' },
            { id: 'Nature', icon: 'bi-tree' },
            { id: 'Photography', icon: 'bi-camera' },
            { id: 'Nightlife', icon: 'bi-moon-stars' },
            { id: 'Culture', icon: 'bi-mask' },
            { id: 'Wildlife', icon: 'bi-bug' },
            { id: 'Relaxation', icon: 'bi-flower1' },
            { id: 'Religious', icon: 'bi-building' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.interests.includes(type.id) ? 'selected' : ''}`}
              onClick={() => toggleInterest(type.id)}
              style={{ padding: '10px' }}
            >
              <i className={`bi ${type.icon}`} style={{ fontSize: '20px' }}></i>
              <span style={{ fontSize: '12px' }}>{type.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trip Pace */}
      <div style={{ marginBottom: '35px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          Trip Pace
        </label>
        <div className="selection-grid">
          {[
            { id: 'Relaxed', icon: 'bi-cup', desc: 'Take it easy' },
            { id: 'Balanced', icon: 'bi-activity', desc: 'Mix of both' },
            { id: 'Packed', icon: 'bi-lightning-charge', desc: 'See everything' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.tripPace === type.id ? 'selected' : ''}`}
              onClick={() => setTripPace(type.id)}
            >
              <i className={`bi ${type.icon}`}></i>
              <span>{type.id}</span>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '5px' }}>{type.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Preferences */}
      <div>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          Food Preferences <span style={{fontSize: '13px', color: '#9CA3AF'}}>(Optional)</span>
        </label>
        <div className="selection-grid">
          {[
            'Vegetarian',
            'Vegan',
            'Jain',
            'Halal',
            'No Preference'
          ].map(type => (
            <div 
              key={type}
              className={`selection-card ${data.foodPreference === type ? 'selected' : ''}`}
              onClick={() => setFoodPreference(type)}
              style={{ padding: '12px' }}
            >
              <span style={{ fontSize: '13px' }}>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3Details;
