
import { NextResponse } from "next/server";
import { Resend } from "resend";

function cleanText(value, maxLength = 200) {
  if (typeof value !== "string") return "";

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("Missing RESEND_API_KEY or ADMIN_EMAIL.");

      return NextResponse.json(
        {
          success: false,
          message: "Registration service is not configured yet.",
        },
        { status: 500 }
      );
    }

    let data;

    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid registration data.",
        },
        { status: 400 }
      );
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid registration data.",
        },
        { status: 400 }
      );
    }

    const fullName = cleanText(data.fullName, 100);
    const gender = cleanText(data.gender, 30);
    const utmeSubjects = cleanText(data.utmeSubjects, 200);
    const proposedCourse = cleanText(data.proposedCourse, 150);
    const proposedInstitution = cleanText(
      data.proposedInstitution,
      200
    );

    const email =
      typeof data.email === "string"
        ? data.email.trim().toLowerCase()
        : "";

    const targetScore = cleanText(
      String(data.targetScore ?? ""),
      3
    );

    const validGenders = [
      "Male",
      "Female",
      "Prefer not to say",
    ];

    const validScores = [
      "200",
      "250",
      "270",
      "280",
      "300",
      "320",
      "350",
      "380",
    ];

    if (
      fullName.length < 2 ||
      !gender ||
      !utmeSubjects ||
      proposedCourse.length < 2 ||
      proposedInstitution.length < 2 ||
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !validGenders.includes(gender) ||
      !validScores.includes(targetScore)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid information in every field.",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const details = [
      ["Full Name", fullName],
      ["Gender", gender],
      ["Active Email Address", email],
      ["UTME Subject Combination", utmeSubjects],
      ["Proposed Course of Study", proposedCourse],
      ["Proposed Institution", proposedInstitution],
      ["UTME Target Score", `${targetScore}+`],
    ];

    const rows = details
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:12px;border-bottom:1px solid #eee;color:#666;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">
              ${escapeHtml(value)}
            </td>
          </tr>
        `
      )
      .join("");

    const result = await resend.emails.send({
      from: "Levites Online Tutorial <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New UTME Registration - ${fullName}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;color:#281342;">
          <div style="background:#281342;padding:25px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;">LEVITES</h1>
            <p style="color:#e7bf62;margin-bottom:0;">ONLINE TUTORIAL</p>
          </div>

          <div style="padding:25px;border:1px solid #eee;border-top:0;">
            <h2>New Student Registration 🎓</h2>
            <p>A student has registered for Levites Online Tutorial.</p>

            <table style="width:100%;border-collapse:collapse;text-align:left;">
              ${rows}
            </table>

            <p style="margin-top:25px;color:#666;font-size:13px;">
              This registration was submitted through the
              Levites Online Tutorial website.
            </p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      // Log the error for debugging. Never log the API key.
      console.error("Resend delivery request failed:", result.error);

      return NextResponse.json(
        {
          success: false,
          message: "We could not send your registration. Please try again.",
        },
        { status: 502 }
      );
    }

    console.log("Registration email sent successfully:", result.data?.id);

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
    });
  } catch (error) {
    console.error("Registration API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
