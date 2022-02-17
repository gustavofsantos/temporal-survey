import { createTransport } from "nodemailer";
import type { EmailData, EmailProvider } from "../email-provider";

export class MailHogProvider implements EmailProvider {
  async send(data: EmailData) {
    const transport = createTransport({
      host: process.env.MAILHOG_HOST,
      port: parseInt(process.env.MAILHOG_PORT as string),
    });

    const result = await transport.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.type === "text" ? data.body : undefined,
      html: data.type === "html" ? data.body : undefined,
    });

    console.log(result);
  }
}
