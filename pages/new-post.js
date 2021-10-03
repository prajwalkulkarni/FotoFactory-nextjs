import { useRouter } from "next/router";
import NewPostForm from "../components/posts/NewPostForm";
export default function NewPostPage(){
    const router = useRouter()

    async function addPostHandler(postData){
        console.log("Add post handler")

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

    }
    return(
        <NewPostForm onAddPost={addPostHandler}/>
    )

}