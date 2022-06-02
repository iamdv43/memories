import React,  { useState} from 'react';
import Posts from '../Posts/posts';
import Form from '../Form/form';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'
import { getPostsBySearch} from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Paginate from '../pagination/Paginate';

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch(); 
    const query = useQuery();
    const history = useNavigate();

    const page =  query.get('page') || 1;
    const searchQuery = query.get('searchQuery') 

    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          history('/');
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return ( 
        <Grow in>   
          <Container maxWidth='xl'> 
              <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>
                  <Grid item xs={12} sm={6} md={9}>
                      <Posts setCurrentId={setCurrentId} />
                  </Grid> 
                  <Grid item xs={12} sm={6} md={3}>
                      <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                          <TextField onKeyDown={handleKeyPress} name='search' variant='outlined' label='Search Memories' fullWidth value={search}  onChange={(e) => setSearch(e.target.value)}/>
                          <ChipInput
                              style={{ margin: '10px 0' }}
                              value={tags}
                              onAdd={(chip) => handleAddChip(chip)}
                              onDelete={(chip) => handleDeleteChip(chip)}
                              label="Search Tags"
                              variant="outlined"
                          />
                          <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                      </AppBar>
                      <Form currentId={currentId}  setCurrentId={setCurrentId} />
                      {(!searchQuery && !tags.length ) && (
                        <Paper elevation={6} className={classes.pagination}> 
                            <Paginate page={page}/>
                        </Paper>
                      )}
                  </Grid>
              </Grid>
          </Container>
        </Grow>
     );
}
 
export default Home;
