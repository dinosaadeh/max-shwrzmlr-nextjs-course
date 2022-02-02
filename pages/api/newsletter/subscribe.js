export default function handler(req, res) {
  if (req.method === "POST") {
    fetch(
      "https://nextjscourse-bf5fa-default-rtdb.firebaseio.com/NewsletterSubscribers.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(req.body),
      }
    )
      .then((res) => res.json())
      .then((response) => res.status(200).json(response))
      .catch((error) => {
        console.error("Error:", error);
      });
    //
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
