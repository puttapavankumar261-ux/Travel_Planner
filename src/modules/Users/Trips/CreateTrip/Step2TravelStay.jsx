import React from 'react';

const Step2TravelStay = ({ data, setData }) => {
  const toggleTransportation = (mode) => {
    const current = data.transportation;
    if (current.includes(mode)) {
      setData({ ...data, transportation: current.filter(m => m !== mode) });
    } else {
      setData({ ...data, transportation: [...current, mode] });
    }
  };

  const setAccommodation = (type) => {
    setData({ ...data, accommodation: type });
  };

  const setHotelPreference = (pref) => {
    setData({ ...data, hotelPreference: pref });
  };

  return (
    <div className="step-content">
      <h3 className="step-title">travel & stay</h3>
      
      {/* Transportation */}
      <div style={{ marginBottom: '35px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          How will you travel? <span style={{fontSize: '13px', color: '#9CA3AF'}}>(Select multiple)</span>
        </label>
        <div className="selection-grid">
          {[
            { id: 'Flight', icon: 'bi-airplane' },
            { id: 'Train', icon: 'bi-train-front' },
            { id: 'Bus', icon: 'bi-bus-front' },
            { id: 'Car', icon: 'bi-car-front' },
            { id: 'Bike', icon: 'bi-bicycle' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.transportation.includes(type.id) ? 'selected' : ''}`}
              onClick={() => toggleTransportation(type.id)}
            >
              <i className={`bi ${type.icon}`}></i>
              <span>{type.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation */}
      <div style={{ marginBottom: '35px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          Preferred stay
        </label>
        <div className="selection-grid">
          {[
            { id: 'Hotel', icon: 'bi-building' },
            { id: 'Hostel', icon: 'bi-house' },
            { id: 'Resort', icon: 'bi-house-heart' },
            { id: 'Airbnb', icon: 'bi-houses' },
            { id: 'Guest House', icon: 'bi-door-open' },
            { id: 'No Preference', icon: 'bi-question-circle' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.accommodation === type.id ? 'selected' : ''}`}
              onClick={() => setAccommodation(type.id)}
            >
              <i className={`bi ${type.icon}`}></i>
              <span>{type.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Preferences */}
      {(data.accommodation === 'Hotel' || data.accommodation === 'Resort') && (
        <div>
          <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
            Hotel Preferences <span style={{fontSize: '13px', color: '#9CA3AF'}}>(Optional)</span>
          </label>
          <div className="selection-grid">
            {[
              { id: 'Budget', icon: 'bi-star' },
              { id: 'Standard', icon: 'bi-star-fill' },
              { id: 'Premium', icon: 'bi-stars' },
              { id: 'Luxury', icon: 'bi-gem' }
            ].map(type => (
              <div 
                key={type.id}
                className={`selection-card ${data.hotelPreference === type.id ? 'selected' : ''}`}
                onClick={() => setHotelPreference(type.id)}
                style={{ padding: '12px' }}
              >
                <i className={`bi ${type.icon}`} style={{ fontSize: '18px' }}></i>
                <span style={{ fontSize: '13px' }}>{type.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2TravelStay;
