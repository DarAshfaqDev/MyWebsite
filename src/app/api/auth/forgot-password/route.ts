import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const adminEmail = process.env.DASHBOARD_USERNAME || "moeedkamraan1123@gmail.com";
    const password = process.env.DASHBOARD_PASSWORD;

    if (!email || email !== adminEmail) {
      return NextResponse.json(
        { error: "If this email is registered, you will receive your credentials." },
        { status: 200 }
      );
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Dashboard Security" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: "Dashboard Password Recovery",
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #18181b;">Password Recovery</h2>
            <p style="color: #52525b;">You requested your dashboard credentials.</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7;" />
            <p style="color: #18181b;"><strong>Email:</strong> ${adminEmail}</p>
            <p style="color: #18181b;"><strong>Password:</strong> ${password}</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7;" />
            <p style="color: #a1a1aa; font-size: 13px;">
              If you did not request this, you can safely ignore this email.<br />
              Your password has not been changed.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "If this email is registered, you will receive your credentials.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Failed to send recovery email. Please try again later." },
      { status: 500 }
    );
  }
}
