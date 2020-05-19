import React, { Component } from 'react'
import { Form, Button, Label, Modal, Input } from 'semantic-ui-react'


export default class EditStockModal extends Component {

	constructor() {
		super()

		this.state = {
			f_score: ''
		}
	}

	componentDidMount() {
		console.log(this.props)
		if(this.props.stockToShowData !== undefined) {
			
			this.setState({
				f_score: this.props.stockToShowData.f_score

			})
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		this.props.editStocks(this.state)
	}

	render() {
		return(
			<Modal trigger={<Button>Edit F-score</Button>}>
				<div className='ModalForm'>
					<h1>Edit the F-score</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Label>F-score:</Label>
							<Input
								focus
								name='f_score'
								type='number'
								placeholder='enter f-score here...'
								value={this.state.f_score}
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