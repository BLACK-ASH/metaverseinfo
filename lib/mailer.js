"use server"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

const subjectMap = {
    "register": "Welcome to Metaverse Info",
    "order": "Your order has been placed",
    "order_received": "Hey there, you have received an order",
    "payment": "Your payment has been processed",
    "refund": "Your order has been refunded",
    "cancel": "Your order has been cancelled",
    "return": "Your order has been returned",
}

const emailTemplates = {
    register: (username,) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Welcome to Metaverse Info 🎉</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for registering with <b>Metaverse Info</b>. We’re excited to have you on board.</p>
        <p>You can now explore our platform and stay updated with the latest insights.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
      </body>
    </html>
  `,
    order: (username, data) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Order Confirmation ✅</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Here are the details of your order:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead style="background-color: #f2f2f2;">
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="padding: 8px; text-align: left;">Name</th>
              <th style="padding: 8px; text-align: left;">Quantity</th>
              <th style="padding: 8px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody style="background-color: #fff;">
            ${data.map((item) => `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; text-align: left;">${item.name}</td>
                <td style="padding: 8px; text-align: left;">${item.quantity}</td>
                <td style="padding: 8px; text-align: left;">${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>Your order has been placed successfully. We’ll notify you once it’s shipped.</p>
        <p>Thank you for shopping with <b>Metaverse Info</b>!</p>
        <hr />
        <p style="font-size: 12px; color: #777;">Need help? Contact our support team anytime.</p>
      </body>
    </html>
  `,
    order_received: (username, data) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Order Received 📦</h2>
        <p>Hi <strong>Metaverse Info</strong>,</p>
        <p>You have received an order from <strong>${username}</strong>.</p>
        <p>Here are the details of the order:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead style="background-color: #f2f2f2;">
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="padding: 8px; text-align: left;">Name</th>
              <th style="padding: 8px; text-align: left;">Quantity</th>
              <th style="padding: 8px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody style="background-color: #fff;">
            ${data.map((item) => `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 8px; text-align: left;">${item.name}</td>
                <td style="padding: 8px; text-align: left;">${item.quantity}</td>
                <td style="padding: 8px; text-align: left;">${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>Please process the order and notify the customer.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
      </body>
    </html>
  `,
    payment: (username, data) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Payment Successful 💳</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your payment has been processed successfully. You can view your receipt in your account.</p>
        <p>Here your payment id of your order:</p>
        <p>${data}</p>
        <p>We appreciate your trust in <b>Metaverse Info</b>.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">For billing questions, please reach out to our finance team.</p>
      </body>
    </html>
  `,
    refund: (username) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Refund Processed 💰</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your refund has been issued successfully. It may take 5–7 business days to reflect in your account.</p>
        <p>Thank you for your patience.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">If you don’t see the refund, please contact your bank or our support.</p>
      </body>
    </html>
  `,
    cancel: (username) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Order Cancelled ❌</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your order has been cancelled as requested. If this was a mistake, you can reorder from our store.</p>
        <p>We hope to serve you again at <b>Metaverse Info</b>.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">Contact support if you need help with reordering.</p>
      </body>
    </html>
  `,
    return: (username) => `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #6c63ff;">Return Successful 📦</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your return request has been approved and processed. We’ll notify you once the refund is complete.</p>
        <p>Thanks for shopping with <b>Metaverse Info</b>. We look forward to serving you again.</p>
        <hr />
        <p style="font-size: 12px; color: #777;">Questions about your return? Our support team is here to help.</p>
      </body>
    </html>
  `,
};

export const getEmailHtml = async (username, subject, data) => {
    const template = emailTemplates[subject];
    return template
        ? template(username, data)
        : `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #6c63ff;">Metaverse Info Update</h2>
          <p>Hi <strong>${username}</strong>,</p>
          <p>Here’s an important update from Metaverse Info.</p>
          <p>${data}</p>
          <hr />
          <p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
        </body>
      </html>
    `;
};


export const sendEmail = async (username, to, subject, data) => {
    const mailOptions = {
        from: process.env.GOOGLE_APP_EMAIL,
        to: to,
        subject: subjectMap[subject],
        html: await getEmailHtml(username, subject, data),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};