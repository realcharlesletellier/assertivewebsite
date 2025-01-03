// netlify/functions/contact.js

const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const handler = async function (event) {
    // Allow only POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msg: 'Method Not Allowed' }),
        };
    }

    try {
        const { first_name, last_name, email, details, 'bot-field': botField } = JSON.parse(event.body);

        // Simple spam protection
        if (botField) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: 'Spam detected.' }),
            };
        }

        // Validate required fields
        if (!first_name || !last_name || !email || !details) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: 'All fields are required.' }),
            };
        }

        // Construct the email content
        const msg = {
            to: 'realcharlesletellier@gmail.com', // Replace with your email
            from: 'charles@assertiveai.ca', // Replace with your verified sender
            subject: `New Contact Form Submission from ${first_name} ${last_name}`,
            text: `
        You have a new contact form submission:

        First Name: ${first_name}
        Last Name: ${last_name}
        Email: ${email}
        Details: ${details}
      `,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>First Name:</strong> ${first_name}</p>
        <p><strong>Last Name:</strong> ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Details:</strong><br/>${details}</p>
      `,
        };

        // Send the email
        await sgMail.send(msg);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msg: 'Your message has been sent successfully!' }),
        };
    } catch (error) {
        console.error('Error sending email:', error);

        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ msg: 'There was an error sending your message.' }),
        };
    }
};

module.exports = { handler };
