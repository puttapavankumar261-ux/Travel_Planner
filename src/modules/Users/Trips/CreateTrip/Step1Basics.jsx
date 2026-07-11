import React, { useMemo } from 'react';
import { Country, State } from 'country-state-city';

const Step1Basics = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const setTravelerType = (type) => {
    setData({ ...data, travelerType: type });
  };

  const setBudgetRange = (range) => {
    setData({ ...data, budgetRange: range, customBudget: '' });
  };

  return (
    <div className="step-content">
      <h3 className="step-title">the basics</h3>
      
      {/* Destination */}
      <div className="flex-row">
        <div className="form-group">
          <label>Country <span style={{color: '#EF4444'}}>*</span></label>
          <select 
            name="country" 
            value={data.country || ''} 
            onChange={(e) => {
              handleChange(e);
              setData(prev => ({ ...prev, city: '' })); // reset state when country changes
            }}
            style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: 'white', outline: 'none' }}
          >
            <option value="" disabled style={{ color: '#000' }}>Select Country</option>
            {Country.getAllCountries().map(c => (
              <option key={c.isoCode} value={c.name} style={{ color: '#000' }}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>State / City</label>
          <select 
            name="city" 
            value={data.city || ''} 
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: 'white', outline: 'none' }}
            disabled={!data.country}
          >
            <option value="" disabled style={{ color: '#000' }}>Select State/City</option>
            {(() => {
              const selectedCountryObj = Country.getAllCountries().find(c => c.name === data.country);
              if (!selectedCountryObj) return null;
              return State.getStatesOfCountry(selectedCountryObj.isoCode).map(s => (
                <option key={s.isoCode} value={s.name} style={{ color: '#000' }}>{s.name}</option>
              ));
            })()}
          </select>
        </div>
      </div>

      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="checkbox" 
          id="multipleDest" 
          name="multipleDestinations" 
          checked={data.multipleDestinations}
          onChange={handleChange}
          style={{ width: 'auto' }}
        />
        <label htmlFor="multipleDest" style={{ margin: 0, cursor: 'pointer' }}>I have multiple destinations</label>
      </div>

      {/* Dates */}
      <div className="flex-row" style={{ marginTop: '30px' }}>
        <div className="form-group">
          <label>Start Date</label>
          <input 
            type="date" 
            name="startDate" 
            value={data.startDate} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input 
            type="date" 
            name="endDate" 
            value={data.endDate} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="checkbox" 
          id="flexibleDates" 
          name="flexibleDates" 
          checked={data.flexibleDates}
          onChange={handleChange}
          style={{ width: 'auto' }}
        />
        <label htmlFor="flexibleDates" style={{ margin: 0, cursor: 'pointer' }}>My dates are flexible</label>
      </div>

      {/* Travelers */}
      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>Who is traveling?</label>
        <div className="selection-grid">
          {[
            { id: 'Solo', icon: 'bi-person' },
            { id: 'Couple', icon: 'bi-heart' },
            { id: 'Family', icon: 'bi-people' },
            { id: 'Friends', icon: 'bi-emoji-smile' },
            { id: 'Business', icon: 'bi-briefcase' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.travelerType === type.id ? 'selected' : ''}`}
              onClick={() => setTravelerType(type.id)}
            >
              <i className={`bi ${type.icon}`}></i>
              <span>{type.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Number of People */}
      {data.travelerType && data.travelerType !== 'Solo' && (
        <div className="flex-row">
          <div className="form-group">
            <label>Adults</label>
            <input type="number" name="adults" min="1" value={data.adults} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Children</label>
            <input type="number" name="children" min="0" value={data.children} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Infants</label>
            <input type="number" name="infants" min="0" value={data.infants} onChange={handleChange} />
          </div>
        </div>
      )}

      {/* Budget */}
      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>Approximate Budget</label>
        <div className="selection-grid budget-grid">
          {[
            'Under ₹10,000',
            '₹10,000–25,000',
            '₹25,000–50,000',
            '₹50,000–1 Lakh',
            '₹1 Lakh+'
          ].map(range => (
            <div 
              key={range}
              className={`selection-card ${data.budgetRange === range ? 'selected' : ''}`}
              onClick={() => setBudgetRange(range)}
              style={{ padding: '10px' }}
            >
              <span style={{ fontSize: '13px' }}>{range}</span>
            </div>
          ))}
        </div>
        
        <div className="custom-budget">
          <span style={{ fontSize: '15px' }}>or Enter Budget: ₹</span>
          <input 
            type="number" 
            name="customBudget" 
            placeholder="0" 
            value={data.customBudget} 
            onChange={(e) => {
              handleChange(e);
              if(e.target.value) setData(prev => ({ ...prev, budgetRange: '' }));
            }} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(255,255,255,0.15)', 
              borderRadius: '8px', 
              padding: '10px', 
              color: 'white', 
              outline: 'none' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1Basics;
