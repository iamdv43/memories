import React, {useState, useEffect} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';



import Icon from './Icon';
import useStyles from './styles';
import Input  from './Input';

const Auth = () => {

    const gClientId="200800960805-o90rcpqr3ll9tojb4utth1jbl2rka0ja.apps.googleusercontent.com"

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: gClientId,
            scope: ""
          })
        };
    
        gapi.load('client:auth2', start);
    });



    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = () =>{

    };

    const handleChange = () => {

    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try{
            dispatch({type: 'AUTH', data: {result, token}})

            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    const googleError  = (error) => {
        console.log(error)
        console.log("Google sign in was unsuccessful. Try again later.")
    }

  return (
    <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component='h1' variant='h5'> {isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                    )}
                    <Input name='email' label='Email' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}                     
                </Grid>
                
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    clientId={gClientId}
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy={'single_host_origin'}
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item >
                            <Button onClick={switchMode}> 
                                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"  }
                            </Button>
                    </Grid>
                </Grid>
            </form>
            
        </Paper>
    </Container>
  )
}

export default Auth