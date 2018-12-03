import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loggedIn} from '../../../redux/reducer';

class Login extends Component {
    constructor() {
        super();
        this.state= {
            fullName: '',
            email: '',
            password: '',
            confirmedpassword: '',
            passwordsMatch: null,
            loginEmail: '',
            loginPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(key, value) {
        this.setState({[key]: value})
    }

    register() {
        const {fullName, email, password, confirmedpassword} = this.state;
        if (password!==confirmedpassword) {
            return alert("passwords don't match")  
        }
        axios.post('/auth/register', {fullName, email, password}).then(() => {
            this.setState({
                fullName: '',
                email: '',
                password: '',
                confirmedpassword: ''
            });
           this.props.updateUser({fullName, email});
           alert('sucessfully registered'); 
        })
    }

    login() {
        const {loginEmail, loginPassword} = this.state;
        axios.post('/auth/login', {loginEmail, loginPassword}).then(response => {
            this.setState({
                loginEmail: '',
                loginPassword: ''
            });
            this.props.loggedIn(response.data)
        })
    }

    render() {
        return (
            <div className='auth-container'>
                <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                <div className='registration-form'>
                    <h1>Register</h1>
                    <input onChange={e => {this.handleChange('fullName', e.target.value)}} value={this.state.fullName} className='register-name-input' placeholder='Name'/>
                    <input onChange={e => {this.handleChange('email', e.target.value)}} value={this.state.email} className='register-email-input' placeholder='Email'/>
                    <input onChange={e => {this.handleChange('password', e.target.value)}} value={this.state.password}  className='register-password-input' placeholder='Create Password'/>
                    <input onChange={e => {this.handleChange('confirmedpassword', e.target.value)}} value={this.state.confirmedpassword} className='register-password2-input' placeholder='Confirm Password'/>
                    <button onClick={this.register}>Register</button>
                </div>
                <div className='login-form'>
                    <h1>Login</h1>
                    <input value={this.state.loginEmail} onChange={e => this.handleChange('loginEmail', e.target.value)} placeholder='email'/>
                    <input value={this.state.loginPassword} onChange={e => this.handleChange('loginPassword', e.target.value)} placeholder='password'/>
                    <h6>Admin</h6>
                    <input type='checkbox'/>
                    <button onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {loggedIn})(Login);