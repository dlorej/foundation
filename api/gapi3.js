import { google } from 'googleapis';

export default async function handler(req, res) {
    const CLIENT_ID = process.env.google_client_id;
    const CLIENT_SECRET = process.env.google_client_secret;
    const REDIRECT_URI = 'http://localhost:3000/button.html'; // Adjust as needed for production
    const refreshToken = process.env.google_refresh_token;

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    oauth2Client.setCredentials({
        refresh_token: `${refreshToken}`
    });
    const { token } = await oauth2Client.getAccessToken()
    oauth2Client.setCredentials({
        access_token: `${token}`
    });
    const gmail = google.gmail({version: 'v1', auth: oauth2Client});
    const reply = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = reply.data.labels;
    console.log(labels)
    res.send("complete")
}
