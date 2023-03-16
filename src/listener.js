class Listener {

  constructor(notesService, mailSender) {

    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);

  }
 
  // Parameter message merupakan pesan yang didapat dari queue 
  // karena fungsi listen akan kita delegasikan sebagai fungsi callback pada consumer
  // Saat ini untuk message bertipe ConsumeMessage, 
  
  // guna mendapatkan konten aslinya kita bisa memakai fungsi message.content.toString() s
  // erta mengubah string menjadi objek menggunakan JSON.parse.

  async listen(message) {

    try {

      // dapatkan nilai userId dan targetEmail yang dikirimkan melalui message.
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      // Setelah mendapatkan kedua nilai tersebut, kita bisa mulai memanggil fungsi getNotes 
      // dan sendEmail melalui this._notesService dan this._mailSender.
      const notes = await this._notesService.getNotes(userId);

      // Fungsi sendEmail hanya menerima content dalam bentuk string, 
      // itulah alasan mengapa kita menggunakan JSON.stringify pada pengiriman notes.
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);

    } catch (error) {

      console.error(error);

    }

  }


}

module.exports = Listener;