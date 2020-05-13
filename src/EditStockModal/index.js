import React, { Component } from 'react'
import { Form, Button, Label, Modal, Input } from 'semantic-ui-react'


export default class EditStockModal extends Component {

	constructor() {
		super()

		this.state = {
			company_name: '',
			stock_open: '',
			stock_high: '',
			stock_low: '',
			previous_close: '',
			date_posted: ''
		}
	}

	componentDidMount() {
		console.log(this.props)
		{
			this.props.stockToShowData !== ""
			&&
			this.setState({
				company_name: this.props.stockToShowData.company_name,
				stock_open: this.props.stockToShowData.stock_open,
				stock_high: this.props.stockToShowData.stock_high,
				stock_low: this.props.stockToShowData.stock_low,
				previous_close: this.props.stockToShowData.previous_close,
				stock_volume: this.props.stockToShowData.stock_volume,
				date_posted: this.props.stockToShowData.date_posted

			})
		}
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
							<Label>Company</Label>
							<Input
								focus
								name='company_name'
								type='text'
								placeholder='Company'
								value={this.state.company_name}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Open</Label>
							<Input
								focus
								name='stock_open'
								type='integer'
								placeholder='Open'
								value={this.state.stock_open}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>High</Label>
							<Input
								focus
								name='stock_high'
								type='integer'
								placeholder='High'
								value={this.state.stock_high}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Low</Label>
							<Input
								focus
								name='stock_low'
								type='integer'
								placeholder='Low'
								value={this.state.stock_low}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Previous Close</Label>
							<Input
								focus
								name='previous_close'
								type='integer'
								placeholder='Previous Close'
								value={this.state.previous_close}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Volume</Label>
							<Input
								focus
								name='stock_volume'
								type='integer'
								placeholder='Volume'
								value={this.state.stock_volume}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Date Posted</Label>
							<Input
								focus
								name='date_posted'
								type='integer'
								placeholder='Date Posted'
								value={this.state.date_posted}
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