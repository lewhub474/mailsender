import  {google}  from "googleapis";
import nodemailer from "nodemailer";
import * as account from "../../account_transport.json" assert { type: "json" };

const OAuth2 = google.auth.OAuth2;
const accountTransport = account.default;

export const mailSender = async (email) => {

    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
    oauth2Client.getAccessToken((err, token) => {
        if (err){
            console.log(err);
        }
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: "OAuth2",
              clientId:  accountTransport.auth.clientId,
              clientSecret: accountTransport.auth.clientSecret,
            },
          });
          transporter.sendMail({
            from: accountTransport.auth.user,
            to: email,
            subject: "Registro exitoso",
            text: "Su registro se ha realizado exitosamente",
            auth: {
              user: accountTransport.auth.user,
              refreshToken: accountTransport.auth.refreshToken,
              accessToken: token,
              expires: 1484314697598,
            },
          });

         
    });

    
};