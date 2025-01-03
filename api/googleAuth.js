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
    const { code } = req.query;
    console.log(code)

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        // Exchange the authorization code for an access token
        const { tokens } = await oauth2Client.getToken(code);
        console.log(tokens)
        oauth2Client.setCredentials(tokens);

        // Now you can use oauth2Client to interact with Google APIs, e.g., send an email
        // res.send('Authentication successful! You can now send confirmation emails.');
        res.redirect(REDIRECT_URI);
    } catch (error) {
        console.error('Error exchanging code for token', error);
        res.status(500).send('Error during authentication');
    }
}
