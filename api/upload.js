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
        const poly = data_json["poly"]
        const state = data_json["state"]
        const output = await sql`INSERT INTO buildings (builing, state) VALUES (${poly},${state})`
        return res.status(200).json({message:"ok"})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}
