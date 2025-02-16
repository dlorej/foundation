import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {uid,email,twofa=null} = req.body
    console.log("uid",uid)

    const check = await sql`SELECT * FROM users WHERE email = ${email}`
    if (check.rows.length == 1){
        //if email in database
        if (twofa != null){
            let [saved_twofa,expiry] = check.rows[0].twofa.split(" + ")
            twofa = twofa.toUpperCase()
            let now = new Date().getTime()
            if (twofa == saved_twofa && now <= expiry){
                console.log("2fa matches and not expired, updating database")
                await sql`UPDATE users SET uid = ${uid} WHERE email = ${email}`
            }
        }
        console.log(uid,check.rows[0].uid)
        if (uid == check.rows[0].uid){
            console.log("part2")
            //if uid matches email
            const info = await sql`SELECT inventory,party FROM users WHERE email = ${email}`
            console.log(info.rows[0])
            return res.status(200).json(info.rows[0])
        } else{
            return res.status(200).json({message:"unknown error"})
        }
    } else{
        return res.status(200).json({message:"fail"})
    }

}