// Import necessary modules
const { Client, Account, Databases, ID } = require('node-appwrite');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Fetch environment variables from process.env
const endpoint = process.env.APPWRITE_ENDPOINT;
const project_id = process.env.APPWRITE_PROJECT_ID;
const api_key = process.env.APPWRITE_API_KEY;

console.log('Endpoint:', endpoint);
console.log('Project ID:', project_id);

// Initialize Appwrite Client with environment variables
const client = new Client()
  .setEndpoint(endpoint) // API endpoint
  .setProject(project_id) // Project ID
  .setKey(api_key); // API Key

// Initialize Account and Databases instances
const account = new Account(client);
const databases = new Databases(client);

// Function to create the database with ID.unique()
async function createDatabase() {
  try {
    const result = await databases.create(
      ID.unique(), // Automatically generated unique database ID
      'Occasion Ton Database', // Database name
      true // Set to true to enable the database
    );
    console.log('Database created successfully:', result);
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

// Call the function to create the database
createDatabase();
