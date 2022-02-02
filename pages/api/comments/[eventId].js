export default function handler(req, res) {
  if (req.method === "POST") {
    //
  } else if (req.method === "GET") {
    //
  } else {
    res.status(200).json({ message: "No supported verb" });
  }
}
