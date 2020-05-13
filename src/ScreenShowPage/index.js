import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
// will need to import editscreenmodal here
import '../index.css'

export default class ScreenShowPage extends Component {
	constructor() {
		super()
		this.state = {
		
		}
	}

	componentDidMount() {

	}

	editScreen = async (editInfo) => {

		try {

			const url = process.env.REACT_APP_API_URL + '/screens/' + this.props.screenToShowData.id

			const editScreenResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editScreenJson = await editScreenResponse.json()


			if(editScreenJson.status === 201) {
				this.props.updateScreen(editScreenJson)
			}
	
		} catch (error) {

			console.error(error)

		}
	}

	render() {
		const dateMade = new Date(this.props.screenToShowData.date_posted)

		return (
			<>
				{
					this.props.screenToShowData.poster !== undefined
					&&
					<Modal open={true} closeIcon onClose={this.props.closeShowModal}>
						<div className='insideModalInfo'>
							<h3>Screened by:{this.props.screenToShowData.poster.username}</h3>
							<p><strong>Return on Assets:</strong> {this.props.screenToShowData.return_on_assets}</p>
							<p><strong>Cash Flow from Operations:</strong> {this.props.screenToShowData.cash_flow_from_operations}</p>
							<p><strong>Change in Return of Assets:</strong> {this.props.screenToShowData.direction_of_return_of_assets}</p>
							<p><strong>Accrual Accounting Check:</strong> {this.props.screenToShowData.accrual_accounting_check}</p>
							<p><strong>Direction of Leverage:</strong> {this.props.screenToShowData.direction_of_leverage}</p>
							<p><strong>Direction of Liquidity:</strong> {this.props.screenToShowData.direction_of_liquidity}</p>
							<p><strong>Change in Number of Shares:</strong> {this.props.screenToShowData.issue_stock}</p>
							<p><strong>Change in Gross Margin:</strong> {this.props.screenToShowData.direction_of_margin}</p>
							<p><strong>Change in Asset Turnover Ratio:</strong> {this.props.screenToShowData.direction_of_asset_turnover}</p>
							{
								this.props.screenToShowData.date_posted
								&&
								<p><strong>Screening Date:</strong> {dateMade.toLocaleDateString()}</p>
							}
							<div className="authControls">
							{
								this.props.currentUser.id === this.props.screenToShowData.poster.id
								&&
								<React.Fragment>
									<EditScreenModal 
										screenToShowData={this.props.screenToShowData}
										editScreen={this.editscreen}
									/>
									<Button 
										onClick={() => this.props.deleteScreen(this.props.screenToShowData)}
										color='red'
									>
										Delete Screening
									</Button>
								</React.Fragment>
							}
							</div>
						</div>
					</Modal>
				}	
			</>
		)
	}
}