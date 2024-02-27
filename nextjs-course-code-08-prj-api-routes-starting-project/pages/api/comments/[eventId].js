import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:Password101@nextjscluster.elpv2sz.mongodb.net/?retryWrites=true&w=majority&appName=NextJSCluster"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email?.includes("@") ||
      !name ||
      name?.trim() === "" ||
      !text ||
      text?.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");

    const result = await db.collection("comments").insertOne({ newComment });

    console.log("result", result);

    newComment.id = result.insertedId;

    if (req.method === "GET") {
      const db = client.db();
      const documents = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();
      console.log("documents", documents);

      res.status(201).json({ message: "Added comment.", comment: documents });
    }

    client.close(); // close the connection
  }
}
