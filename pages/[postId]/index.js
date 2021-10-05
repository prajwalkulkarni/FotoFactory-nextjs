import React from "react"
import { MongoClient, ObjectId } from "mongodb"
import PostDetail from "../../components/posts/PostDetail"
function PostDetails(props){

    async function addCommentHandler(commentContent){
        
        const postData = {
            postId:props.postDetail.id,
            comment:commentContent
        }

        // console.log(postData)
        try {
            const response = await fetch('/api/new-comment', {
                method: 'PUT',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            const data = await response.json()
            // console.log(data)
            // router.replace('/')

        } catch (err) {
            console.log("addCommentHandler"+err)
        }

    }
    return(
        <PostDetail {...props.postDetail} onAddComment={addCommentHandler}/>
    )
}



export async function getStaticProps(context){
    // console.log("get static props")
    const postId = context.params.postId
    const client = await MongoClient.connect('mongodb+srv://superuser:root@cluster0.gmn6g.mongodb.net/postsDB?retryWrites=true&w=majority')

    const db = client.db()
    const collection = db.collection('postDB')
    const post = await collection.findOne({_id:ObjectId(postId)})
    // console.log(post)
    client.close()
    

    return {
        props:{
            postDetail:{
                id:post._id.toString(),
                title:post.title,
                image:post.image,
                caption:post.description,
                comments:post.comments
            }
        },
    }
}
export async function getStaticPaths(){
    
    const client = await MongoClient.connect('mongodb+srv://superuser:root@cluster0.gmn6g.mongodb.net/postsDB?retryWrites=true&w=majority')

    const db = client.db()
    const collection = db.collection('postDB')
    const posts = await collection.find({},{_id:1}).toArray()
    
    client.close()
    return{
        fallback:'blocking',
        paths:posts.map(post=>({params:{postId:post._id.toString()}}))
    }
}


export default PostDetails