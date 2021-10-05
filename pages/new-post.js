import { useRouter } from "next/router";
import React, { useState } from "react";
import NewPostForm from "../components/posts/NewPostForm";
import Head from 'next/head'
import LoadingComponent from "../components/layout/LoadingComponent";
export default function NewPostPage(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    async function addPostHandler(postData){
        // console.log("Add post handler")
        // setLoading(true)
        try {
            const response = await fetch('/api/new-post', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })


            const data = await response.json()
            // console.log(data)
            
            router.replace('/')
            
            

        } catch (err) {
            console.log("addPostHandler"+err)
        }
        finally{
            setLoading(false)
        }

    }

    function loadingSpinnerHandler(){
        setLoading(true)
    }
    return(
        <React.Fragment>
            <Head>
                <title>Foto factory - Add new post</title>
                <metadata name="description" content="Foto factory add a new post."/>
            </Head>
            {loading&&<LoadingComponent/>}
            <NewPostForm onUploadBegin={loadingSpinnerHandler} onAddPost={addPostHandler}/>
        </React.Fragment>
        
    )

}