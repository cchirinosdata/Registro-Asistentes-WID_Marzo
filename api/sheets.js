const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const params = new URLSearchParams(req.query).toString();
  const url = `${SCRIPT_URL}?${params}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const text = await response.text();
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error conectando con Google Sheets' });
  }
}
