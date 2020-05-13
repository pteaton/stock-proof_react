import React, { Component } from 'react'
import { Form, Button, Label, Input} from 'semantic-ui-react'


export default class NewScreenForm extends Component {

	constructor() {
		super()

		this.state = {
			return_on_assets: '',
			cash_flow_from_operations: '',
			direction_of_return_of_assets: '',
			accrual_accounting_check: '',
			direction_of_leverage: '',
			direction_of_liquidity: '',
			issue_stock: '',
			direction_of_margin: '',
			direction_of_asset_turnover: ''
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
					<h2>Screen a Stock!</h2>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Label>Return on Assets:</Label>
							<Input
								focus
								name='return_on_assets'
								type='text'
								placeholder='Return on Assets'
								value={this.state.return_on_assets}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Cash Flow from Operations:</Label>
							<Input
								focus
								name='cash_flow_from_operations'
								type='integer'
								placeholder='Cash Flow from Operations'
								value={this.state.cash_flow_from_operations}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Change in Return of Assets:</Label>
							<Input
								focus
								name='direction_of_return_of_assets'
								type='integer'
								placeholder='Change in Return of Assets'
								value={this.state.direction_of_return_of_assets}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Accrual Accounting Check:</Label>
							<Input
								focus
								name='accrual_accounting_check'
								type='integer'
								placeholder='Accrual Accounting Check'
								value={this.state.accrual_accounting_check}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Direction of Leverage:</Label>
							<Input
								focus
								name='direction_of_leverage'
								type='integer'
								placeholder='Direction of Leverage'
								value={this.state.direction_of_leverage}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Direction of Liquidity:</Label>
							<Input
								focus
								name='direction_of_liquidity'
								type='integer'
								placeholder='Direction of Liquidity'
								value={this.state.direction_of_liquidity}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Change in Number of Shares:</Label>
							<Input
								focus
								name='issue_stock'
								type='integer'
								placeholder='Change in Number of Shares'
								value={this.state.issue_stock}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Change in Gross Margin:</Label>
							<Input
								focus
								name='direction_of_margin'
								type='integer'
								placeholder='Change in Gross Margin'
								value={this.state.direction_of_margin}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Change in Asset Turnover Ratio:</Label>
							<Input
								focus
								name='direction_of_asset_turnover'
								type='integer'
								placeholder='Change in Asset Turnover Ratio'
								value={this.state.direction_of_asset_turnover}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Button type="submit">Create Screen</Button>
					</Form>
				</div>
		)
	}
}