import React from 'react';

const Step2TravelStay = ({ data, setData }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const setTransportation = (mode) => {
    // If clicking the already selected mode, do we deselect? No, just keep it.
    setData({ ...data, transportation: mode });
  };

  const setAccommodation = (type) => {
    setData({ ...data, accommodation: type });
  };

  const setHotelPreference = (pref) => {
    setData({ ...data, hotelPreference: pref });
  };

  const inputStyle = {
    width: '100%', 
    padding: '12px 14px', 
    background: 'rgba(255, 255, 255, 0.05)', 
    border: '1px solid rgba(255, 255, 255, 0.1)', 
    borderRadius: '10px', 
    color: 'white', 
    outline: 'none',
    boxSizing: 'border-box',
    marginTop: '6px'
  };

  const labelStyle = { display: 'block', color: '#9CA3AF', fontSize: '14px', marginBottom: '4px' };

  const renderFlightFields = () => (
    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h4 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>✈️ Flight Details</h4>
      
      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Trip Type</label>
          <select name="flightTripType" value={data.flightTripType || 'Round Trip'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="One Way">One Way</option>
            <option style={{color:'#000'}} value="Round Trip">Round Trip</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Cabin Class</label>
          <select name="flightCabinClass" value={data.flightCabinClass || 'Economy'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Economy">Economy</option>
            <option style={{color:'#000'}} value="Premium Economy">Premium Economy</option>
            <option style={{color:'#000'}} value="Business">Business</option>
            <option style={{color:'#000'}} value="First Class">First Class</option>
          </select>
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Departure Airport</label>
          <input type="text" name="flightDepartureAirport" placeholder="e.g. JFK, LHR" value={data.flightDepartureAirport || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Arrival Airport</label>
          <input type="text" name="flightArrivalAirport" placeholder="e.g. CDG, DXB" value={data.flightArrivalAirport || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Departure Date</label>
          <input type="date" name="flightDepartureDate" value={data.flightDepartureDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Return Date <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
          <input type="date" name="flightReturnDate" value={data.flightReturnDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preferred Departure Time</label>
          <select name="flightTime" value={data.flightTime || 'Morning'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Morning">Morning (6 AM - 12 PM)</option>
            <option style={{color:'#000'}} value="Afternoon">Afternoon (12 PM - 6 PM)</option>
            <option style={{color:'#000'}} value="Evening">Evening (6 PM - 10 PM)</option>
            <option style={{color:'#000'}} value="Night">Night (10 PM - 6 AM)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Number of Passengers</label>
          <input type="number" name="flightPassengers" min="1" value={data.flightPassengers || 1} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preferred Airline <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
          <input type="text" name="flightAirline" placeholder="e.g. Emirates, Delta" value={data.flightAirline || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Maximum Budget (₹)</label>
          <input type="number" name="flightBudget" placeholder="e.g. 50000" value={data.flightBudget || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="checkbox" id="flightDirectOnly" name="flightDirectOnly" checked={data.flightDirectOnly || false} onChange={handleChange} style={{ width: 'auto', cursor: 'pointer' }} />
        <label htmlFor="flightDirectOnly" style={{ color: '#E5E7EB', cursor: 'pointer', margin: 0 }}>Direct Flights Only</label>
      </div>
    </div>
  );

  const renderTrainFields = () => (
    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h4 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>🚆 Train Details</h4>
      
      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Boarding Station</label>
          <input type="text" name="trainBoardingStation" placeholder="e.g. NDLS" value={data.trainBoardingStation || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Destination Station</label>
          <input type="text" name="trainDestinationStation" placeholder="e.g. CSTM" value={data.trainDestinationStation || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Journey Date</label>
          <input type="date" name="trainDate" value={data.trainDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Return Date <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
          <input type="date" name="trainReturnDate" value={data.trainReturnDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Class</label>
          <select name="trainClass" value={data.trainClass || 'Sleeper'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Sleeper">Sleeper</option>
            <option style={{color:'#000'}} value="3A">3A</option>
            <option style={{color:'#000'}} value="2A">2A</option>
            <option style={{color:'#000'}} value="1A">1A</option>
            <option style={{color:'#000'}} value="Chair Car">Chair Car</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Quota</label>
          <select name="trainQuota" value={data.trainQuota || 'General'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="General">General</option>
            <option style={{color:'#000'}} value="Tatkal">Tatkal</option>
            <option style={{color:'#000'}} value="Senior Citizen">Senior Citizen</option>
          </select>
        </div>
      </div>

      <div className="flex-row">
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Number of Passengers</label>
          <input type="number" name="trainPassengers" min="1" value={data.trainPassengers || 1} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Maximum Budget (₹)</label>
          <input type="number" name="trainBudget" placeholder="e.g. 3000" value={data.trainBudget || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <label style={labelStyle}>Preferred Train <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
        <input type="text" name="trainName" placeholder="e.g. Rajdhani Express" value={data.trainName || ''} onChange={handleChange} style={inputStyle} />
      </div>
    </div>
  );

  const renderBusFields = () => (
    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h4 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>🚌 Bus Details</h4>
      
      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Boarding City</label>
          <input type="text" name="busBoardingCity" placeholder="e.g. Bangalore" value={data.busBoardingCity || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Destination City</label>
          <input type="text" name="busDestinationCity" placeholder="e.g. Hyderabad" value={data.busDestinationCity || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Journey Date</label>
          <input type="date" name="busDate" value={data.busDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Return Date <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
          <input type="date" name="busReturnDate" value={data.busReturnDate || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Bus Type</label>
          <select name="busType" value={data.busType || 'AC'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="AC">AC</option>
            <option style={{color:'#000'}} value="Non-AC">Non-AC</option>
            <option style={{color:'#000'}} value="Sleeper">Sleeper</option>
            <option style={{color:'#000'}} value="Seater">Seater</option>
            <option style={{color:'#000'}} value="Volvo">Volvo</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Preferred Departure Time</label>
          <select name="busTime" value={data.busTime || 'Night'} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Morning">Morning (6 AM - 12 PM)</option>
            <option style={{color:'#000'}} value="Afternoon">Afternoon (12 PM - 6 PM)</option>
            <option style={{color:'#000'}} value="Evening">Evening (6 PM - 10 PM)</option>
            <option style={{color:'#000'}} value="Night">Night (10 PM - 6 AM)</option>
          </select>
        </div>
      </div>

      <div className="flex-row">
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Number of Passengers</label>
          <input type="number" name="busPassengers" min="1" value={data.busPassengers || 1} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Maximum Budget (₹)</label>
          <input type="number" name="busBudget" placeholder="e.g. 1500" value={data.busBudget || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>
    </div>
  );

  const renderCarFields = () => {
    const isRental = data.carType === 'Rental';
    
    return (
      <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h4 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>🚗 Car Details</h4>
        
        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', cursor: 'pointer' }}>
            <input type="radio" name="carType" value="Self Drive" checked={!isRental} onChange={handleChange} style={{ cursor: 'pointer' }} />
            Self Drive
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', cursor: 'pointer' }}>
            <input type="radio" name="carType" value="Rental" checked={isRental} onChange={handleChange} style={{ cursor: 'pointer' }} />
            Rental
          </label>
        </div>

        {!isRental ? (
          // Self Drive Fields
          <>
            <div className="flex-row" style={{ marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Starting Location</label>
                <input type="text" name="carStartLoc" placeholder="City or Address" value={data.carStartLoc || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Destination</label>
                <input type="text" name="carDestLoc" placeholder="City or Address" value={data.carDestLoc || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            
            <div className="flex-row" style={{ marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Travel Date</label>
                <input type="date" name="carTravelDate" value={data.carTravelDate || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Return Date <span style={{fontSize: '12px', color: '#6B7280'}}>(Optional)</span></label>
                <input type="date" name="carReturnDate" value={data.carReturnDate || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="flex-row">
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Vehicle Type <span style={{fontSize: '12px', color: '#6B7280'}}>(e.g. Sedan, SUV)</span></label>
                <input type="text" name="carVehicleType" value={data.carVehicleType || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Estimated Fuel Budget (₹)</label>
                <input type="number" name="carFuelBudget" value={data.carFuelBudget || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Estimated Toll Budget (₹)</label>
                <input type="number" name="carTollBudget" value={data.carTollBudget || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </>
        ) : (
          // Rental Fields
          <>
            <div className="flex-row" style={{ marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Pickup Location</label>
                <input type="text" name="carPickupLoc" placeholder="Airport or City" value={data.carPickupLoc || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Drop-off Location</label>
                <input type="text" name="carDropoffLoc" placeholder="Airport or City" value={data.carDropoffLoc || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="flex-row" style={{ marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Pickup Date & Time</label>
                <input type="datetime-local" name="carPickupDateTime" value={data.carPickupDateTime || ''} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Return Date & Time</label>
                <input type="datetime-local" name="carReturnDateTime" value={data.carReturnDateTime || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div className="flex-row" style={{ marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Car Category</label>
                <select name="carCategory" value={data.carCategory || 'Hatchback'} onChange={handleChange} style={inputStyle}>
                  <option style={{color:'#000'}} value="Hatchback">Hatchback</option>
                  <option style={{color:'#000'}} value="Sedan">Sedan</option>
                  <option style={{color:'#000'}} value="SUV">SUV</option>
                  <option style={{color:'#000'}} value="Luxury">Luxury</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Maximum Budget (₹)</label>
                <input type="number" name="carBudget" value={data.carBudget || ''} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="carDriverRequired" name="carDriverRequired" checked={data.carDriverRequired || false} onChange={handleChange} style={{ width: 'auto', cursor: 'pointer' }} />
              <label htmlFor="carDriverRequired" style={{ color: '#E5E7EB', cursor: 'pointer', margin: 0 }}>Driver Required?</label>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="step-content">
      <h3 className="step-title">travel & stay</h3>
      
      {/* Transportation Mode Selection */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '15px', color: '#d1d5db', fontSize: '15px' }}>
          How will you travel? <span style={{fontSize: '13px', color: '#9CA3AF'}}>(Select one)</span>
        </label>
        <div className="selection-grid">
          {[
            { id: 'Flight', icon: 'bi-airplane' },
            { id: 'Train', icon: 'bi-train-front' },
            { id: 'Bus', icon: 'bi-bus-front' },
            { id: 'Car', icon: 'bi-car-front' }
          ].map(type => (
            <div 
              key={type.id}
              className={`selection-card ${data.transportation === type.id ? 'selected' : ''}`}
              onClick={() => setTransportation(type.id)}
            >
              <i className={`bi ${type.icon}`}></i>
              <span>{type.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Transportation Fields */}
      <div style={{ marginBottom: '35px' }}>
        {data.transportation === 'Flight' && renderFlightFields()}
        {data.transportation === 'Train' && renderTrainFields()}
        {data.transportation === 'Bus' && renderBusFields()}
        {data.transportation === 'Car' && renderCarFields()}
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
        <div style={{ marginBottom: '35px' }}>
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

      {/* Common Fields (Bottom) */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
        <h4 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>Additional Details</h4>
        
        <div className="flex-row" style={{ marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Number of Travelers (Total)</label>
            <input type="number" name="totalTravelers" min="1" value={data.totalTravelers || 1} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
              <input type="checkbox" id="travelInsurance" name="travelInsurance" checked={data.travelInsurance || false} onChange={handleChange} style={{ width: 'auto', cursor: 'pointer' }} />
              <label htmlFor="travelInsurance" style={{ color: '#E5E7EB', cursor: 'pointer', margin: 0 }}>Add Travel Insurance (Yes)</label>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Special Requirements</label>
          <textarea 
            name="specialRequirements" 
            placeholder="e.g. Wheelchair access, Vegetarian meals..." 
            value={data.specialRequirements || ''} 
            onChange={handleChange} 
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
          />
        </div>

        <div>
          <label style={labelStyle}>Additional Notes</label>
          <textarea 
            name="additionalNotes" 
            placeholder="Any other details for your trip..." 
            value={data.additionalNotes || ''} 
            onChange={handleChange} 
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
          />
        </div>
      </div>
      
    </div>
  );
};

export default Step2TravelStay;
