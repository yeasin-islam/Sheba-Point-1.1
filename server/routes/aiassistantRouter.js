const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const n8nPayload = { message }; // Make sure payload is structured as n8n expects

    const n8nResponse = await fetch(
      "https://myname101.app.n8n.cloud/webhook/ai-call",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(n8nPayload),
      }
    );

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error(
        `n8n webhook error ${n8nResponse.status}: ${errorText}`
      );
      return res.status(n8nResponse.status).json({
        error: "Error from AI service",
        details: errorText,
      });
    }

    // Try parsing JSON response
    let data;
    try {
      data = await n8nResponse.json();
    } catch (err) {
      const rawText = await n8nResponse.text();
      console.error("Invalid JSON from n8n:", rawText);
      return res.status(500).json({
        error: "AI service returned invalid JSON",
        details: rawText,
      });
    }

    if (!data?.output) {
      console.error("n8n response missing 'output':", data);
      return res.status(500).json({
        error: "AI service response malformed or missing 'output'.",
      });
    }

    // ✅ Success response
    res.json({ reply: data.output });

  } catch (error) {
    console.error("Error communicating with n8n webhook:", error);
    res.status(500).json({
      error: "Failed to connect to AI service",
      details: error.message,
    });
  }
});

module.exports = router;
