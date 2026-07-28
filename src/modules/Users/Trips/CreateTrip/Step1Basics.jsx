import React, { useState, useEffect } from "react";
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
// Calculate total count based on traveler type selection
  const adultsCount = Number(data.adults || (data.travelerType === 'Solo' ? 1 : 1));
  const childrenCount = Number(data.children || 0);
  const infantsCount = Number(data.infants || 0);
  const totalPassengers = adultsCount + childrenCount + infantsCount;

  // Sync companions array whenever traveler counts change
  useEffect(() => {
    const currentCompanions = data.companions || [];

    if (totalPassengers !== currentCompanions.length) {
      const updatedCompanions = Array.from({ length: totalPassengers }, (_, index) => {
        // Retain existing entry if already filled
        if (currentCompanions[index]) {
          return currentCompanions[index];
        }
const calculateAge = (dobString) => {
  if (!dobString) return '';
  const birthDate = new Date(dobString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age > 0 ? age : '';
};
        // Primary passenger is ALWAYS the user (SELF)
        if (index === 0) {

  const loggedUser = JSON.parse(
    localStorage.getItem("user")
  );
  const userAge = loggedUser?.age 
    ? loggedUser.age 
    : calculateAge(loggedUser?.dateOfBirth || loggedUser?.dob);

  return {
    firstName: loggedUser?.firstName || '',
    lastName: loggedUser?.lastName || '',
    relationship: 'SELF',
    gender: loggedUser?.gender || '',
    age: userAge ,
    isTripOwner: true
  };

}

        // Additional companions setup matching TripCompanionRequestDto
        return {
          firstName: '',
          lastName: '',
          relationship: '',
          gender: '',
          age: '',
          isTripOwner: false
        };
      });

      setData((prev) => ({
        ...prev,
        companions: updatedCompanions
      }));
    }
  }, [adultsCount, childrenCount, infantsCount, totalPassengers]);

  // Handle updates for companion field values
  const handleCompanionChange = (index, field, value) => {
    const updated = [...(data.companions || [])];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setData({
      ...data,
      companions: updated
    });
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', justifyContent: 'flex-start' }}>
        <input 
          type="checkbox" 
          id="multipleDest" 
          name="multipleDestinations" 
          checked={data.multipleDestinations}
          onChange={handleChange}
          style={{ width: '18px', height: '18px', margin: 0, cursor: 'pointer' }}
        />
        <label htmlFor="multipleDest" style={{ margin: 0, cursor: 'pointer', display: 'inline-block', color: '#d1d5db', fontSize: '15px' }}>I have multiple destinations</label>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', justifyContent: 'flex-start' }}>
        <input 
          type="checkbox" 
          id="flexibleDates" 
          name="flexibleDates" 
          checked={data.flexibleDates}
          onChange={handleChange}
          style={{ width: '18px', height: '18px', margin: 0, cursor: 'pointer' }}
        />
        <label htmlFor="flexibleDates" style={{ margin: 0, cursor: 'pointer', display: 'inline-block', color: '#d1d5db', fontSize: '15px' }}>My dates are flexible</label>
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
{/* Traveller Details */}
{data.companions && data.companions.length > 0 && (
  <div style={{ marginTop: '30px' }}>

    <h4 style={{color:'#d1d5db'}}>
      Traveller Details
    </h4>


    {data.companions.map((companion, index) => (

      <div 
        key={index}
        style={{
          marginTop:'20px',
          padding:'20px',
          border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:'12px'
        }}
      >

        <h5 style={{color:'#fff'}}>
          Traveller {index + 1}
          {index === 0 && " (You)"}
        </h5>


        <div className="flex-row">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={companion.firstName}
              disabled={index === 0}
              onChange={(e)=>
                handleCompanionChange(
                  index,
                  "firstName",
                  e.target.value
                )
              }
            />
          </div>


          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={companion.lastName}
              disabled={index === 0}
              onChange={(e)=>
                handleCompanionChange(
                  index,
                  "lastName",
                  e.target.value
                )
              }
            />
          </div>

        </div>



        <div className="flex-row">

          <div className="form-group">

            <label>Gender</label>

            <select
  value={companion.gender}
  disabled={index === 0}
  onChange={(e)=>
    handleCompanionChange(
      index,
      "gender",
      e.target.value
    )
  }
>

              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>

            </select>

          </div>



          <div className="form-group">

            <label>Age</label>

            <input
  type="number"
  value={companion.age}
  disabled={index === 0}
  onChange={(e)=>
    handleCompanionChange(
      index,
      "age",
      e.target.value
    )
  }
/>

          </div>



          {index !== 0 && (

          <div className="form-group">

            <label>Relationship</label>

            <select
              value={companion.relationship}
              onChange={(e)=>
                handleCompanionChange(
                  index,
                  "relationship",
                  e.target.value
                )
              }
            >

              <option value="">Select</option>
              <option value="SPOUSE">Spouse</option>
              <option value="FATHER">Father</option>
              <option value="MOTHER">Mother</option>
              <option value="SON">Son</option>
              <option value="DAUGHTER">Daughter</option>
              <option value="BROTHER">Brother</option>
              <option value="SISTER">Sister</option>
              <option value="FRIEND">Friend</option>
              <option value="COLLEAGUE">Colleague</option>
              <option value="RELATIVE">Relative</option>

            </select>

          </div>

          )}

        </div>

      </div>

    ))}

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
