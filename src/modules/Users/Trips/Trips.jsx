import React, { useState } from "react";
import "./Trips.css";

import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import TripsHeader from "../../../components/UserDashboard/Trips/TripsHeader/TripsHeader";
import TripFilters from "../../../components/UserDashboard/Trips/TripFilters/TripFilters";
import TripCard from "../../../components/UserDashboard/Trips/TripCard/TripCard";
import Pagination from "../../../components/UserDashboard/Trips/Pagination/Pagination";
import TripDetailsModal from "../../../components/UserDashboard/Trips/TripDetailsModal/TripDetailsModal";

import goaVideo from "../../../assets/videos/Trips/goa.mp4";
import keralaVideo from "../../../assets/videos/Trips/kerala.mp4";
import manaliVideo from "../../../assets/videos/Trips/manali.mp4";
import ootyVideo from "../../../assets/videos/Trips/ooty.mp4";

const trips = [
  {
    destination: "Goa",
    video: goaVideo,
    startDate: "15 Jul 2026",
    endDate: "20 Jul 2026",
    budget: "₹18,000",
    status: "Upcoming",
    flight: {
      airline: "IndiGo Airlines",
      departureNo: "6E-205",
      departureTime: "06:30 AM",
      departureArrival: "08:45 AM",
      fromCode: "DEL",
      toCode: "GOI",
      duration: "2h 15m",
      cabinClass: "Economy Class",
      returnNo: "6E-208",
      returnTime: "09:30 PM",
      returnArrival: "11:45 PM",
      returnDuration: "2h 15m",
    },
    hotel: {
      name: "Taj Exotica Resort & Spa",
      address: "Benaulim Beach, South Goa, 403716",
      roomType: "Luxury Suite - Garden View",
      checkIn: "15 Jul 2026 - 12:00 PM",
    },
    itinerary: [
      { title: "Arrival & Beach Relaxation", desc: "Arrive at Goa International Airport (GOI), check-in at Taj Exotica, and spend the evening relaxing by the pool or enjoying a sunset beach walk." },
      { title: "North Goa Beaches & Forts", desc: "Explore Aguada Fort, followed by water sports at Baga Beach and dining at famous beach shacks in Calangute." },
      { title: "South Goa Heritage & Temples", desc: "Visit Basilica of Bom Jesus, Se Cathedral, and Mangueshi Temple. Enjoy a beautiful evening Mandovi River cruise." },
      { title: "Spice Plantation & Departure", desc: "Take a guided walk through a tropical spice plantation with Goan buffet lunch, before heading back to the airport." },
    ],
  },
  {
    destination: "Kerala",
    video: keralaVideo,
    startDate: "10 Aug 2026",
    endDate: "16 Aug 2026",
    budget: "₹24,000",
    status: "Planned",
    flight: {
      airline: "Air India",
      departureNo: "AI-472",
      departureTime: "08:15 AM",
      departureArrival: "11:30 AM",
      fromCode: "BOM",
      toCode: "COK",
      duration: "3h 15m",
      cabinClass: "Economy Class",
      returnNo: "AI-473",
      returnTime: "06:45 PM",
      returnArrival: "10:00 PM",
      returnDuration: "3h 15m",
    },
    hotel: {
      name: "Kumarakom Lake Resort",
      address: "Kottayam, Kumarakom, Kerala 686563",
      roomType: "Heritage Lake Villa with Private Pool",
      checkIn: "10 Aug 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Kochi Arrival & Kumarakom Transfer", desc: "Arrive at Kochi (COK) airport, enjoy a scenic drive to Kumarakom, check-in at the resort and enjoy an evening sunset cruise." },
      { title: "Houseboat Backwater Cruise", desc: "Experience a full-day luxury houseboat cruise along Vembanad Lake, checking out local villages and enjoying traditional Kerala food." },
      { title: "Alleppey Beach & Ayurveda Spa", desc: "Day trip to Alleppey Beach, followed by a rejuvenating traditional Ayurvedic spa treatment at Kumarakom resort." },
      { title: "Kochi Sightseeing & Departure", desc: "Brief sightseeing of Kochi Fort, Chinese fishing nets, and Jew Town before catching your evening flight." },
    ],
  },
  {
    destination: "Manali",
    video: manaliVideo,
    startDate: "02 Sep 2026",
    endDate: "08 Sep 2026",
    budget: "₹30,000",
    status: "Upcoming",
    flight: {
      airline: "Alliance Air",
      departureNo: "9I-805",
      departureTime: "07:15 AM",
      departureArrival: "08:40 AM",
      fromCode: "DEL",
      toCode: "KUU",
      duration: "1h 25m",
      cabinClass: "Economy Class",
      returnNo: "9I-806",
      returnTime: "09:10 AM",
      returnArrival: "10:35 AM",
      returnDuration: "1h 25m",
    },
    hotel: {
      name: "Solang Valley Resort",
      address: "Solang Valley, Manali, HP 175131",
      roomType: "River View Premium Room",
      checkIn: "02 Sep 2026 - 12:00 PM",
    },
    itinerary: [
      { title: "Manali Arrival & Mall Road", desc: "Fly to Kullu airport, drive to Manali, check-in, and spend a cozy evening exploring Mall Road, local handicraft shops, and cafes." },
      { title: "Solang Valley Adventure", desc: "Head to Solang Valley for adrenaline-pumping activities: paragliding, zorbing, and quad-biking." },
      { title: "Rohtang Pass Snow Excursion", desc: "Take a scenic drive to the high-altitude Rohtang Pass, view the magnificent Himalayan peaks, and enjoy snow activities." },
      { title: "Hadimba & Vashisht departure", desc: "Visit Hadimba temple, Vashisht hot springs, and return to Kullu airport for departure flight." },
    ],
  },
  {
    destination: "Ooty",
    video: ootyVideo,
    startDate: "15 Oct 2026",
    endDate: "20 Oct 2026",
    budget: "₹16,000",
    status: "Completed",
    flight: {
      airline: "Akasa Air",
      departureNo: "QP-1102",
      departureTime: "10:20 AM",
      departureArrival: "12:45 PM",
      fromCode: "BLR",
      toCode: "CJB",
      duration: "2h 25m",
      cabinClass: "Economy Class",
      returnNo: "QP-1105",
      returnTime: "04:15 PM",
      returnArrival: "06:40 PM",
      returnDuration: "2h 25m",
    },
    hotel: {
      name: "Savoy - IHCL SeleQtions",
      address: "77, Sylks Road, Ooty, Tamil Nadu 643001",
      roomType: "Deluxe Heritage Cottage",
      checkIn: "15 Oct 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Coimbatore Arrival & Ooty Drive", desc: "Land at Coimbatore (CJB), drive through scenic Nilgiri tea estates to Ooty. Evening bonfire at the colonial Savoy Hotel." },
      { title: "Ooty Lake & Botanical Gardens", desc: "Enjoy paddle-boating on Ooty lake, visit the sprawling Government Botanical Garden and the beautiful Rose Garden." },
      { title: "Coonoor Toy Train & Tea Tour", desc: "Take the UNESCO heritage toy train to Coonoor. Tour a tea factory and enjoy panoramic valley views from Dolphin's Nose." },
      { title: "Pykara Waterfalls & Departure", desc: "Excursion to Pykara Waterfalls and Pine Forest, followed by return drive to Coimbatore for your departure flight." },
    ],
  },
  {
    destination: "Jaipur",
    video: goaVideo,
    startDate: "12 Nov 2026",
    endDate: "16 Nov 2026",
    budget: "₹21,000",
    status: "Planned",
    flight: {
      airline: "SpiceJet",
      departureNo: "SG-263",
      departureTime: "01:30 PM",
      departureArrival: "02:25 PM",
      fromCode: "DEL",
      toCode: "JAI",
      duration: "55m",
      cabinClass: "Economy Class",
      returnNo: "SG-264",
      returnTime: "08:10 PM",
      returnArrival: "09:05 PM",
      returnDuration: "55m",
    },
    hotel: {
      name: "Rambagh Palace",
      address: "Bhawani Singh Road, Jaipur, Rajasthan 302005",
      roomType: "Palace Room - Courtyard View",
      checkIn: "12 Nov 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Jaipur Arrival & Birla Temple", desc: "Land at Jaipur airport, check-in at the royal Rambagh Palace, and visit the stunning white marble Birla Temple." },
      { title: "Amer Fort & Palace Exploration", desc: "Visit Amer Fort on a hilltop, enjoy royal views, and tour the City Palace, Hawa Mahal, and Jantar Mantar observatory." },
      { title: "Local Bazaar Shopping & Chowki Dhani", desc: "Shop for block prints, gems, and pottery at Johari Bazaar. Spend the evening enjoying traditional Rajasthani culture and food at Chokhi Dhani." },
      { title: "Jal Mahal & Departure", desc: "Make a quick photo stop at Jal Mahal (Water Palace) before head back to the airport for your evening flight." },
    ],
  },
  {
    destination: "Shimla",
    video: manaliVideo,
    startDate: "18 Dec 2026",
    endDate: "22 Dec 2026",
    budget: "₹28,000",
    status: "Planned",
    flight: {
      airline: "IndiGo Airlines",
      departureNo: "6E-5481",
      departureTime: "09:40 AM",
      departureArrival: "10:55 AM",
      fromCode: "DEL",
      toCode: "SLV",
      duration: "1h 15m",
      cabinClass: "Economy Class",
      returnNo: "6E-5482",
      returnTime: "11:35 AM",
      returnArrival: "12:50 PM",
      returnDuration: "1h 15m",
    },
    hotel: {
      name: "Wildflower Hall, An Oberoi Resort",
      address: "Shimla Kufri Highway, Chharabra, Shimla 171012",
      roomType: "Premier Valley View Room",
      checkIn: "18 Dec 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Shimla Arrival & Mall Road stroll", desc: "Fly to Shimla Jubbarhatti Airport, check-in to Wildflower Hall, and walk along Ridge road and Mall road to enjoy the winter chill." },
      { title: "Kufri Snow Sports & Adventure", desc: "Day trip to Kufri for horse riding, yak riding, and playing in the snow slopes." },
      { title: "Jakhoo Temple & Christ Church", desc: "Hike up to Jakhoo Temple (highest peak in Shimla with massive Hanuman statue), and visit historic Christ Church." },
      { title: "Viceregal Lodge & Departure", desc: "Visit the grand Viceregal Lodge museum and gardens before driving back to the airport for departure." },
    ],
  },
  {
    destination: "Rishikesh",
    video: keralaVideo,
    startDate: "12 Oct 2026",
    endDate: "16 Oct 2026",
    budget: "₹15,000",
    status: "Planned",
    flight: {
      airline: "SpiceJet",
      departureNo: "SG-824",
      departureTime: "08:15 AM",
      departureArrival: "09:10 AM",
      fromCode: "DEL",
      toCode: "DED",
      duration: "55m",
      cabinClass: "Economy Class",
      returnNo: "SG-825",
      returnTime: "06:10 PM",
      returnArrival: "07:05 PM",
      returnDuration: "55m",
    },
    hotel: {
      name: "Ananda in the Himalayas",
      address: "The Palace Estate, Narendra Nagar Tehri Garhwal, Rishikesh 249175",
      roomType: "Garden View Room",
      checkIn: "12 Oct 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Rishikesh Arrival & Ganga Aarti", desc: "Arrive at Dehradun (DED), drive to Rishikesh. Spend the evening participating in the magical Ganga Aarti at Triveni Ghat." },
      { title: "River Rafting & Lakshman Jhula", desc: "Experience white-water river rafting in Ganges from Shivpuri, and tour Lakshman Jhula and Ram Jhula." },
      { title: "Yoga Session & Beatles Ashram", desc: "Participate in a morning yoga session at the resort and explore the ruins of Beatles Ashram." },
      { title: "Neer Garh Waterfall & Departure", desc: "Short hike to Neer Garh Waterfall before driving back to Dehradun Airport for return flight." },
    ],
  },
  {
    destination: "Darjeeling",
    video: manaliVideo,
    startDate: "05 Nov 2026",
    endDate: "09 Nov 2026",
    budget: "₹22,000",
    status: "Upcoming",
    flight: {
      airline: "Air India",
      departureNo: "AI-879",
      departureTime: "11:20 AM",
      departureArrival: "01:45 PM",
      fromCode: "DEL",
      toCode: "IXB",
      duration: "2h 25m",
      cabinClass: "Economy Class",
      returnNo: "AI-880",
      returnTime: "03:15 PM",
      returnArrival: "05:40 PM",
      returnDuration: "2h 25m",
    },
    hotel: {
      name: "Windamere Hotel - Heritage Resort",
      address: "Observatory Hill, Darjeeling, West Bengal 734101",
      roomType: "Heritage Double Room",
      checkIn: "05 Nov 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Bagdogra Arrival & Darjeeling Drive", desc: "Arrive at Bagdogra (IXB) airport, drive up through pine woods to Darjeeling. Check-in at the historic Windamere Hotel." },
      { title: "Tiger Hill Sunrise & Ghoom Monastery", desc: "Catch the sunrise over Mt. Kanchenjunga from Tiger Hill, visit Batasia Loop and Ghoom Monastery." },
      { title: "Toy Train Ride & Tea Garden", desc: "Take a joyride in the UNESCO heritage Toy Train. Tour the Happy Valley Tea Estate and taste Darjeeling tea." },
      { title: "Himalayan Mountaineering & Departure", desc: "Visit the Himalayan Mountaineering Institute and Zoo, followed by return drive to Bagdogra Airport." },
    ],
  },
  {
    destination: "Agra",
    video: goaVideo,
    startDate: "20 Nov 2026",
    endDate: "22 Nov 2026",
    budget: "₹9,000",
    status: "Planned",
    flight: {
      airline: "Alliance Air",
      departureNo: "9I-639",
      departureTime: "07:30 AM",
      departureArrival: "08:15 AM",
      fromCode: "DEL",
      toCode: "AGR",
      duration: "45m",
      cabinClass: "Economy Class",
      returnNo: "9I-640",
      returnTime: "05:00 PM",
      returnArrival: "05:45 PM",
      returnDuration: "45m",
    },
    hotel: {
      name: "The Oberoi Amarvilas",
      address: "Taj East Gate Road, Agra, Uttar Pradesh 282001",
      roomType: "Premier Room - Taj Mahal View",
      checkIn: "20 Nov 2026 - 02:00 PM",
    },
    itinerary: [
      { title: "Taj Mahal Sunset & Hotel Bonfire", desc: "Fly to Agra airport, check-in to The Oberoi Amarvilas (each room has Taj views). Visit Taj Mahal at sunset." },
      { title: "Agra Fort & Fatehpur Sikri", desc: "Explore the massive red sandstone Agra Fort, and take a day trip to the ghost city of Fatehpur Sikri." },
      { title: "Itmad-ud-Daulah & Departure", desc: "Visit Baby Taj (Itmad-ud-Daulah) and Mehtab Bagh gardens before driving to Agra Airport for return flight." },
    ],
  },
  {
    destination: "Varanasi",
    video: ootyVideo,
    startDate: "25 Oct 2026",
    endDate: "28 Oct 2026",
    budget: "₹12,000",
    status: "Upcoming",
    flight: {
      airline: "IndiGo Airlines",
      departureNo: "6E-712",
      departureTime: "06:15 AM",
      departureArrival: "07:45 AM",
      fromCode: "DEL",
      toCode: "VNS",
      duration: "1h 30m",
      cabinClass: "Economy Class",
      returnNo: "6E-715",
      returnTime: "08:30 PM",
      returnArrival: "10:00 PM",
      returnDuration: "1h 30m",
    },
    hotel: {
      name: "BrijRama Palace",
      address: "Darbhanga Ghat, Dashashwamedh, Varanasi 221001",
      roomType: "Nadidhara River View",
      checkIn: "25 Oct 2026 - 12:00 PM",
    },
    itinerary: [
      { title: "Varanasi Arrival & Evening Aarti", desc: "Arrive at Lal Bahadur Shastri Airport. Check-in to BrijRama Palace via a boat ride. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat." },
      { title: "Morning Boat Ride & Sarnath", desc: "Take a serene sunrise boat ride on the Ganges. Later, visit Sarnath where Lord Buddha gave his first sermon." },
      { title: "Kashi Vishwanath & Departure", desc: "Visit the sacred Kashi Vishwanath Temple, explore the narrow alleys, and depart for the airport in the evening." },
    ],
  },
  {
    destination: "Udaipur",
    video: goaVideo,
    startDate: "10 Jan 2027",
    endDate: "14 Jan 2027",
    budget: "₹26,000",
    status: "Planned",
    flight: {
      airline: "Vistara",
      departureNo: "UK-627",
      departureTime: "01:20 PM",
      departureArrival: "02:45 PM",
      fromCode: "DEL",
      toCode: "UDR",
      duration: "1h 25m",
      cabinClass: "Economy Class",
      returnNo: "UK-628",
      returnTime: "04:10 PM",
      returnArrival: "05:35 PM",
      returnDuration: "1h 25m",
    },
    hotel: {
      name: "Taj Lake Palace",
      address: "Pichola, Udaipur, Rajasthan 313001",
      roomType: "Luxury Palace Room",
      checkIn: "10 Jan 2027 - 02:00 PM",
    },
    itinerary: [
      { title: "Udaipur Arrival & Lake Pichola", desc: "Arrive at Maharana Pratap Airport. Transfer to the floating Taj Lake Palace by boat. Enjoy an evening sunset cruise on Lake Pichola." },
      { title: "City Palace & Jag Mandir", desc: "Explore the grand City Palace complex, followed by a visit to Jagdish Temple and lunch at Jag Mandir island." },
      { title: "Sajjangarh & Saheliyon Ki Bari", desc: "Visit the Monsoon Palace (Sajjangarh) for panoramic views, and stroll through the beautiful Saheliyon Ki Bari." },
      { title: "Vintage Car Museum & Departure", desc: "Tour the Vintage Car Museum, do some local shopping, and head to the airport for your return flight." },
    ],
  },
  {
    destination: "Andaman",
    video: keralaVideo,
    startDate: "05 Feb 2027",
    endDate: "11 Feb 2027",
    budget: "₹45,000",
    status: "Planned",
    flight: {
      airline: "Air India",
      departureNo: "AI-549",
      departureTime: "05:40 AM",
      departureArrival: "09:00 AM",
      fromCode: "MAA",
      toCode: "IXZ",
      duration: "2h 20m",
      cabinClass: "Economy Class",
      returnNo: "AI-550",
      returnTime: "10:30 AM",
      returnArrival: "01:50 PM",
      returnDuration: "2h 20m",
    },
    hotel: {
      name: "Taj Exotica Resort & Spa",
      address: "Radhanagar Beach, Havelock Island 744211",
      roomType: "Luxury Villa with Private Pool",
      checkIn: "05 Feb 2027 - 02:00 PM",
    },
    itinerary: [
      { title: "Port Blair Arrival & Cellular Jail", desc: "Land at Veer Savarkar Airport. Visit the historic Cellular Jail and watch the evening Light & Sound Show." },
      { title: "Ferry to Havelock & Radhanagar", desc: "Take a luxury ferry to Havelock Island. Check-in to Taj Exotica and relax at the world-famous Radhanagar Beach." },
      { title: "Scuba Diving at Elephant Beach", desc: "Experience incredible scuba diving and snorkeling among the vibrant coral reefs at Elephant Beach." },
      { title: "Neil Island & Return", desc: "Day trip to Neil Island to see the natural rock bridge, then ferry back to Port Blair for next day's departure." },
    ],
  },
];

const Trips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  const itemsPerPage = 3;
  const totalPages = Math.ceil(trips.length / itemsPerPage);

  // Get current page trips
  const indexOfLastTrip = currentPage * itemsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - itemsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="trips-page">
      <BackgroundSlider />

      <div className="user-trips-container">
        <UserNavbar />

        <TripsHeader />

        <TripFilters />

        <div className="trip-grid">
          {currentTrips.map((trip, index) => (
            <TripCard
              key={index}
              destination={trip.destination}
              video={trip.video}
              startDate={trip.startDate}
              endDate={trip.endDate}
              budget={trip.budget}
              status={trip.status}
              onViewDetails={() => setSelectedTrip(trip)}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <TripDetailsModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};

export default Trips;
