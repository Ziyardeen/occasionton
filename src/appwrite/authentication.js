// auth.js
import { Client, Account, Databases, ID } from 'appwrite';

// Initialize Appwrite Client
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
console.log(endpoint, project_id);

const client = new Client().setEndpoint(endpoint).setProject(project_id);
const account = new Account(client);
const databases = new Databases(client);

// Function to register a new user
export const registerUser = async (email, password, name) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (error) {
    throw new Error(`Registration Error: ${error.message}`);
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
    throw new Error(`Login Error: ${error.message}`);
  }
};

// Function for social login
export const socialLogin = async (provider, callbackUrl) => {
  try {
    await account.createOAuth2Session(provider, callbackUrl);
  } catch (error) {
    throw new Error(`OAuth Login Error: ${error.message}`);
  }
};

// Function to reset password
export const resetPassword = async (email, callbackUrl) => {
  try {
    const response = await account.createRecovery(email, callbackUrl);
    return response;
  } catch (error) {
    throw new Error(`Password Reset Error: ${error.message}`);
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

// Function to log out from all devices
export const logoutFromAllDevices = async () => {
  try {
    await account.deleteSessions();
    return true;
  } catch (error) {
    throw new Error(`Logout Error: ${error.message}`);
  }
};

// Function to update the user's password
export const updatePassword = async (newPassword, oldPassword) => {
  try {
    const response = await account.updatePassword(newPassword, oldPassword);
    return response;
  } catch (error) {
    throw new Error(`Password Update Error: ${error.message}`);
  }
};

// Function to delete the user's account
export const deleteAccount = async () => {
  try {
    await account.delete();
    return true;
  } catch (error) {
    throw new Error(`Account Deletion Error: ${error.message}`);
  }
};

// Function to log events (e.g., login attempts, actions)
export const logEvent = async (type, message) => {
  try {
    const response = await databases.createDocument(
      'YOUR_DATABASE_ID', // replace with your database ID
      'YOUR_COLLECTION_ID', // replace with your collection ID
      ID.unique(),
      {
        type,
        message,
        timestamp: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Log Event Error: ${error.message}`);
  }
};

// Function to fetch the user's roles
export const getUserRoles = async () => {
  try {
    const user = await account.get();
    return user.roles;
  } catch (error) {
    throw new Error(`Fetch User Error: ${error.message}`);
  }
};
