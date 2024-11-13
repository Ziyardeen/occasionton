// auth.js
import { Client, Account, Databases, ID } from 'appwrite';

// Initialize Appwrite Client
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(endpoint).setProject(project_id);
const account = new Account(client);
const databases = new Databases(client);

// Replace these with your Appwrite database and collection IDs
// const database_id = import.meta.VITE_APPWRITE_DATABASE_ID;
// const collection_id = import.meta.VITE_APPWRITE_EVENTS_COLLECTION_ID;

// Create Document
export const createDocument = async (database_id, collection_id, data) => {
  try {
    const response = await databases.createDocument(
      database_id,
      collection_id,
      ID.unique(),
      data
    );
    console.log('Document created:', response);
    return response;
  } catch (error) {
    console.error('Create document error:', error);
    throw error;
  }
};

// Get Document by ID
export const getDocument = async (database_id, collection_id, document_id) => {
  try {
    const response = await databases.getDocument(
      database_id,
      collection_id,
      document_id
    );
    console.log('Document retrieved:', response);
    return response;
  } catch (error) {
    console.error('Get document error:', error);
    throw error;
  }
};

// List All Documents
export const listDocuments = async (database_id, collection_id) => {
  try {
    const response = await databases.listDocuments(database_id, collection_id);

    return response;
  } catch (error) {
    console.error('List documents error:', error);
    throw error;
  }
};

// Update Document
export const updateDocument = async (
  database_id,
  collection_id,
  document_id,
  data
) => {
  try {
    const response = await databases.updateDocument(
      database_id,
      collection_id,
      document_id,
      data
    );
    console.log('Document updated:', response);
    return response;
  } catch (error) {
    console.error('Update document error:', error);
    throw error;
  }
};

// Delete Document
export const deleteDocument = async (
  database_id,
  collection_id,
  document_id
) => {
  try {
    await databases.deleteDocument(database_id, collection_id, document_id);
    console.log('Document deleted');
  } catch (error) {
    console.error('Delete document error:', error);
    throw error;
  }
};

// Custom Functions

// Adding to attendance
export async function addAttendee(
  database_id,
  collection_id,
  document_id,
  newAttendee
) {
  try {
    const event = await getDocument(database_id, collection_id, document_id);
    const attendeeList = event.attendees.filter((user) => user !== newAttendee);
    const updatedAttendees = [...attendeeList, newAttendee];
    const update = await updateDocument(
      database_id,
      collection_id,
      document_id,
      { attendees: updatedAttendees }
    );
    return update;
  } catch (error) {
    console.error('Update of Attendees Error:', error);
  }
}

// removing from attendance
export async function deleteAttendees(
  database_id,
  collection_id,
  document_id,
  newAttendee
) {
  try {
    const event = await getDocument(database_id, collection_id, document_id);
    const attendeeList = event.attendees.filter((user) => user !== newAttendee);
    // const updatedAttendees = [...attendeeList, newAttendee];
    const update = await updateDocument(
      database_id,
      collection_id,
      document_id,
      { attendees: attendeeList }
    );
    return update;
  } catch (error) {
    console.error('Deletion of Attendees Error:', error);
  }
}
