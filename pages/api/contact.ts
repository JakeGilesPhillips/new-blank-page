// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { from, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'jakegilesphillips@gmail.com',
      pass: process.env.NODEMAILER_PASSWORD,
    },
    secure: true,
  });

  transporter.sendMail(
    {
      from,
      subject: `New Blank Page`,
      to: 'jakegilesphillips@gmail.com',
      text: `From: ${from}\nSubject: ${subject}\n\n${message}`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        res.status(404);
        res.send('Message failed to send');
        return;
      }

      console.log(info);
      res.status(200);
      res.send('Message sent successfully');
    },
  );
}
