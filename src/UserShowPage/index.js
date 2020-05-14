import React, { Component } from 'react'
import { Modal, Button, Card } from 'semantic-ui-react'
import EditUserModal from '../EditUserModal'


export default class UserShowPage extends Component {
	
	constructor() {
		
		super()
		
		this.sate = {

		}
	}

	editUser = async (editInfo) => {
		
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + this.props.currentUser.id

			const editUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editUserJson = await editUserResponse.json()

			if(editUserJson.status === 201) {
				this.props.updateUser(editUserJson)
			}

		} catch(error) {
			console.error(error)
		}
	}

	render() {

		let userStockCard;

		if(this.props.userToShowStocks) {
			userStockCard = this.props.userToShowStocks.map(stock => {
				return (
					<Card key={stock.id}> 
						<Card.Content>
							<Card.Header>
								{stock.company_name} 
							</Card.Header>
							<Card.Meta>
								<strong>Open:</strong> {stock.stock_open}
								<strong>High:</strong> {stock.stock_high}
								<strong>Low:</strong> {stock.stock_low}
								<strong>Previous Close:</strong> {stock.previous_close}
								<strong>Volume:</strong> {stock.stock_volume}
							</Card.Meta>
						</Card.Content>
					</Card>
				)
			})
		}
		
		let userScreenCard;

		if(this.props.userToShowScreens) {
			userScreenCard = this.props.userToShowScreens.map(screen => {
				return (
					<Card key={screen.id}> 
						<Card.Content>
							<Card.Header>
								{screen.poster.username.id} 
							</Card.Header>
							<Card.Meta>
								<strong>Return on Assets:</strong> {screen.return_on_assets}
								<strong>Cash Flow from Operations:</strong> {screen.cash_flow_from_operations}
								<strong>Change in Return of Assets:</strong> {screen.direction_of_return_of_assets}
								<strong>Accrual Accounting Check:</strong> {screen.accrual_accounting_check}
								<strong>Direction of Leverage:</strong> {screen.direction_of_leverage}
								<strong>Direction of Liquidity:</strong> {screen.direction_of_liquidity}
								<strong>Change in Number of Shares:</strong> {screen.issue_stock}
								<strong>Change in Gross Margin:</strong> {screen.direction_of_margin}
								<strong>Change in Asset Turnover Ratio:</strong> {screen.direction_of_asset_turnover}
							</Card.Meta>
						</Card.Content>
					</Card>
				)
			})
		}

		return (
			this.props.userToShowScreens !== [],
			this.props.userToShowStocks !== []
			&&
			<Modal closeIcon onClose={this.props.closeShowModal} open={true}>
				<div className="insideModalInfo">
					<h3>{this.props.userToShowData.username}</h3>
					{
						this.props.userToShowData.bio !== ""
						&&
						<p><strong>About:</strong> {this.props.userToShowData.bio}</p>
					}
					{
						this.props.userToShowStocks.length !== 0
						?
						<React.Fragment>
							<p><strong>Uploaded Stocks</strong></p>
							<Card.Group centered={true}> {userStockCard} </Card.Group>
						</React.Fragment>
						:
						<p><i>No stock uploaded yet</i></p>
					}
					{
						this.props.userToShowScreens.length !== 0
						?
						<React.Fragment>
							<p><strong>Created Screens</strong></p>
							<Card.Group centered={true}> {userScreenCard} </Card.Group>
						</React.Fragment>
						:
						<p><i>No screenings yet</i></p>
					}

					<div className='authControls'>
					{
						this.props.currentUser.id === this.props.userToShowData.id
						&&
						<React.Fragment>
							<EditUserModal 
								userToShowData={this.props.userToShowData} 
								editUser={this.editUser}
							/>
							<Button color='red' onClick={() => this.props.deleteUser(this.props.userToShowData)}>Delete Profile</Button>
						</React.Fragment>
					}
					</div>
				</div>
			</Modal>
		)
	
	}





}