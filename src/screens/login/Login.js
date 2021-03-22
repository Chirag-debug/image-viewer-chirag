import React, {Component} from 'react';
import './Login.css';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Header from '../../common/header/Header';
import {FormHelperText} from '@material-ui/core';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            loginPassword: "",
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            incorrectCredentials: "dispNone",
        };
    }

    usernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }

    passwordChangeHandler = (e) => {
        this.setState({loginPassword: e.target.value})
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        let username = "username";
        let password = "password";
        let accessToken = "IGQVJXNm5mcjAwUHpveEFpeEgyMEc3MWIzY0pEWVJobG1yS2RsOHhBemJvWV8zVnB1Mm1jYUlXQWIxUkQ1MHNMWERYa0hiVHpoX2RBb3NHMURxc25RWTM3cFMwOUttYU13RUtaejdjRjdaVU1NeHpvQwZDZD";
        this.setState({ incorrectCredentials: "dispNone" });
        if (
            this.state.username === username &&
            this.state.loginPassword === password
        ) {
            window.sessionStorage.setItem("access-token", accessToken);
            this.props.history.push("/home");

        } else {
            if (this.state.username !== "" && this.state.loginPassword !== "") {
                this.setState({ incorrectCredentials: "dispBlock" });
            }
        }
    };

    render() {
        return (
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
        );
    }
}

export default Login;
