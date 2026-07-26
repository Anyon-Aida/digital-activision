import nodemailer from "nodemailer";

import type { EnabledContactConfig } from "./config";
import type {
  ContactDelivery,
  ContactDeliveryProvider,
} from "./contract";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const topicLabels = {
  "career-engineering": "Career / engineering",
  studio: "Studio",
  other: "Other",
} as const;

export const createContactEmailContent = (delivery: ContactDelivery) => {
  const topic = topicLabels[delivery.topic];
  const subject = `Portfolio contact — ${topic}`;
  const text = [
    `Request ID: ${delivery.requestId}`,
    `Topic: ${topic}`,
    `Locale: ${delivery.locale}`,
    `Name: ${delivery.name}`,
    `Email: ${delivery.email}`,
    "",
    "Message:",
    delivery.message,
  ].join("\n");
  const html = `
    <div style="font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif">
      <h2 style="margin:0 0 12px">Portfolio contact</h2>
      <p><strong>Request ID:</strong> ${escapeHtml(delivery.requestId)}<br>
        <strong>Topic:</strong> ${escapeHtml(topic)}<br>
        <strong>Locale:</strong> ${escapeHtml(delivery.locale)}<br>
        <strong>Name:</strong> ${escapeHtml(delivery.name)}<br>
        <strong>Email:</strong> ${escapeHtml(delivery.email)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(delivery.message)}</p>
    </div>
  `;

  return { subject, text, html };
};

export class SmtpContactDeliveryProvider implements ContactDeliveryProvider {
  private readonly transporter;

  constructor(private readonly config: EnabledContactConfig["smtp"]) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 12_000,
    });
  }

  async send(delivery: ContactDelivery) {
    const { html, subject, text } = createContactEmailContent(delivery);

    await this.transporter.sendMail({
      to: this.config.to,
      from: this.config.from,
      replyTo: delivery.email,
      subject,
      text,
      html,
    });
  }
}
