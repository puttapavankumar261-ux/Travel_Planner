import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTrip.css';
import Step1Basics from './Step1Basics';
import Step2TravelStay from './Step2TravelStay';
import Step3Details from './Step3Details';

const CreateTripWizard = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Master State for all steps
  const [tripData, setTripData] = useState({
    // Step 1
    country: '',
    city: '',
    multipleDestinations: false,
    startDate: '',
    endDate: '',
    flexibleDates: false,
    travelerType: '',
    adults: 1,
    children: 0,
    infants: 0,
    budgetRange: '',
    customBudget: '',
    
    // Step 2
    transportation: [],
    accommodation: '',
    hotelPreference: '',

    // Step 3
    interests: [],
    tripPace: '',
    foodPreference: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    console.log("Trip Data Submitted:", tripData);
    // As per instruction, purely frontend, no backend changes. 
    // Redirecting to dashboard.
    navigate('/user/dashboard');
  };

  // Compute progress bar width
  const progressWidth = ((step - 1) / 2) * 100;

  return (
    <div className="trip-wizard-container">
      <div className="wizard-header">
        <h2>plan a new adventure</h2>
        <p>let's build your perfect itinerary, step by step.</p>
      </div>

      <div className="wizard-progress">
        <div className="progress-line" style={{ width: `${progressWidth}%` }}></div>
        <div className={`step-indicator ${step >= 1 ? (step === 1 ? 'active' : 'completed') : ''}`}>
          {step > 1 ? <i className="bi bi-check"></i> : '1'}
        </div>
        <div className={`step-indicator ${step >= 2 ? (step === 2 ? 'active' : 'completed') : ''}`}>
          {step > 2 ? <i className="bi bi-check"></i> : '2'}
        </div>
        <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
          3
        </div>
      </div>

      <div className="wizard-card">
        {step === 1 && (
          <Step1Basics 
            data={tripData} 
            setData={setTripData} 
          />
        )}
        
        {step === 2 && (
          <Step2TravelStay 
            data={tripData} 
            setData={setTripData} 
          />
        )}
        
        {step === 3 && (
          <Step3Details 
            data={tripData} 
            setData={setTripData} 
          />
        )}

        <div className="wizard-footer">
          {step > 1 ? (
            <button className="btn-secondary" onClick={handleBack}>
              <i className="bi bi-arrow-left"></i> Back
            </button>
          ) : (
             <button className="btn-secondary" onClick={() => navigate('/user/dashboard')}>
               Cancel
             </button>
          )}

          {step < 3 ? (
            <button className="btn-primary" onClick={handleNext}>
              Next Step <i className="bi bi-arrow-right"></i>
            </button>
          ) : (
            <button className="btn-primary" onClick={handleFinish}>
              Finish & Create Trip <i className="bi bi-check-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTripWizard;
