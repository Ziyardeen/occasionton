import { Client, Account, Databases, ID } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(endpoint).setProject(project_id);
const account = new Account(client);
const databases = new Databases(client);

// Function to register a new user
export const registerUser = async (email, password, name) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to send email verification
export const sendVerificationEmail = async (callbackUrl) => {
  try {
    const response = await account.createVerification(callbackUrl);
    return response;
  } catch (error) {
    throw new Error(`Verification Error: ${error.message}`);
  }
};

// Function to confirm email verification with a token and user ID
export const confirmVerification = async (userId, secret) => {
  try {
    const response = await account.updateVerification(userId, secret);
    return response;
  } catch (error) {
    throw new Error(`Confirmation Error: ${error.message}`);
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error;
  }
};

// get Logged In user
export const getCurrentUser = async () => {
  try {
    const user = await account.get('current');
    return user;
  } catch (error) {
    throw new Error(`Get User  Error: ${error.message}`);
  }
};

// Function to log out the user
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    throw new Error(`Logout Error: ${error.message}`);
  }
};
