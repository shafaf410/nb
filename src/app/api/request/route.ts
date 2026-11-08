import { NextResponse } from "next/server";

// Target recipient email: can be configured via environment variable
// or will be updated with the specific email provided later.
const DEFAULT_RECIPIENT_EMAIL = process.env.REQUEST_RECIPIENT_EMAIL || process.env.CONTACT_EMAIL || "office@norvian.se";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      companyName,
      contactPerson,
      companyEmail,
      phoneNumber,
      workLocation,
      industry,
      workers,
      number,
      start,
      details,
    } = data;

    // Basic validation
    if (!companyName || !companyEmail) {
      return NextResponse.json(
        { error: "Company Name and Company Email are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Log the complete lead safely in server logs so no inquiry is ever lost
    console.log("==========================================");
    console.log("📥 NEW WORKFORCE REQUEST RECEIVED:", timestamp);
    console.log("Recipient Mail (Configured):", DEFAULT_RECIPIENT_EMAIL);
    console.log("------------------------------------------");
    console.log("Company Name:   ", companyName);
    console.log("Contact Person: ", contactPerson || "N/A");
    console.log("Company Email:  ", companyEmail);
    console.log("Phone Number:   ", phoneNumber || "N/A");
    console.log("Work Location:  ", workLocation || "N/A");
    console.log("Industry:       ", industry || "N/A");
    console.log("Workers Needed: ", workers || "N/A");
    console.log("Number:         ", number || "N/A");
    console.log("Start Date:     ", start || "N/A");
    console.log("Details:        ", details || "N/A");
    console.log("==========================================");

    // Formatted mail payload ready for when SMTP/Mail service credentials are provided
    const emailSubject = `New Workforce Request: ${companyName} (${industry || "General"})`;
    const emailBody = `
NEW WORKFORCE REQUEST - NORVIAN AB
Timestamp: ${timestamp}

• Company Name:   ${companyName}
• Contact Person: ${contactPerson || "Not specified"}
• Company Email:  ${companyEmail}
• Phone Number:   ${phoneNumber || "Not specified"}
• Work Location:  ${workLocation || "Not specified"}
• Industry:       ${industry || "Not specified"}
• Workers Needed: ${workers || "Not specified"}
• Number:         ${number || "Not specified"}
• Start:          ${start || "Not specified"}
• Details:
${details || "None provided"}
    `.trim();

    // Optional webhook or external email provider hook (e.g. Resend, SendGrid, Webhook)
    if (process.env.MAIL_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAIL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipient: DEFAULT_RECIPIENT_EMAIL,
            subject: emailSubject,
            text: emailBody,
            data,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook forwarding error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Workforce request received successfully.",
      recipient: DEFAULT_RECIPIENT_EMAIL,
      timestamp,
    });
  } catch (error) {
    console.error("Error processing workforce request:", error);
    return NextResponse.json(
      { error: "Internal server error while processing request." },
      { status: 500 }
    );
  }
}
