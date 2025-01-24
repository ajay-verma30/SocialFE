import React, { useState } from 'react'
import './Common.css'
import {Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userPassword, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const handleRegistration = async (e) => {
        e.preventDefault();
    
        const userDetails = { username, userPassword };
        
        if (!username || !userPassword || !confPassword) {
            alert("Please fill all the fields");
            return;
        }
    
        if (userPassword !== confPassword) {
            alert("Passwords do not match");
            return;
        }
    
        try {
            const result = await axios.post("http://localhost:3001/users/new", userDetails);
            if(result.status === 201){
                navigate('/login')
            }
            else{
                alert(`${result.data}`);
            }
            
        } catch (error) {
            if (error.response) {
                alert(error.response.data); 
            } else if (error.request) {
                alert("Server not responding. Please try again later.");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    const handleLoginPage =()=>{
        navigate('/login')
    }
    
  return (
    <>
      <Container className='login-registration-form'>
            <Form onSubmit={handleRegistration}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='USERNAME' value={username} onChange={(e)=>setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='PASSWORD'  value={userPassword} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='CONFIRM PASSWORD'  value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <br></br>
                <Button type='submit'>Register</Button>
                <p onClick={handleLoginPage} className='loginRegisterBTN'>Existing User? Login</p>
            </Form>
        </Container>
        </>
  )
}

export default Registration