import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loggedIn, isAdmin} from '../../../redux/reducer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    passwordsDontMatch = () => toast("Passwords don't match", {
        position: toast.POSITION.TOP_CENTER
    });
    emailTaken = () => toast('Email already in use', {
        position: toast.POSITION.TOP_CENTER
    });
    loginFailed = () => toast('Invalid Credentials', {
        position: toast.POSITION.TOP_CENTER
    });

    register() {
        const {fullName, email, password, confirmedpassword} = this.state;
        if (password!==confirmedpassword) {
            return this.passwordsDontMatch()  
        }
        axios.post('/auth/register', {fullName, email, password}).then(response => {
            this.setState({
                fullName: '',
                email: '',
                password: '',
                confirmedpassword: ''
            });
           this.props.loggedIn(response.data);
        }).catch(() => this.emailTaken())
    }

    login() {
        const {loginEmail, loginPassword} = this.state;
        if (loginEmail === 'admin') {
            var isAdmin = true;
        }
        axios.post('/auth/login', {loginEmail, loginPassword}).then(response => {
            this.setState({
                loginEmail: '',
                loginPassword: ''
            });
            this.props.loggedIn(response.data)
            if (isAdmin) {
                this.props.isAdmin()
            }
        }).catch(() => this.loginFailed());
    }

    render() {
        return (
            <div className='auth-container'>
                <ToastContainer />
                <div className='navContainer'>
                    <Link to='/cart'><i className="fas fa-shopping-cart fa-2x"></i></Link>
                    <Link to='/make'><i className="fas fa-edit fa-2x"></i></Link>
                </div>
                <div className='registration-form'>
                    <h1>Register</h1>
                    <input onChange={e => {this.handleChange('fullName', e.target.value)}} value={this.state.fullName} className='register-name-input' placeholder='Name'/>
                    <input onChange={e => {this.handleChange('email', e.target.value)}} value={this.state.email} className='register-email-input' placeholder='Email'/>
                    <input type='password' onChange={e => {this.handleChange('password', e.target.value)}} value={this.state.password}  className='register-password-input' placeholder='Create Password'/>
                    <input type='password' onChange={e => {this.handleChange('confirmedpassword', e.target.value)}} value={this.state.confirmedpassword} className='register-password2-input' placeholder='Confirm Password'/>
                    <button className='authButton' onClick={this.register}>Register</button>
                </div>
                <div className='login-form'>
                    <h1>Login</h1>
                    <input value={this.state.loginEmail} onChange={e => this.handleChange('loginEmail', e.target.value)} placeholder='Email'/>
                    <input type='password' value={this.state.loginPassword} onChange={e => this.handleChange('loginPassword', e.target.value)} placeholder='Password'/>
                    <button className='authButton' onClick={this.login}>Login</button>
                </div>
            </div>
        )
    }
}

export default connect(null, {loggedIn, isAdmin})(Login);