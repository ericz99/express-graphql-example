import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bobnikeacc69@gmail.com',
    pass: 'Happy619$'
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default function sendMail(from, to, subject, html) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ from, to, subject, html }, (err, info) => {
      if (err) return reject(err);

      return resolve(info);
    });
  });
}
