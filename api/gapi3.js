export default async function handler(req, res){
    const CLIENT_ID = process.env.google_client_id;
    const CLIENT_SECRET = process.env.google_client_secret;
    const REDIRECT_URI = 'http://localhost:3000/button.html'; // Adjust as needed for production

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    const randomCode = Array.from({ length: 4 }, () => Math.floor(Math.random() * 36).toString(36)).join('');;
    const emailLines = [
        'From: jeroldlimjunpin@gmail.com',
        'To: jeroldlimjunpin@gmail.com',
        // 'Content-type: text/html;charset=utf-8',
        // 'MIME-Version: 1.0',
        'Subject: [NonUniform] Your Access Code',
        '',
        `Your Access Code: <span style="font-size: 24px;">${randomCode.toUpperCase()}</span>`
    ];
    const email = emailLines.join('\r\n').trim();
    const b64 = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    gmail.users.messages.send({
        userId: 'me',
        // access_token:TOKEN,
        resource: {
            raw: b64
        }
    });
}