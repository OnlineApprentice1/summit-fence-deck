import { NextResponse } from "next/server";

// TODO: Integrate with Resend for email delivery
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData;

    /* ── Validate required fields ── */
    const errors: string[] = [];

    if (!body.name || body.name.trim().length === 0) {
      errors.push("Name is required.");
    }

    if (!body.email || body.email.trim().length === 0) {
      errors.push("Email is required.");
    } else if (!isValidEmail(body.email)) {
      errors.push("Please provide a valid email address.");
    }

    if (!body.message || body.message.trim().length === 0) {
      errors.push("Project description is required.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(" ") },
        { status: 400 },
      );
    }

    /* ── Process the submission ── */
    // TODO: Send email via Resend
    // await resend.emails.send({
    //   from: 'Summit Fence & Deck Co. <noreply@summitfencedeck.ca>',
    //   to: 'hello@summitfencedeck.ca',
    //   subject: `New Contact: ${body.name} — ${body.service || 'General Inquiry'}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
    //     <p><strong>Service:</strong> ${body.service || 'Not selected'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message}</p>
    //   `,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll be in touch within 24 hours.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to process your request. Please try again later." },
      { status: 500 },
    );
  }
}
