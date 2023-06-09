import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6460eeb4c49d7b7b4da0');

export const account = new Account(client);

// Database

export const databases = new Databases(client);
