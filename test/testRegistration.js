// Load environment variables
require('dotenv').config();

const axios = require('axios');

// Generate a unique username and email for each test run
const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000);
};

// Test user registration
const testRegistration = async () => {
  try {
    const uniqueId = generateUniqueId();
    const testUser = {
      username: `testuser${uniqueId}`,
      email: `test${uniqueId}@example.com`,
      password: 'password123'
    };

    console.log('Testing user registration with:', testUser);

    const response = await axios.post('http://localhost:3010/api/users/register', testUser);

    console.log('Registration response:', response.data);
    console.log('Registration successful!');
  } catch (error) {
    console.error('Registration test failed:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
};

// Run the test
testRegistration();
