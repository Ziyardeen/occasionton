// auth.js
import { Client, Account, Databases, ID, Storage } from 'appwrite';

// Initialize Appwrite Client
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(endpoint).setProject(project_id);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;
const events_bucket_id = import.meta.env.VITE_APPWRITE_EVENTS_STORAGE_BUCKET_ID;

// Create Document
export const createDocument = async (data) => {
  try {
    const response = await databases.createDocument(
      database_id,
      collection_id,
      ID.unique(),
      data
    );

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    throw error;
  }
};

// List All Documents
export const listDocuments = async () => {
  try {
    const response = await databases.listDocuments(database_id, collection_id);

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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
  } catch (error) {
    throw error;
  }
};

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
    throw error;
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

    const update = await updateDocument(
      database_id,
      collection_id,
      document_id,
      { attendees: attendeeList }
    );
    return update;
  } catch (error) {
    throw error;
  }
}

// FILES STORAGE
export const uploadImage = async (ImageFile) => {
  try {
    const upload = await storage.createFile(
      events_bucket_id,
      ID.unique(),
      ImageFile
    );
    const image = storage.getFileView(events_bucket_id, upload.$id);

    return image;
  } catch (error) {
    throw error;
  }
};
