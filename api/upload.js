import {sql} from "@vercel/postgres"

// export default async function function1(req,res){
//     const data_json = {}
//     try{
//         const pattern = /(?<=[?]).*/
//         const dataset = String(pattern.exec(req.url)).split("&")
//         for (const item of dataset){
//             const item2 = item.split("=")
//             data_json[item2[0]] = item2[1]
//         }
//         const poly = decodeURIComponent(data_json["encoded_poly"])
//         const name = data_json["name"]
//         const output = await sql`INSERT INTO buildings (boundary, name) VALUES (${poly},${name})`
//         return res.status(200).json({message:"ok"})
    
//     }catch(error){
//         return res.status(500).json({message:"fail"})
//     }
// }

export default async function test(req,res){
    try{
        const output = await sql`INSERT INTO buildings (boundary, name) VALUES (a,b)`
        return res.status(200).json({message:"ok"})
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
    
}

//write test case
