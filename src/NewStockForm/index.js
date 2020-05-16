import React, { Component } from 'react'
import { Form, Button, Label, Input} from 'semantic-ui-react'


export default class NewStockForm extends Component {

	constructor() {
		super()

		this.state = {
			symbol: '',
			name: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		this.props.addStock(this.state)
		this.hideModal()
	}

	hideModal = () => {
		this.setState({
			showModal: false
		})
	}

	render() {
		return(
				<div className='ModalForm'>
					<h2>Add a Stock below, do i still need this?</h2>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Label>Ticker:</Label>
							<Input
								focus
								name='symbol'
								type='text'
								placeholder='ticker here...'
								value={this.state.symbol}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Name:</Label>
							<Input
								focus
								name='name'
								type='text'
								placeholder='name here...'
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Button type="submit">Create Stock</Button>
					</Form>
				</div>
		)
	}
}