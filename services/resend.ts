import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOctopusResponse {
  success: boolean;
  message?: string;
}

interface WelcomeEmailData {
  email: string;
  link: string;
}

export async function sendWelcomeEmail(
  data: WelcomeEmailData,
): Promise<EmailOctopusResponse> {
  try {
    const emailContent = generateWelcomeEmailHTML(data.link);

    const { error } = await resend.emails.send({
      from: "Denis from NextNative <nextnative@updates.denistarasenko.com>",
      to: [data.email],
      subject: "Welcome to NextNative! 👋",
      html: emailContent,
    });

    if (error) {
      console.log(error);
      return {
        success: false,
        message: error.message || "Failed to send welcome email",
      };
    }

    return {
      success: true,
      message: "Welcome email sent successfully!",
    };
  } catch (error) {
    console.error("EmailOctopus error:", error);
    return {
      success: false,
      message: "An error occurred while sending welcome email",
    };
  }
}

export function generateWelcomeEmailHTML(link: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome to NextNative</title>
  <!--[if mso]>
    <style>*, a, td { font-family: Arial, sans-serif !important; }</style>
  <![endif]-->
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    /* Mobile tweaks for clients that support <style> */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .btn { padding: 14px 22px !important; }
    }
    /* Dark mode (Apple Mail / iOS Mail) */
    @media (prefers-color-scheme: dark) {
      body, .bg { background: #0b0f17 !important; }
      .card { background: #101826 !important; }
      .text { color: #e5e7eb !important; }
      .muted { color: #9aa3b2 !important; }
      .btn { background: #16a34a !important; }
    }
    /* Gmail dark mode hack */
    u + .body .card { background: #ffffff; }
    u + .body .text { color: #2d3748; }
  </style>
</head>
<body class="body" style="margin:0; padding:0; background:#f5f7fb;">
  <!-- Preheader (hidden) -->
  <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
    Thanks for your purchase—here’s your dashboard link and a quick hello from Denis.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="bg" style="background:#f5f7fb;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container card" style="width:600px; max-width:600px; background:#ffffff; border-radius:14px; box-shadow:0 2px 12px rgba(17,24,39,.06);">
          <tr>
            <td class="px" style="padding:36px 32px 8px 32px;">
              <!-- Logo -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <img src="https://nextnative.dev/nextnative-logo.png" 
                         alt="NextNative Logo" 
                         width="120" 
                         style="max-width:140px; height:auto; display:block; margin:0 auto;" />
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <h1 class="text" style="margin:0 0 10px 0; font:700 22px/1.25 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111827;">
                Hey! Denis here 👋
              </h1>

              <p class="text" style="margin:12px 0 18px 0; font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#374151;">
                Thanks for your purchase and welcome to <strong>NextNative</strong>.
              </p>

              <p class="text" style="margin:0 0 22px 0; font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#374151;">
                If you didn’t land on the thank-you page, here’s your quick link to the dashboard:
              </p>

              <!-- Button (bulletproof w/ VML for Outlook) -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:12px auto 6px auto;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" arcsize="50%" href="${link}"
                        style="height:48px; v-text-anchor:middle; width:260px;" strokecolor="#16a34a" fillcolor="#22c55e">
                        <w:anchorlock/>
                        <center style="color:#ffffff; font-family:Arial,sans-serif; font-size:16px; font-weight:700;">
                          Get NextNative
                        </center>
                      </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a class="btn"
                       href="${link}"
                       style="display:inline-block; background:#22c55e; color:#ffffff; text-decoration:none; border-radius:999px; padding:16px 28px; font:700 16px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                      Get NextNative
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p class="muted" style="margin:18px 0 0 0; font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#6b7280; text-align:center;">
                Having trouble? Paste this in your browser:<br>
                <a href="${link}" style="color:#6b7280; text-decoration:underline;">${link}</a>
              </p>

              <hr role="separator" style="border:none; border-top:1px solid #e5e7eb; margin:28px 0;">

              <p class="text" style="margin:0 0 4px 0; font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#374151;">
                P.S. I read and reply to every email, so please don’t hesitate to reach out 💪
              </p>

              <!-- Signature -->
              <p class="text" style="margin:22px 0 0 0; font:400 16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#374151;">
                Best,
              </p>
              <p class="text" style="margin:6px 0 0 0; font:italic 600 20px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111827;">
                — Denis
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:8px 32px 28px 32px;">
              <p class="muted" style="margin:18px 0 0 0; font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#9ca3af; text-align:center;">
                You’re receiving this because you purchased NextNative. If this wasn’t you, reply and I’ll fix it.
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
</body>
</html>`;
}
