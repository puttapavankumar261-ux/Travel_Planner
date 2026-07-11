import React from 'react';
import { MapPin, Calendar, Users, Wallet, CheckCircle, Info } from 'lucide-react';

const Step4Review = ({ data }) => {
  const renderField = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div style={{ marginBottom: '12px' }}>
        <span style={{ display: 'block', color: '#9CA3AF', fontSize: '12px', marginBottom: '4px' }}>{label}</span>
        <span style={{ color: 'white', fontSize: '15px', fontWeight: '500' }}>
          {Array.isArray(value) ? value.join(', ') : value.toString()}
        </span>
      </div>
    );
  };

  const sectionStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '20px'
  };

  const headerStyle = {
    color: '#60A5FA',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '12px'
  };

  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <CheckCircle size={48} color="#10B981" style={{ marginBottom: '16px' }} />
        <h3 className="step-title" style={{ margin: 0 }}>Review & Confirm</h3>
        <p style={{ color: '#9CA3AF', marginTop: '8px' }}>Please verify all the details before finalizing your trip.</p>
      </div>

      <div style={sectionStyle}>
        <h4 style={headerStyle}><MapPin size={18} /> 1. The Basics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {renderField('Country', data.country)}
          {renderField('City/State', data.city)}
          {renderField('Start Date', data.startDate)}
          {renderField('End Date', data.endDate)}
          {renderField('Traveler Type', data.travelerType)}
          {renderField('Budget Range', data.budgetRange || data.customBudget)}
        </div>
      </div>

      <div style={sectionStyle}>
        <h4 style={headerStyle}><Calendar size={18} /> 2. Travel & Stay</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {renderField('Primary Transportation', data.transportation)}
          {renderField('Accommodation Type', data.accommodation)}
          {renderField('Hotel Preference', data.hotelPreference)}
          {renderField('Total Travelers', data.totalTravelers)}
          {renderField('Travel Insurance', data.travelInsurance ? 'Yes, Add Insurance' : 'No')}
          
          {/* Dynamic Transport Fields Summary */}
          {data.transportation === 'Flight' && (
            <>
              {renderField('Departure Airport', data.flightDepartureAirport)}
              {renderField('Arrival Airport', data.flightArrivalAirport)}
              {renderField('Cabin Class', data.flightCabinClass)}
            </>
          )}
          {data.transportation === 'Train' && (
            <>
              {renderField('Boarding Station', data.trainBoardingStation)}
              {renderField('Destination Station', data.trainDestinationStation)}
              {renderField('Train Class', data.trainClass)}
            </>
          )}
          {data.transportation === 'Bus' && (
            <>
              {renderField('Boarding City', data.busBoardingCity)}
              {renderField('Destination City', data.busDestinationCity)}
              {renderField('Bus Type', data.busType)}
            </>
          )}
          {data.transportation === 'Car' && (
            <>
              {renderField('Car Trip Type', data.carType)}
              {renderField('Start Location', data.carType === 'Rental' ? data.carPickupLoc : data.carStartLoc)}
            </>
          )}
        </div>
      </div>

      <div style={sectionStyle}>
        <h4 style={headerStyle}><Info size={18} /> 3. Activities & Vibe</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {renderField('Primary Interests', data.interests)}
          {renderField('Trip Pace', data.tripPace)}
          {renderField('Food Preference', data.foodPreference)}
          {renderField('Special Requirements', data.specialRequirements)}
        </div>
      </div>
    </div>
  );
};

export default Step4Review;
