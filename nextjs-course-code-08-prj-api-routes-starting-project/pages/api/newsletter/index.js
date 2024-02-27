import { MongoClient } from "mongodb";

export default async function handler({ body, method }, res) {
  if (method === "POST") {
    const { email } = body;

    if (!email || !email.length || !email.includes("@")) {
      return res
        .status(422)
        .json({ status: "error", message: "Invaliden email adresant!" });
    }

    const client = await MongoClient.connect(
      "mongodb+srv://nextjs:Password101@nextjscluster.elpv2sz.mongodb.net/?retryWrites=true&w=majority&appName=NextJSCluster"
    );

    const db = client.db("newsletter");

    await db.collection("emails").insertOne({ email });

    client.close(); // close the connection

    res.status(201).json({ status: "success", message: "Signed up!" });
  } else {
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}
