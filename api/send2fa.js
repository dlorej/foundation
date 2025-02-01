import { google } from 'googleapis';

export default async function handler(req, res) {
    var {recipient,code} = req.body
    console.log("2fa",recipient,code)

    const CLIENT_ID = process.env.google_client_id;
    const CLIENT_SECRET = process.env.google_client_secret;
    const REDIRECT_URI = 'http://localhost:3000/button.html'; // Adjust as needed for production
    const refreshToken = process.env.google_refresh_token;

    const scopes = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly'

    ];

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauth2Client.setCredentials({
        refresh_token: `${refreshToken}`
    })

    const { token } = await oauth2Client.getAccessToken()
    oauth2Client.setCredentials({
        access_token: `${token}`
    });
    const gmail = google.gmail({version: 'v1', auth: oauth2Client});

    const emailLines = [
        'From: jeroldlimjunpin@gmail.com',
        `To: ${recipient}`,
        'Content-type: text/html;charset=utf-8',
        'Subject: [NonUniform] Your Access Code',
        '',
        `<p>Your Access Code: <span style="font-size: 24px;">${code}</span></p>`
    ];
    const email = emailLines.join('\r\n').trim();
    const b64 = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    gmail.users.messages.send({
        userId: 'me',
        resource: {
            raw: b64
        }
    }).then(()=>{
        return res.status(200).json({message:"done"})
    });    
}
