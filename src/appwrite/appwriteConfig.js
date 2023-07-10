import { Client, Account, Databases } from "appwrite";

const client = new Client(); //client as a new objects

client
  .setEndpoint("https://cloud.appwrite.io/v1") //your API endpoint
  .setProject("64759a453d4cf836366e"); //your project ID

export const appwriteDatabaseId = "6486eb4ca0e73226fa2b";
export const appwriteCollectionId = "6486eb5713613ced6cac";

export const account = new Account(client); //your accounts

//Database
export const databases = new Databases(client, appwriteDatabaseId);
