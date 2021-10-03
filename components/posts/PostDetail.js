import classes from './PostDetail.module.css'
import { useEffect, useState } from 'react';
import Input from '@material-ui/core/input'
// import SendIcon from '@material-ui/icons-material/Send';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@material-ui/core';

export default function PostDetail(props){

    const [comments,commentList]= useState([])

    function addComment(e){
        e.preventDefault()
        // console.log(e.target.comment.value)
        commentList([...comments,e.target.comment.value])
        props.onAddComment(e.target.comment.value)


        
    }

    useEffect(()=>{
        commentList(props.comments)
    },[])
    
    
    return(
        <div className={classes.parentGrid}>
            <div className={classes.imgContainer}>
                    <img src={props.image} className={classes.image}/>
                
            </div>

            <div className={classes.contentContainer}>
                <h2>{props.title}</h2>
                <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                <div className={classes.scrollable}>
                    <p>{props.caption}</p>
                    <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                    <div className={classes.comments}>
                        {comments.length>0?comments.map(comment=><p key={props.id}>{comment}</p>):<h1>No comments yet</h1>}

                    </div>

                </div>
                <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                <form className={classes.commentAdder} onSubmit={addComment} autoComplete="off">
                   

                    
                    <Input
                        id="comment"

                        placeholder='Type something...'
                        endAdornment={
                            <IconButton aria-label="send" type='submit'>
                                <SendIcon/>
                            </IconButton>
                        }
                    />
                </form>

            </div>

        </div>

        
    )
}