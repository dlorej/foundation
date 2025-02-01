import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {command,info} = req.body
    console.log("\ngameFunctions\n")
    if (command == "claimBuilding"){
        return claimBuilding()
    }else{
        console.log('game functions did not detect command')
        return res.status(500).json({message:"fail"})
    }

    async function claimBuilding(){
        var {buildingID,party} = info
        console.log("something",buildingID,party)
        try{
            // const check = await sql`SELECT * FROM buildings WHERE buildingID = ${buildingID}`
            await sql`UPDATE buildings
                SET state = ${party}
                WHERE buildingid = ${buildingID}`
            return res.status(200).json({message:"works"})
        }catch(error){
            return res.status(500).json({message:"fail"})
        }
    }
}