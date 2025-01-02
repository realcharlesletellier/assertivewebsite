// src/utils/email.ts
import ejs from "ejs";
import fs from "fs";
import { createTransport, type Transporter } from "nodemailer";

type TemplateParams = {
    name: string;
};

type SendEmailOptions = {
    /** Email address of the recipient */
    to: string;
    /** Subject line of the email */
    subject: string;
    /** Parameters to send to the template */
    template: {
        name: "contact";
        params: TemplateParams;
    };
};

/**
 * Sends an email using the specified options.
 */
export async function sendEmail(options: SendEmailOptions): Promise<void> {
    const transporter = await getEmailTransporter();
    // Parse email template
    const html = await parseEmailTemplate(options.template.name, options.template.params);
    const from = import.meta.env.SEND_EMAIL_FROM || "noreply@yourdomain.com";
    const message = { to: options.to, subject: options.subject, html, from };

    // Send the email
    await transporter.sendMail(message);
}

/**
 * Creates and returns a Nodemailer transporter.
 */
async function getEmailTransporter(): Promise<Transporter> {
    if (import.meta.env.PROD) {
        // Production: Use Resend SMTP
        if (!import.meta.env.RESEND_API_KEY) {
            throw new Error("Missing Resend configuration");
        }
        return createTransport({
            host: "smtp.resend.com",
            secure: true,
            port: 465,
            auth: { user: "resend", pass: import.meta.env.RESEND_API_KEY },
        });
    } else {
        // Development: Use Ethereal
        const account = await createTestAccount();
        return createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: { user: account.user, pass: account.pass },
        });
    }
}

/**
 * Parses an EJS email template with the given parameters.
 */
async function parseEmailTemplate(
    name: SendEmailOptions["template"]["name"],
    params: TemplateParams
): Promise<string> {
    const rawTemplate = fs.readFileSync(`./src/utils/templates/${name}.ejs`, "utf8");
    return ejs.render(rawTemplate, params);
}

/**
 * Creates a test account using Ethereal for development.
 */
function createTestAccount(): Promise<any> {
    return new Promise((resolve, reject) => {
        const nodemailer = require("nodemailer");
        nodemailer.createTestAccount((err: any, account: any) => {
            if (err) {
                reject(err);
            }
            resolve(account);
        });
    });
}
