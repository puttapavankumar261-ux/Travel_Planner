import axios from 'axios';

const BASE_URL = 'https://test.api.amadeus.com';

class AmadeusService {
  constructor() {
    this.clientId = import.meta.env.VITE_AMADEUS_API_KEY;
    this.clientSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
    this.token = null;
    this.tokenExpiresAt = null;
  }

  async getAccessToken() {
    if (this.token && this.tokenExpiresAt > Date.now()) {
      return this.token;
    }

    if (!this.clientId || !this.clientSecret || this.clientId === 'YOUR_AMADEUS_API_KEY') {
      console.warn("Amadeus API credentials are not set. Using mock data.");
      return 'MOCK_TOKEN';
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/v1/security/oauth2/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      this.token = response.data.access_token;
      this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
      return this.token;
    } catch (error) {
      console.error("Error fetching Amadeus token", error);
      throw error;
    }
  }

  async searchFlights(origin, destination, date, adults = 1) {
    const token = await this.getAccessToken();
    if (token === 'MOCK_TOKEN') return this.getMockFlights(destination);

    try {
      const response = await axios.get(`${BASE_URL}/v2/shopping/flight-offers`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: adults,
          max: 10,
          currencyCode: 'INR'
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching flights", error);
      return this.getMockFlights(destination);
    }
  }

  async searchHotelsByCity(cityCode) {
    const token = await this.getAccessToken();
    if (token === 'MOCK_TOKEN') return this.getMockHotels();

    try {
      const response = await axios.get(`${BASE_URL}/v1/reference-data/locations/hotels/by-city`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { cityCode: cityCode },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching hotels", error);
      return this.getMockHotels();
    }
  }

  // Mock data fallbacks for smooth UI development/testing without API keys
  getMockFlights(destination) {
    return [
      {
        id: "mock-1",
        price: { total: "12500.00", currency: "INR" },
        itineraries: [
          {
            duration: "PT2H30M",
            segments: [
              {
                departure: { iataCode: "DEL", at: "2026-10-10T10:00:00" },
                arrival: { iataCode: destination || "BOM", at: "2026-10-10T12:30:00" },
                carrierCode: "AI"
              }
            ]
          }
        ]
      },
      {
        id: "mock-2",
        price: { total: "18200.00", currency: "INR" },
        itineraries: [
          {
            duration: "PT3H15M",
            segments: [
              {
                departure: { iataCode: "DEL", at: "2026-10-10T15:00:00" },
                arrival: { iataCode: destination || "BOM", at: "2026-10-10T18:15:00" },
                carrierCode: "6E"
              }
            ]
          }
        ]
      }
    ];
  }

  getMockHotels() {
    return [
      { hotelId: "H1", name: "Taj Mahal Palace", price: "12500.00", rating: 5 },
      { hotelId: "H2", name: "Lemon Tree Premier", price: "5500.00", rating: 4 },
      { hotelId: "H3", name: "Budget Inn Residency", price: "2200.00", rating: 3 },
    ];
  }
}

export const amadeusService = new AmadeusService();
