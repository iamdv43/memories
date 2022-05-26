import React from 'react';

import { useSelector } from 'react-redux';
import Post from './Post/post';
import { Grid, CircularProgress } from '@material-ui/core';

import useStyles from './style';


const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);

    const classes = useStyles()
    return ( 
            !posts.length ? <CircularProgress/> : (
                <Grid container className={classes.container} alignItems='stretch'  spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={10} md={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </Grid>
            )
        );
}
 
export default Posts;