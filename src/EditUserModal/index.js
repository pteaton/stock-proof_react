import React, { Component } from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react'

export default class EditUserModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: this.props.userToShowData.username,
			email: this.props.userToShowData.email,
			bio: this.props.userToShowData.bio,
			message: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.editUser(this.state)

	}

	render() {
		return (
			<Modal trigger={<Button>Edit</Button>} className='EditUserModal' closeIcon>
				<div className='ModalForm'>
					<h3>Edit Your Profile:</h3>
					<Form onSubmit={this.handleSubmit}>
						<Label>Username:</Label>
						<Form.Field
							name='username'
							type='text'
							value={this.state.username}
							placeholder='edit username here...'
							onChange={this.handleChange}
						/>					
						<Label>Email:</Label>
						<Form.Field
							name='email'
							type='text'
							value={this.state.email}
							placeholder='edit email here...'
							onChange={this.handleChange}
						/>
						<Label>Bio:</Label>
						<Form.TextArea 
							name='bio'
							type='text'
							value={this.state.bio}
							placeholder='edit bio here...'
							onChange={this.handleChange}
						/>
						<Button type='submit'>Apply Changes</Button>
					</Form>
				</div>
			</Modal>
		)
	}
}