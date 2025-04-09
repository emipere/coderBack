import { Command } from 'commander';
import dotenv from 'dotenv';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'development')
    .option('-u, --username <username>', 'Nombre de Usuario', 'No se a declarado ningun usuario')
program.parse(); //Parsea los comandos y valida si son correctos.



const environment = program.opts().mode;

dotenv.config({
    path: environment === 'production' ? './src/config/.env.production' : './src/config/.env.development'
}) // Esto es para las variables de entorno o sea env. development o prouction 



console.log("Options: ", program.opts());
console.log("Mode: ", program.opts().mode);/*est aes la manera que accedo a las opciones que le pase por comandos */


export default {
    port: process.env.PORT || program.opts().p,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
}




/* Process config */

process.on("exit", code => {
    console.log("Este codigo se ejecuta antes de salir del proceso.");
    console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
    console.log("Esta exception no fue capturada, o controlada.");
    console.log(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
    console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
    console.log(`Mensaje recibido: ${message}`);
});