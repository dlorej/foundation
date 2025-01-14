import {sql} from "@vercel/postgres"

//if uid and email match, login
//else if email exists, send 2fa
//else create row and send 2fa
export default async function function1(req,res){
    var {uid,email} = req.body
    // var data = {
    //     "recipient":email,
    // }
    // const url = new URL('/api/gapi3', `http://${req.headers.host}`);
    // const gapi_reply = await fetch(url,
    // {
    //     headers: { Accept: "*/*", "Content-Type": "application/json", },
    //     method:"POST",
    //     body: JSON.stringify(data)
    // })
    // const gapi_message = await gapi_reply.json()
    // console.log(gapi_message.message)

    const check = await sql`SELECT uid FROM users WHERE email = ${email}`
    if (check.rows.length == 1){
        //if email in database
        if (uid == check.rows[0].uid){
            //if uid matches email
            return res.status(200).json({message:"done"})
        }else if(uid != check.rows[0].uid){

            //if uid does not match email
            const randomCode = Array.from({ length: 5 }, () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase()

            var data = {
                "recipient":email,
                "code":randomCode
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
                return res.status(200).json({message:"twofa"})
            }
            // console.log(gapi_message.message)
        }
    }else if (check.rows.length == 0){
        await sql`INSERT INTO users (email, uid) VALUES (${email},${uid})`
    }
    return res.status(200).json({message:"done"})
}