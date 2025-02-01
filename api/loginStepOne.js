import {sql} from "@vercel/postgres"

//if uid and email match, login
//else if email exists, send 2fa
//else create row and send 2fa
export default async function function1(req,res){
    var {uid,email} = req.body

    const check = await sql`SELECT uid FROM users WHERE email = ${email}`
    if (check.rows.length == 1){
        //if email in database
        if (uid == check.rows[0].uid){
            console.log("email matches")
            //if uid matches email => request user info from steptwo => !!send back user info to page!!(not done)
            var data = {
                "email":email,
                "uid":uid
            }
            const url = new URL('/api/loginStepTwo', `http://${req.headers.host}`);
            const steptwo = await fetch(url,
            {
                headers: { Accept: "*/*", "Content-Type": "application/json", },
                method:"POST",
                body: JSON.stringify(data)
            })
            const steptworesponse = await steptwo.json()
            console.log("step2response",steptworesponse)
            //response = user info
            return res.status(200).json(steptworesponse)

        }else if(uid != check.rows[0].uid){
            console.log("2fa step")
            //if uid does not match email => send 2fa code to email, get page to display 2fa input
            const randomKey = Array.from({ length: 5 }, () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase()

            const now = new Date();
            const later = new Date(now.getTime() + 30 * 60 * 1000).getTime()

            var data = {
                "recipient":email,
                "code":`${randomKey}`
            }
            
            const url = new URL('/api/send2fa', `http://${req.headers.host}`);
            const gapi_reply = await fetch(url,
            {
                headers: { Accept: "*/*", "Content-Type": "application/json", },
                method:"POST",
                body: JSON.stringify(data)
            })
            const gapi_message = await gapi_reply.json()
            //message=="done" after email is sent
            if (gapi_message.message == "done"){
                const keyPlusExpiry = `${randomKey} + ${later}`
                await sql`UPDATE users SET twofa = ${keyPlusExpiry} WHERE email = ${email}`
                return res.status(200).json({message:"twofa"})               
            }

        }
    }else if (check.rows.length == 0){
        //if no such email in database => generate 2fa code, send to email
        console.log("new email")
        const randomKey = Array.from({ length: 5 }, () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase()
        console.log(randomKey)

        const now = new Date();
        const later = new Date(now.getTime() + 30 * 60 * 1000).getTime()

        var data = {
            "recipient":email,
            "code":`${randomKey}`
        }
        const url = new URL('/api/send2fa', `http://${req.headers.host}`);
        const gapi_reply = await fetch(url,
        {
            headers: { Accept: "*/*", "Content-Type": "application/json", },
            method:"POST",
            body: JSON.stringify(data)
        })
        const gapi_message = await gapi_reply.json()
        if (gapi_message.message == "done"){
            const keyPlusExpiry = `${randomKey} + ${later}`
            await sql`INSERT INTO users (email, uid, twofa) VALUES (${email},${uid},${keyPlusExpiry})`
            return res.status(200).json({message:"twofa"})               
        }
    }
    return res.status(200).json({message:"done"})
}