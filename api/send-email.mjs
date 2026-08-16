// Vercel serverless function — contact form → Gmail SMTP
// Env vars (set in Vercel dashboard → Settings → Environment Variables):
//   SMTP_USER — the Gmail address used to send (e.g. medali.gharsellaoui@gmail.com)
//   SMTP_PASS — a Google App Password for that account (requires 2-Step Verification)
//   SMTP_TO   — the inbox that receives the messages (e.g. medali.gharsellaoui@gmail.com)
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  // CORS is not needed: the form posts to the same origin (/api/send-email).

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    res.status(400).json({ error: 'Invalid input' })
    return
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Invalid email' })
    return
  }

  const safeName = name.trim().slice(0, 200)
  const safeMessage = message.trim().slice(0, 5000)

  if (safeMessage.length < 10) {
    res.status(400).json({ error: 'Message too short' })
    return
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${safeMessage}`
    })
    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Send failed:', error.message)
    res.status(500).json({ error: 'Send failed' })
  }
}
