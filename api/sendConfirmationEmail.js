// // import { google } from 'googleapis';

// import fs from 'fs/promises';
// import path from 'path';
// import process from 'process';
// import { authenticate } from '@google-cloud/local-auth';
// import { google } from 'googleapis';

// export default async function function1(req,res){
//     try{
//         const CLIENT_ID = process.env.google_client_id;
//         const CLIENT_SECRET = process.env.google_client_secret;
//         const redirect_url = "http://localhost:3000"

//         // Discovery doc URL for APIs used by the quickstart
//         const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

//         // Authorization scopes required by the API; multiple scopes can be
//         // included, separated by spaces.
//         const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

//         const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,redirect_url)

//         // const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
//         const authUrl = oAuth2Client.generateAuthUrl({
//             access_type: 'offline',
//             scope: ['https://www.googleapis.com/auth/gmail.send'],
//         });
//         console.log("hello")
//         res.redirect(authUrl);
//         // console.log(`Authorize this app by visiting: ${authUrl}`);
//         // const { tokens } = await oAuth2Client.getToken(code);
//         // oAuth2Client.setCredentials(tokens);

        
//         // const randomCode = Array.from({ length: 4 }, () => Math.floor(Math.random() * 36).toString(36)).join('');;
//         // const emailLines = [
//         //     'From: jeroldlimjunpin@gmail.com',
//         //     'To: jeroldlimjunpin@gmail.com',
//         //     // 'Content-type: text/html;charset=utf-8',
//         //     // 'MIME-Version: 1.0',
//         //     'Subject: [NonUniform] Your Access Code',
//         //     '',
//         //     `Your Access Code: <span style="font-size: 24px;">${randomCode.toUpperCase()}</span>`
//         // ];
//         // const email = emailLines.join('\r\n').trim();
//         // const b64 = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

//         // // gmail.users.messages.send({
//         // //     userId: 'me',
//         // //     // access_token:TOKEN,
//         // //     resource: {
//         // //         raw: b64
//         // //     }
//         // // });

//         // // console.log(emailLines)
//         // // console.log(CLIENT_ID)
//         // return res.status(200).json({message:"success"})
//     }
//     catch{
//         return res.status(500).json({message:"fail"})
//     }
    
// }


import { google } from 'googleapis';

const CLIENT_ID = process.env.google_client_id;
const CLIENT_SECRET = process.env.google_client_secret;
const REDIRECT_URI = 'http://localhost:3000/api/googleAuth'; // Adjust as needed for production

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

export default async function handler(req, res) {
// Generate the Google OAuth URL
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send',
});

// Redirect the user to the Google authentication page
res.redirect(authUrl);
}
