import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:Password101@nextjscluster.elpv2sz.mongodb.net/?retryWrites=true&w=majority&appName=NextJSCluster"
  );

  return client;
}

export async function insertDocument(client, dbName, collection, document) {
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client,
  dbName,
  collection,
  sort,
  filter = {}
) {
  const db = client.db(dbName);
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
