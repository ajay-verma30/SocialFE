import React, { useState } from 'react'
import './Common.css'
import {Container, Form, Button} from 'react-bootstrap'
import {useUser} from '../../Context/UserContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navi = useNavigate();
    const {login}  = useUser();
    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const userDetails = {username, userPassword};
            const result = await axios.post("http://localhost:3001/users/login", userDetails);
            const userData = result.data;
            login(userData);
            navi('/');
        }
        catch(e){
            if(e.respone){
                console.log(e.respone);
                alert(e.respone);
            }else if(e.request){
                console.log(e.request);
                alert("Server not responding. Please try again later.");
            }else {
                console.error("Error:", e.message);
                alert("An error occurred. Please try again.");
            }
        }
    }

    const handleRegisterPage = () =>{
        navi('/registration');
    }
  return (
    <> 
        <Container className='login-registration-form'>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='USERNAME'value={username} onChange={(e)=>setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='PASSWORD' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <br></br>
                <Button type='submit'>LOGIN</Button>
                <p onClick={handleRegisterPage}className='loginRegisterBTN'>New User? Register</p>
            </Form>
        </Container>
    </>
  )
}

export default Login