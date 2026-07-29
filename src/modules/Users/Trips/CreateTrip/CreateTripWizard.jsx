import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTrip.css';
import Step1Basics from './Step1Basics';
import Step2TravelStay from './Step2TravelStay';
import Step3Details from './Step3Details';
import Step4Review from './Step4Review';
import tripService from "../../../../services/tripService";
import tripCompanionService from "../../../../services/tripCompanionService";
const CreateTripWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    companions: [], // Tracks main user (SELF) + additional companions

    // Step 2
    transportation: '',
    accommodation: '',
    hotelPreference: '',

    // Step 3
    interests: [],
    tripPace: '',
    foodPreference: ''
  });

    const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:{
        const isCountryValid = tripData.country !== '';
        const isCityValid = tripData.city !== '';
        const areDatesValid = tripData.startDate !== '' && tripData.endDate !== '';
        
        // Validate that all additional companions (excluding primary SELF user at index 0) have required details
        const additionalCompanions = (tripData.companions || []).slice(1);
        const areCompanionsValid = additionalCompanions.every(
          (companion) => 
            companion.firstName?.trim() && 
            companion.lastName?.trim() && 
            companion.relationship
        );

        return isCountryValid && isCityValid && areDatesValid && areCompanionsValid;
      }
      case 2:
        return tripData.transportation !== '' && tripData.accommodation !== '';
      case 3:
        return tripData.interests && tripData.interests.length > 0 && tripData.tripPace !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

 const handleFinish = async () => {
  setIsSubmitting(true);

  const formattedCompanions = (tripData.companions || []).map((companion) => ({
    firstName: companion.firstName?.trim() || 'Traveler',
    lastName: companion.lastName?.trim() || 'Unknown',
    relationship: companion.relationship || 'SELF',
    gender: companion.gender || 'OTHER',
    age: companion.age ? Number(companion.age) : 25, // default age to prevent constraint violations
    isTripOwner: Boolean(companion.isTripOwner)
  }));

const user = JSON.parse(localStorage.getItem("user"));

const payload = {
  title: `${tripData.city} Trip`,
  source: tripData.country,          // Replace with actual source if you have one
  destination: tripData.city,
  startDate: tripData.startDate,
  endDate: tripData.endDate,
  budget: Number(tripData.customBudget || 1000),
  description: "",
  tripType: tripData.travelerType,
  tripStatus: "PLANNED",
  userId: user.userId
};


  try {
const response = await tripService.createTrip(payload);

console.log("Trip Created:", response);

const data = response.data;

console.log("Trip Created:", data);


// Get created trip id
const tripId = data.tripId;

if (!tripId) {
  throw new Error("Trip ID not received from backend");
}


// Save companions
for (const companion of formattedCompanions) {

  await tripCompanionService.addCompanion(
    tripId,
    companion
  );

}


console.log("Companions saved successfully");


navigate('/user/dashboard');


  } catch (error) {

    console.error(
      "Submission Error:",
      error
    );

    alert(
      "Failed to create trip. Please check your network and try again."
    );


  } finally {

    setIsSubmitting(false);

  }
};

    

  const progressWidth = ((step - 1) / 3) * 100;
  const isNextDisabled = !validateStep(step);

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
        <div className={`step-indicator ${step >= 3 ? (step === 3 ? 'active' : 'completed') : ''}`}>
          {step > 3 ? <i className="bi bi-check"></i> : '3'}
        </div>
        <div className={`step-indicator ${step === 4 ? 'active' : ''}`}>
          4
        </div>
      </div>

      <div className="wizard-card">
        {step === 1 && <Step1Basics data={tripData} setData={setTripData} />}
        {step === 2 && <Step2TravelStay data={tripData} setData={setTripData} />}
        {step === 3 && <Step3Details data={tripData} setData={setTripData} />}
        {step === 4 && <Step4Review data={tripData} />}

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

          {step < 4 ? (
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={isNextDisabled}
              style={{
                opacity: isNextDisabled ? 0.5 : 1,
                cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Next Step <i className="bi bi-arrow-right"></i>
            </button>
          ) : (
            <button className="btn-primary" onClick={handleFinish} style={{ background: '#10B981', color: '#fff' }}>
              Finalize <i className="bi bi-check-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTripWizard;
