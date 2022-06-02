import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import useStyles from './style';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeteleIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'; 
import moment from 'moment';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';


const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = () => history(`/posts/${post._id}`)

    return ( 
        <Card className={classes.card} raised elevation={6}>
         
                {!post.selectedFile ? (
                    <div className={classes.media} title={post.title} />
                ) : (
                    <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                )}
                <div className={classes.overlay}>
                    <div>
                        <Typography variant='h6'>{post.name}</Typography>
                    </div>
                    <Typography variant='h6'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button >
                        <MoreHorizIcon style={{color: 'white'}} size='small' onClick={()=>setCurrentId(post._id)} fontSize="medium" />
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant='h11' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Button className={classes.title} onClick={openPost} gutterBottom variant="contained" component="h2">{post.title}</Button>
               
                <CardContent>
                    <Typography variant="h11" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id)) }>
                    <DeteleIcon fontSize='small'/>
                    &nbsp; Delete
                </Button>
                )}
            </CardActions>
        </Card>
    );
}
 
export default Post;