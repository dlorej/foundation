import { google } from 'googleapis';

export default async function handler(req, res) {
    //button.html goes to auth page, copy access code from console
    //paste refresh token into env


    const CLIENT_ID = process.env.google_client_id;
    const CLIENT_SECRET = process.env.google_client_secret;
    const REDIRECT_URI = 'http://localhost:3000/pages/button.html'; // Adjust as needed for production
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
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    res.redirect(authUrl)

    // const { tokens } = await oauth2Client.getToken(code);
    // console.log(tokens)
}