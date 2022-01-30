import { MailHogProvider } from "./mailer/providers/mailhog";
import type { EmailProvider } from "./mailer/email-provider";

type Provider = "mailhog";

export class Email {
  static select(provider: Provider): EmailProvider {
    switch (provider) {
      case "mailhog":
        return new MailHogProvider();
      default:
        throw new Error(`Email provider not found: "${provider}"`);
    }
  }
}
