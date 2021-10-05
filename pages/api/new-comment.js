
import { MongoClient,ObjectId } from "mongodb"
export default async function handler(req,res){

    if(req.method==='PUT'){
        try {
            // console.log(req.body)
            const client = await MongoClient.connect('mongodb+srv://superuser:root@cluster0.gmn6g.mongodb.net/postsDB?retryWrites=true&w=majority')

            const db = client.db()
            const collection = db.collection('postDB')

            const response = await collection.updateOne({_id:ObjectId(req.body.postId)},{$push:{comments:req.body.comment}})

            // console.log(req.body.comments)
            client.close()

            res.status(200).json({ message: 'Comment addition Successful' })
        }
        catch (err) {
            console.log(err)
        }
        
    }
}