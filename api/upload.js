import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    const data_json = {}
    try{
        
        const {name,poly} = req.body
        console.log(name,poly)

        // const pattern = /(?<=[?]).*/
        // const dataset = String(pattern.exec(req.url)).split("&")
        // for (const item of dataset){
        //     const item2 = item.split("=")
        //     data_json[item2[0]] = item2[1]
        // }
        // const poly = decodeURIComponent(data_json["encoded_poly"])
        // const name = decodeURIComponent(data_json["name"])
        // // const formatpoly = `(${poly})`




        // const check = await sql`SELECT * FROM buildings WHERE boundary = ${poly}`
        // if (check.rows.length == 0){
        //     var output = await sql`INSERT INTO buildings (boundary, name, state) VALUES (${poly},${name},0)`
        // } else {
        //     var output = "exists"
        // }

        // const output = [poly,query,...a.rows]
        return res.status(200).json({message:name})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}


//write test case
