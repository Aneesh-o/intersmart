import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userLoginApi, userRegisterApi } from '../Services/allApi';

const Authentication = ({ insideRegister }) => {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        username: "", email: "", password: ""
    })


    const registerEmployer = async (e) => {
        e.preventDefault();
        if (userDetails.username && userDetails.email && userDetails.password) {
            try {
                const result = await userRegisterApi(userDetails);
                if (result.status == 200) {
                    alert("Registration successful...Please log in!!!");
                    navigate('/');
                    setUserDetails({ username: "", email: "", password: "" });
                } else if (result.status === 406) {
                    alert(result.response?.data || "Not Acceptable");
                    navigate('/');
                    setUserDetails({ username: "", email: "", password: "" });
                }
            } catch (err) {
                alert("An error occurred during registration.");
            }
        } else {
            alert("Please fill the form completely...");
        }
    };

    const loginEmployer = async (e) => {
        e.preventDefault();
        if (userDetails.email && userDetails.password) {
            try {
                const result = await userLoginApi(userDetails)
                if (result.status == 200) {
                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    navigate("/Home")
                    setUserDetails({ username: "", email: "", password: "" });
                } else if (result.status == 404) {
                    alert(result.response.data)
                    setUserDetails({ username: "", email: "", password: "" });
                }
            } catch (err) {
                console.log(err);
                alert("An error occurred during login.");
            }
        } else {
            alert("Please fill the form completely...");
        }
    };


    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0A3321', color: 'white' }}>
                <div>
                    <div className="p-3">
                        {
                            insideRegister ?
                                <h3>Create your account</h3>
                                :
                                <h3>Login into your account</h3>
                        }
                        <Form>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="email" placeholder="Enter your email" />
                            </Form.Group>
                            {
                                insideRegister &&
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} placeholder="Enter your name" />
                                </Form.Group>
                            }
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder="Enter a password" />
                            </Form.Group>
                            {
                                insideRegister ?
                                    <Button onClick={registerEmployer} style={{ width: '100%' }} variant="primary" type="submit" className="mt-3">
                                        Register
                                    </Button>
                                    :
                                    <Button onClick={loginEmployer} style={{ width: '100%' }} variant="primary" type="submit" className="mt-3">
                                        Login
                                    </Button>
                            }
                            <div className='mt-2 d-flex justify-content-between'>
                                {
                                    !insideRegister ?
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                        :
                                        <Form.Text className="text-muted">
                                            <a href="/">Already Have an account</a>
                                        </Form.Text>
                                }
                                {!insideRegister &&
                                    <Form.Text className="text-muted">
                                        <a href="/Register">Create an account</a>
                                    </Form.Text>}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Authentication;
