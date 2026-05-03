export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a warm friendly assistant for Glamour Hair & Beauty salon. Answer any question naturally and conversationally. Keep replies concise.

Hours: Mon–Sun 7am–9pm
Phone: +254 (555) 987-6543
Email: hello@glamourbeauty.com
Services: Hair Styling from $35, Colouring from $80, Nails from $25, Facials from $60, Lash & Brow from $45, Head Massage from $30.
For bookings, direct them to the booking form on the page.`,
        messages: messages
      })
    });

    const data = await response.json();
    const reply = data.content?.map(b => b.text || '').join('') || "Sorry, I couldn't respond right now!";
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
