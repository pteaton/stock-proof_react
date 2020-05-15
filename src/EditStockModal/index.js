import React, { Component } from 'react'
import { Form, Button, Label, Modal, Input } from 'semantic-ui-react'


export default class EditStockModal extends Component {

	constructor() {
		super()

		this.state = {
			symbol: '',
			name: ''
		}
	}

	componentDidMount() {
		console.log(this.props)
		//{
			this.props.stockToShowData !== ""
			&&
			this.setState({
				symbol: this.props.stockToShowData.symbol,
				name: this.props.stockToShowData.name,

			})
		//}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		this.props.editStock(this.state)
	}

	render() {
		return(
			<Modal trigger={<Button>Edit Stock</Button>}>
				<div className='ModalForm'>
					<h1>Edit this Stock!</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Label>Symbol:</Label>
							<Input
								focus
								name='symbol'
								type='test'
								placeholder='symbol here...'
								value={this.state.symbol}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Ticker:</Label>
							<Input
								focus
								name='name'
								type='text'
								placeholder='ticker here...'
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Button type="submit">Apply Changes</Button>
					</Form>
				</div>
			</Modal>
		)
	}

}