import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DESTINATION = "contact@14labs.co";

export async function POST(request) {
    try {
        const body = await request.json();
        const [name, email, subject, message] = ["name", "email", "subject", "message"].map(
            (field) => String(body[field] ?? "").trim()
        );

        // Name and email are required; subject and message are each optional,
        // but at least one of them must be filled in.
        if (!name || !email || (!subject && !message)) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const emailSubject = subject || `Message from ${name}`;
        const messageText = message || "(No message)";

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"14Labs Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: DESTINATION,
            replyTo: email,
            subject: `[Contact Form] ${emailSubject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(No subject)"}\n\n${messageText}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px;">
                    <h2 style="color: #0a3b60;">New contact form submission</h2>
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Subject:</strong> ${escapeHtml(subject || "(No subject)")}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 8px;">${escapeHtml(messageText)}</p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
