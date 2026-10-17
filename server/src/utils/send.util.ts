import nodemailer from 'nodemailer';

export class MailerService {
  async sendCode(mail: string, code: string) {
    const transport = nodemailer.createTransport({
      host: process.env.MAILER_SMTP,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.MAILER_USER,
      to: mail,
      subject: 'Your code',
      text: code.toString(),
    });
  }
}

export const Mailer = new MailerService();
