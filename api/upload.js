import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    const data_json = {}
    try{
        const pattern = /(?<=[?]).*/
        const dataset = String(pattern.exec(req.url)).split("&")
        for (const item of dataset){
            const item2 = item.split("=")
            data_json[item2[0]] = item2[1]
        }
        const poly = decodeURIComponent(data_json["encoded_poly"])
        const name = decodeURIComponent(data_json["name"])
        // poly = (10,20),(15,25),(20,20),(10,20)
        const formatpoly = `'(${poly})'`

        // const output = await sql`INSERT INTO buildings (boundary, name, state) VALUES (\'${poly}\',${name},0)`

        // const query = `SELECT * FROM buildings WHERE boundary = ${formatpoly}`
        // await sql`INSERT INTO buildings (boundary, name, state) VALUES (${formatpoly},${name},0)`
        const check = await sql`SELECT * FROM buildings WHERE boundary = ${formatpoly}`
        if (check.rows.length == 0){
            var output = await sql`INSERT INTO buildings (boundary, name, state) VALUES (${formatpoly},${name},0)`
        } else {
            var output = "exists"
        }

        // const output = [poly,query,...a.rows]
        return res.status(200).json({message:output})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}


//write test case
