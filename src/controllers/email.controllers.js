import nodemailer from 'nodemailer';
import config from '../config/config.js';
import { __dirname } from '../path.js';



const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("El servidor está listo para enviar mensajes");
    }
})

const mailOptions = {
    from: "Emi App" + config.gmailAccount,
    to: "emipereiro@gmail.com",
    subject: "Prueba de envio de correo a mi mismo",
    text: "Mensaje de prueba desde el servidor de Node.js",   
    html: "<div></div><h1>Hola desde el servidor de Node.js</h1></div>",
    attachments: []
}

const mailOptionsWithAttachments = {
    from: "Emi App" + config.gmailAccount,
    to: "emipereiro@gmail.com" ,
    subject: "Prueba de envio de correo a mi mismo",
    text: "Mensaje de prueba desde el servidor de Node.js",   
    html: `<div></div><h1>Hola desde el servidor de Node.js</h1>
            <p>Con imagenes </p>
            <img src = "cid:paisaje"/>
            </div>`,
    attachments: [
        {
            filename: "Foto de paisaje",
            path: __dirname + "/public/img/paisaje.jpg",
            cid: "paisaje" 
        }
    ]
}
export const sendEmail = async (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).send({message: "error", payload: error})
            }
                console.log("Email enviado: ", info.messageId);

                res.send({message: "success", payload: info});
            
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error, message: "Error al enviar el correo desde: " + config.gmailAccount});
    }
}

export const sendEmailWitchAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).send({message: "error", payload: error})
            }
                console.log("Email enviado: ", info.messageId);

                res.send({message: "success", payload: info});
            
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error, message: "Error al enviar el correo desde: " + config.gmailAccount});
    }

}