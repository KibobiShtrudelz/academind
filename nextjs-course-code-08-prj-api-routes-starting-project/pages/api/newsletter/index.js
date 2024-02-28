import { connectDB, insertDocument } from "../../../helpers/db-util";

export default async function handler({ body, method }, res) {
  if (method === "POST") {
    const { email } = body;

    if (!email || !email.includes("@")) {
      res
        .status(422)
        .json({ status: "error", message: "Invaliden email adresant!" });

      return;
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Connecting to the database failed!",
      });

      return;
    }

    try {
      await insertDocument(client, "newsletter", "emails", { email });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Inserting data failed!",
      });

      return;
    }

    res.status(201).json({ status: "success", message: "Signed up!" });
  }
}
