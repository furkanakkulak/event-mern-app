const axios = require('axios');
const concertData = require('./sportsData.json');

const API_URL = 'http://localhost:4000/api/events';

const sendDataToAPI = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    console.log('Data sent:', response.data);
  } catch (error) {
    console.error('Error sending data:', error.message);
  }
};

(async () => {
  for (const eventData of concertData) {
    await sendDataToAPI(eventData);
  }
})();
