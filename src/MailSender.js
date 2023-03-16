const nodemailer = require('nodemailer');
 
class MailSender {

  constructor() {

    this._transporter = nodemailer.createTransport({

      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },

    });

  }

  // Parameter targetEmail merupakan alamat email tujuan, di mana nanti kita akan mendapatkannya dari pesan yang ada di queue. 
  // Kemudian, parameter content merupakan data notes yang didapat dari fungsi getNotes di NotesService. 
  // Kita akan mengirimkan data notes (content) dalam bentuk attachment berkas JSON pada email.

  // Untuk mengirimkan email, kita akan menggunakan fungsi this._transporter.sendMail. 
  // Namun, ketahuilah bahwa sebelum menggunakan fungsi tersebut, 
  // kita membutuhkan objek message configuration yang mendefinisikan identitas dan isi dari email seperti pengirim, penerima, judul, isi email, hingga attachment.

  sendEmail(targetEmail, content) {

    const message = {
      from: 'Notes Apps',
      to: targetEmail,
      subject: 'Ekspor Catatan',
      text: 'Terlampir hasil dari ekspor catatan',
      attachments: [
        {
          filename: 'notes.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);

  }

  // Fungsi sendMail akan mengembalikan promise yang membawa status pengiriman email. 
  // Kita bisa manfaatkan itu sebagai nilai return. Tujuannya, agar kita bisa menggunakan async/await 
  // ketika menggunakan fungsi sendEmail untuk mendapatkan status pengirimannya.

}

module.exports = MailSender;


