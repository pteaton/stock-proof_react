import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import '../index.css'

export default class LoginRegisterForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			email: '',
			password: '',
			bio: '',
			action: 'Login'
		}
	}

	switchAction = () => {
		if(this.state.action === "Login")  {
			this.setState({
				action: 'Register'
			})
		} else {
			this.setState({
				action: 'Login'
			})
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		if(this.state.action === 'Register') {
			this.props.register(this.state)
		} else {
			this.props.login(this.state)
		}
	}

	render() {
		return (
			<div className='LoginRegisterForm'>
				<h3> {this.state.action} </h3>
				{
					this.state.action === "Login"
					?
					<p> Don't have an account yet? <span onClick={this.switchAction} className='fake-link'>Create one here</span></p>
					:
					<p> Already have an account with us? <span onClick={this.switchAction} className='fake-link'>Sign in here</span></p>
				}
				{
					this.state.action === 'Register'
					&&
					<div className="authDivRequired">
						<h4> Required Information </h4>
						<h6> You will not be able to change these later, so make the right choice*</h6>
					</div>

				}
				<Form onSubmit={this.handleSubmit}>
					<Label> Username </Label>
					<Form.Input
						name='username'
						type='text'
						value={this.state.value}
						placeholder='Username here'
						onChange={this.handleChange}
						required
					/>
					{
						this.state.action === 'Register'
						&&
						<React.Fragment>
							<Label> Email </Label>
							<Form.Input 
								name='email'
								type='text'
								value={this.state.value}
								placeholder='Email here'
								onChange={this.handleChange}
								required
							/>
						</React.Fragment>
					}
					<Label> Password </Label>
					<Form.Input 
						name='password'
						type='password'
						value={this.state.value}
						placeholder='Password'
						onChange={this.handleChange}
						required
					/>
					{
						this.state.action === 'Register'
						&&
						<React.Fragment>
							<Label> Bio </Label>
							<Form.TextArea
								name='bio'
								type='text'
								value={this.state.value}
								placeholder='A little bit about you here...'
								onChange={this.handleChange}
							/>
						</React.Fragment>
					}
					<Button type='submit'> {this.state.action} </Button>
				</Form>
			</div>
		)
	}
}