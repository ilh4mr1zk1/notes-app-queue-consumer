require('dotenv').config();
const amqp = require('amqplib');
const NotesService = require('./NotesService');
const MailSender = require('./MailSender');
const Listener = require('./listener');
 
const init = async () => {

	const notesService = new NotesService();
  	const mailSender = new MailSender();
  	const listener = new Listener(notesService, mailSender);

  	// buat koneksi dengan server RabbitMQ
  	const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

  	// buat channel menggunakan fungsi connection.createChannel.
  	const channel = await connection.createChannel();

  	// pastikan queue dengan nama export:notes telah terbuat menggunakan fungsi channel.assertQueue.
  	await channel.assertQueue('export:notes', {
	   durable: true,
  	});

  	channel.consume('export:notes', listener.listen, { noAck: true });

};

init();