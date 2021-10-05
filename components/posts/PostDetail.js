import classes from './PostDetail.module.css'
import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/input'
import Head from 'next/head'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function PostDetail(props){

    // const [comments,commentList]= useState([])
    // const [addingComment,setAddingComment] = useState(false)
    
    const [comments,setCommentProps] = useState({
        comments:[],
        addingComment:false,
        currVal:''
    })
    function addComment(e){
        e.preventDefault()
        // console.log(e.target.comment.value)
        
        setCommentProps({...comments,addingComment:true})
        props.onAddComment(e.target.comment.value).then(res=>{
            setCommentProps({...comments,currVal:''})
            setCommentProps({...comments,addingComment:false})
            setCommentProps({...comments,comments:[...comments.comments,e.target.comment.value]})    
        }).catch(err=>{
            setCommentProps({...comments,addingComment:false})
            alert(err)
        })


        
    }

    useEffect(()=>{
        setCommentProps({...comments,comments:props.comments})
    },[])
    
    
    return(

        <React.Fragment>
            <Head>
                <title>Foto factory - {props.title}</title>
                
            </Head>

            <div className={classes.parentGrid}>
                <div className={classes.imgContainer}>
                    <img src={props.image} className={classes.image} />

                </div>

                <div className={classes.contentContainer}>
                    <h2 style={{ paddingLeft: 10 }}>{props.title}</h2>
                    <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                    <div className={classes.scrollable}>
                        <p style={{ paddingLeft: 10 }}>{props.caption}</p>
                        <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                        <div className={classes.comments}>
                            {comments.comments.length > 0 ? comments.comments.map(comment => <p style={{ paddingLeft: 10 }} key={props.id}>{comment}</p>) : <h1>No comments yet</h1>}
                            {comments.addingComment&&<Box sx={{ display: 'flex',justifyContent:'center',padding:'5px' }}><CircularProgress /></Box>}
                        </div>

                    </div>
                    <hr style={{ background: 'black', color: 'black', margin: 0 }} />
                    <form className={classes.commentAdder} onSubmit={addComment} autoComplete="off">
                        <Input
                            id="comment"
                            style={{ width: '90%', marginLeft: '10px', marginRight: '10px' }}
                            placeholder='Type something...'
                            value={comments.currVal}
                            required
                            onChange={(e)=>{setCommentProps({...comments,currVal:e.target.value})}}
                            endAdornment={
                                <IconButton aria-label="send" type='submit'>
                                    <SendIcon />
                                </IconButton>
                            }
                        />
                    </form>

                </div>

            </div>
        </React.Fragment>

    )
}