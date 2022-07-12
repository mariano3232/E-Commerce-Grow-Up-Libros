const nodemailer = require('nodemailer')
require('dotenv').config()
// const { EMAIL, EMAIL_PASSWORD } = process.env;

this.enviar_mail_premium = async (name, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  let mail_options = {
    from: 'growup-libros',
    to: email,
    subject: 'GROW-UP LIBROS AHORA ERES PREMIUM!',
    html: `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
        <tr height="200px">
            <td bgcolor="" width="600px">
                <h1 style="color: #fff; text-align: center;">Buenos dias ${name}:</h1>
                <p style="color: #fff; text-align: center;"> <span style="color:#e84393;">Felicitaciones usted cuenta con nuestro plan premium, esperamos que disfrute de nuestro contenido.</span> </p>
    
            </td>
        </tr>
    </table>`,
  }
  try {
    const response = await transporter.sendMail(mail_options)
    return console.log('SE ENVIO CON EXITO', response.response)
  } catch (error) {
    console.log('FALLO EL ENVIO DE EMAIL', error)
  }
}

module.exports = this
