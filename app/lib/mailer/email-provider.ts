export interface EmailData {
  to: string;
  from: string;
  subject: string;
  body: string;
  type: "text" | "html";
}

export interface EmailProvider {
  send(data: EmailData): Promise<void>;
}
