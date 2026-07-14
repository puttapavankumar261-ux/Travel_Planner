import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { amadeusService } from '../../../services/amadeusService';
import './BookingWizard.css';

const BookingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Booking Data State
  const [budget, setBudget] = useState('');
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [date, setDate] = useState('2026-10-10');
  
  // Results State
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  
  // Selection State
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleNext = async () => {
    if (step === 1) {
      // Fetch flights
      setLoading(true);
      try {
        const results = await amadeusService.searchFlights(origin, destination, date);
        setFlights(results);
        setStep(2);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    } else if (step === 2) {
      if (!selectedFlight) return alert("Please select a flight first");
      // Fetch hotels
      setLoading(true);
      try {
        const results = await amadeusService.searchHotelsByCity(destination);
        setHotels(results);
        setStep(3);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    } else if (step === 3) {
      if (!selectedHotel) return alert("Please select a hotel first");
      setStep(4);
    } else if (step === 4) {
      // Confirm Booking
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(5);
      }, 1500);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const steps = [
    { id: 1, title: 'Budget' },
    { id: 2, title: 'Flights' },
    { id: 3, title: 'Hotels' },
    { id: 4, title: 'Review' }
  ];

  const renderStepIndicator = () => (
    <div className="booking-wizard-stepper">
      {steps.map((s, index) => (
        <div key={s.id} className={`booking-wizard-step-wrap ${step > s.id ? 'completed-step' : ''}`}>
          <div className={`booking-wizard-step-circle ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
            {step > s.id ? '✓' : s.id}
          </div>
          <span className={`booking-wizard-step-title ${step >= s.id ? 'active-title' : ''}`}>{s.title}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="booking-wizard-page">
      <div className="booking-wizard-container">
        <div className="wizard-header">
          <h2>Budget-Based Trip Booking</h2>
          <p>Book flights and hotels seamlessly within your budget</p>
        </div>

        {step < 5 && renderStepIndicator()}

        <div className="wizard-content">
          {loading ? (
            <div style={{textAlign: 'center', padding: '50px'}}>Searching Amadeus API...</div>
          ) : (
            <>
              {step === 1 && (
                <div>
                  <h3>Step 1: Where do you want to go?</h3>
                  <div className="form-group">
                    <label>Total Budget (INR)</label>
                    <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 50000" />
                  </div>
                  <div className="form-group">
                    <label>From Where? (Airport Code)</label>
                    <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. DEL (Delhi)" />
                  </div>
                  <div className="form-group">
                    <label>To Where? (Airport Code)</label>
                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. BOM (Mumbai)" />
                  </div>
                  <div className="form-group">
                    <label>Travel Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3>Step 2: Select a Flight</h3>
                  <p>Budget Allocation for Flights: ~40% (₹{budget ? (budget * 0.4).toFixed(2) : 0})</p>
                  <div className="options-grid">
                    {flights.map((flight, idx) => (
                      <div 
                        key={idx} 
                        className={`option-card ${selectedFlight === flight ? 'selected' : ''}`}
                        onClick={() => setSelectedFlight(flight)}
                      >
                        <div className="option-details">
                          <h4>Flight {flight.id || idx + 1}</h4>
                          <p>Carrier: {flight.itineraries[0]?.segments[0]?.carrierCode}</p>
                          <p>Duration: {flight.itineraries[0]?.duration}</p>
                        </div>
                        <div className="option-price">
                          ₹{flight.price?.total || 'N/A'}
                        </div>
                      </div>
                    ))}
                    {flights.length === 0 && <p>No flights found.</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3>Step 3: Select an Accommodation</h3>
                  <p>Remaining Budget: ₹{budget && selectedFlight ? (budget - selectedFlight.price.total).toFixed(2) : 0}</p>
                  <div className="options-grid">
                    {hotels.map((hotel, idx) => (
                      <div 
                        key={idx} 
                        className={`option-card ${selectedHotel === hotel ? 'selected' : ''}`}
                        onClick={() => setSelectedHotel(hotel)}
                      >
                        <div className="option-details">
                          <h4>{hotel.name}</h4>
                          <p>Rating: {'⭐'.repeat(hotel.rating || 3)}</p>
                        </div>
                        <div className="option-price">
                          ₹{hotel.price || 'N/A'}
                        </div>
                      </div>
                    ))}
                    {hotels.length === 0 && <p>No hotels found.</p>}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3>Step 4: Confirm Booking</h3>
                  <div className="confirmation-box">
                    <h4>Flight Details</h4>
                    <p>Carrier: {selectedFlight?.itineraries[0]?.segments[0]?.carrierCode}</p>
                    <p>Price: ₹{selectedFlight?.price?.total}</p>
                  </div>
                  <div className="confirmation-box">
                    <h4>Hotel Details</h4>
                    <p>Name: {selectedHotel?.name}</p>
                    <p>Price: ₹{selectedHotel?.price}</p>
                  </div>
                  <div className="confirmation-box" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6'}}>
                    <h4>Total Cost</h4>
                    <p style={{fontSize: '24px', fontWeight: 'bold', color: '#60a5fa'}}>
                      ₹{(parseFloat(selectedFlight?.price?.total || 0) + parseFloat(selectedHotel?.price || 0)).toFixed(2)}
                    </p>
                    <p>Original Budget: ₹{budget}</p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="success-message">
                  <div className="icon">✓</div>
                  <h2>Booking Confirmed!</h2>
                  <p>Your trip has been successfully booked using Amadeus APIs.</p>
                  <button className="btn-next" style={{marginTop: '20px'}} onClick={() => navigate('/user/dashboard')}>
                    Return to Dashboard
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {step < 5 && (
          <div className="wizard-actions">
            {step > 1 ? (
              <button className="btn-back" onClick={handleBack} disabled={loading}>Back</button>
            ) : <div></div>}
            
            <button className="btn-next" onClick={handleNext} disabled={loading || (!budget && step === 1)}>
              {step === 4 ? 'Confirm & Book' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
