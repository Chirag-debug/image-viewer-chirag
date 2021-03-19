import React, {Component} from 'react';
import './Login.css';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Header from '../../common/header/Header';
import {FormHelperText} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            loginPassword: "",
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            incorrectCredentials: "dispNone",
            flag: false,
        };
    }

    usernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
        console.log(this.state.username);
    }

    passwordChangeHandler = (e) => {
        this.setState({username: e.target.value})
        console.log(this.state.loginPassword);
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        let username = "username";
        let password = "password";
        let accessToken = "IGQVJVbzFKWUVzbk5UcFp5MG1WTk5NNV9XejNuZA3VtcEZAoRTNvemE2V2lWQ0NBWFgtN2EtRFV3TDdUNXBEV05IVWxQX3NmOHU1bDFmdF9Ob3ZA3QVJfSWNIUGI5ZAC1HVnBPZATY1VjFBMHNiQ1NEQkJLawZDZD";
        this.setState({ incorrectCredentials: "dispNone" });
        if (
            this.state.username === username &&
            this.state.loginPassword === password
        ) {
            window.sessionStorage.setItem("access-token", accessToken);
            // this.props.history.push("/home");
            this.setState({flag: true});

        } else {
            if (this.state.username !== "" && this.state.loginPassword !== "") {
                this.setState({ incorrectCredentials: "dispBlock" });
            }
        }
    };

    render() {
        return (
        <div>
        {this.state.flag === true ? <Redirect to = "/home"/> :
            <div>
                <Header/>
                <div className="PageBody">
                    <Card   className="LoginCard">
                        <p className="LoginTitle" >Login</p>
                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" className="InputField" style = {{width: 400}} username={this.state.username} onChange={this.usernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="warning">required</span></FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" className="InputField" style = {{width: 400}} password={this.state.loginPassword} onChange={this.passwordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="warning">required</span></FormHelperText>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormHelperText className={this.state.incorrectCredentials}><span className="warning" style={{fontSize: "14px"}}>Incorrect username and/or password</span></FormHelperText>
                        <br/>
                        <Button variant="contained" color="primary" className="LoginBtn" onClick={this.loginClickHandler}>LOGIN</Button>
                        <br/>
                    </Card>
                </div>
            </div>
        }
        </div>
        );
    }
}

export default Login;
