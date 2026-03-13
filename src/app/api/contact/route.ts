import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // minimális védelem/validáció
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Bad email' }, { status: 400 })
    }

    const port = Number(process.env.SMTP_PORT || 587)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const to = process.env.CONTACT_TO!
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER!

    const subject = `Új üzenet a honlapról – ${name}`
    const text = `Név: ${name}\nE-mail: ${email}\n\nÜzenet:\n${message}`
    const html = `
      <div style="font:14px/1.5 -apple-system,Segoe UI,Roboto,Arial">
        <h2 style="margin:0 0 10px">Új üzenet a honlapról</h2>
        <p><b>Név:</b> ${escapeHtml(name)}<br/>
           <b>E-mail:</b> ${escapeHtml(email)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `

    await transporter.sendMail({
      to,
      from,
      subject,
      text,
      html,
      replyTo: email, // hogy egyből vissza tudj írni a feladónak
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('CONTACT API ERROR:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}

// minimális HTML escape
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
