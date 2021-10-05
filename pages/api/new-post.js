import { MongoClient } from "mongodb";


export default async function handler(req,res){

    if(req.method==="POST"){
        
        try {
            // console.log(req.body)
            const client = await MongoClient.connect('mongodb+srv://superuser:root@cluster0.gmn6g.mongodb.net/postsDB?retryWrites=true&w=majority')

            const db = client.db()
            const collection = db.collection('postDB')

            const response = await collection.insertOne(req.body)

            console.log("api block")
            client.close()

            res.status(201).json({ message: 'Insertion Successful' })
        }
        catch (err) {
            console.log(err)
        }
        
        
    }
}