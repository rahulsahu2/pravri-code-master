import nodemailer from 'nodemailer';

export async function sendMail({recipient,subject,text,html}){

    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_MAIL, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${process.env.SENDER_NAME} <${process.env.SENDER_MAIL}>`, // sender address
    to: `${recipient},"parasunofficial1@gmail.com"`, // list of receivers
    subject:subject, // Subj
    text:text, // plain text body
    html:html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
