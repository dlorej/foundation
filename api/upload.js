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
        const formatpoly = `'(${poly})'`
        // const output = 
        // `SELECT EXISTS 
        // (SELECT 1 FROM buildings WHERE boundary::text = '\(${poly}\)')`
        // const output = await sql`SELECT EXISTS 
        // (SELECT 1 FROM buildings WHERE boundary::text = '${poly}')`

        //     SELECT 1 
        //     FROM buildings 
        //     WHERE boundary::text = '\(${poly}\)'
        // )`
        // const output = await sql`INSERT INTO buildings (boundary, name) VALUES (${poly},${name})`

        const output = await sql`SELECT * FROM buildings WHERE boundary::text = ${formatpoly}`
        return res.status(200).json({message:output.rows})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}

// export default async function test(req,res){
//     try{
//         const output = await sql`INSERT INTO buildings (boundary, name)
//     VALUES ('((10, 20), (15, 25), (20, 20), (10, 20))', 'Sunrise Tower')`
//         return res.status(200).json({message:"ok"})
//     }catch(error){
//         return res.status(500).json({message:"fail2"})
//     }
// }

//write test case
