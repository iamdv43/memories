import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from './images/memories.png'
import Posts from './components/Posts/posts';
import Form from './components/Form/form';
import useStyles from './styles'
import {getPosts} from './actions/posts'
import { useDispatch } from 'react-redux';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId,dispatch]);

    return ( 
        <Container maxidth="lg">
            <AppBar className={classes.appBar}  position='static' color='inherit'>
                <Typography className = {classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.images} src={memories} alt="memories" height="60"></img>
            </AppBar>
            <Grow in>   
                <Container> 
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid> 
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId}  setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

      );
}
  

export default App;