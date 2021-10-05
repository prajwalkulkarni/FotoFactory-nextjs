import React from "react";
import classes from './LoadingComponent.module.css'
export default function LoadingComponent(){

    return(
        <React.Fragment>
            <div className={classes.backdrop}></div>
            <div className={classes.overlay}>
                <div className={classes.loadingSpinner}></div>
            </div>
        </React.Fragment>
    )
}