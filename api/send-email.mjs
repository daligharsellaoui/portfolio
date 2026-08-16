// Vercel serverless function — contact form → Gmail SMTP
// Env vars (set in Vercel dashboard → Settings → Environment Variables):
//   SMTP_USER — the Gmail address used to send (e.g. medali.gharsellaoui@gmail.com)
//   SMTP_PASS — a Google App Password for that account (requires 2-Step Verification)
//   SMTP_TO   — the inbox that receives the messages (e.g. medali.gharsellaoui@gmail.com)
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// --- Basic spam protection ---------------------------------------------

// Honeypot field name — must match the hidden input in the contact form.
// Bots tend to fill every input; humans never see it. If it's filled,
// silently accept the request but do NOT send any email.
const HONEYPOT_FIELD = 'website'

// Basic in-memory rate limit: max submissions per IP per window.
// Note: serverless instances are ephemeral, so this protects per warm
// instance — enough to blunt simple abuse. For a strict global limit,
// swap this Map for Vercel KV (Upstash Redis).
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const hits = new Map() // ip -> [timestamp, ...]

const rateLimited = (ip) => {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT.windowMs
  const recent = (hits.get(ip) || []).filter((ts) => ts > windowStart)

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map never grows unbounded.
  if (hits.size > 1000) {
    for (const [key, list] of hits) {
      if (list.every((ts) => ts <= windowStart)) hits.delete(key)
    }
  }
  return false
}

const clientIp = (req) => {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

// ------------------------------------------------------------------------

export default async function handler(req, res) {
  // CORS is not needed: the form posts to the same origin (/api/send-email).

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body || {}

  // Honeypot: filled by bots → pretend success, drop silently.
  if (body[HONEYPOT_FIELD]) {
    res.status(200).json({ ok: true })
    return
  }

  // Rate limit: too many submissions from the same IP.
  if (rateLimited(clientIp(req))) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  const { name, email, message } = body

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
