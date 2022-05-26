import React from 'react';

import { useSelector } from 'react-redux';
import Post from './Post/post';
import { Grid, CircularProgress } from '@material-ui/core';

import useStyles from './style';


const Posts   = () => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);

    const classes = useStyles()
    return ( 
            !posts.length ? <CircularProgress/> : (
                <Grid className={classes.container} container alignItems='stretch' spacing='3' >
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={6}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )
        );
}
 
export default Posts;