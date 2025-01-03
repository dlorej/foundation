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
    // if (req.query.code){
    //     console.log("something")
        // const scopes = [
        //     'https://www.googleapis.com/auth/gmail.send',
        //     'https://www.googleapis.com/auth/gmail.readonly'
    
        // ];
        
        // const url = oauth2Client.generateAuthUrl({
        //     // 'online' (default) or 'offline' (gets refresh_token)
        //     access_type: 'offline',
        
        //     // If you only need one scope, you can pass it as a string
        //     scope: scopes
        // });
        // res.redirect(url)
    //     console.log(url)
    // }else{
    //     console.log("other")
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
        // const {tokens} = await oauth2Client.getToken(code)
        // console.log(tokens)
    // }
    res.send("complete")
}
