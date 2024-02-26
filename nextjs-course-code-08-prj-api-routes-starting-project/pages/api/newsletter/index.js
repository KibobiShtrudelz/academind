export default async function handler({ body, method }, res) {
  if (method === "POST") {
    const { email } = body;

    if (!email || !email.length || !email.includes("@")) {
      return res
        .status(422)
        .json({ status: "error", message: "Invaliden email adresant!" });
    }

    res.status(201).json({ status: "success", message: "Signed up!" });
  } else {
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
  }
}
