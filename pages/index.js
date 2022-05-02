import { MongoClient } from 'mongodb'
import PostList from '../components/posts/PostList'
import Head from 'next/head'
import { Fragment } from 'react'

export default function HomePage(props){
    
    return(
        <Fragment>
            <Head>
                <title>Foto factory</title>
            </Head>
            <PostList posts={props.posts}/>
        </Fragment>
    )

}

export async function getStaticProps(){
    const client = await MongoClient.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gmn6g.mongodb.net/postsDB?retryWrites=true&w=majority`)

    const db = client.db()
    const collection = db.collection('postDB')
    const posts = await collection.find().toArray()

    client.close()

    return{
        props:{
            posts:posts.map((post)=>({
                title:post.title,
                image:post.image,
                caption:post.description,
                id: post._id.toString()


            }))
        }
    }
}