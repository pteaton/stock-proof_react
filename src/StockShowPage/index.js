import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
// import { Chart } from 'react-charts'
import EditStockModal from '../EditStockModal'
import '../index.css'


export default class StockShowPage extends Component {
	constructor() {
		super()
		this.state = {
		
		}
	}

	componentDidMount() {

	}

	editStock = async (editInfo) => {

		try {

			const url = process.env.REACT_APP_API_URL + '/stocks/' + this.props.stockToShowData.id

			const editStockResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editStockJson = await editStockResponse.json()


			if(editStockJson.status === 201) {
				this.props.updateStock(editStockJson)
			}
	
		} catch (error) {

			console.error(error)

		}
	}

	render() {
		const dateMade = new Date(this.props.stockToShowData.date_added)

		return (
			<>
				{
					this.props.stockToShowData.poster !== undefined
					&&
					<Modal open={true} closeIcon onClose={this.props.closeShowModal}>
						<div className='insideModalInfo'>
							<p><strong>Symbol:</strong> {this.props.stockToShowData.symbol}</p>
							<p><strong>Name:</strong> {this.props.stockToShowData.name}</p>
							<p><strong>User:</strong> {this.props.stockToShowData.user.username}</p>
							{
								this.props.stockToShowData.date_posted
								&&
								<p><strong>Date Added:</strong> {dateMade.toLocaleDateString()}</p>
							}
							<div className="authControls">
							{
								this.props.currentUser.id === this.props.stockToShowData.poster.id
								&&
								<React.Fragment>
									<EditStockModal 
										stockToShowData={this.props.stockToShowData}
										editStock={this.editStock}
									/>
									<Button 
										onClick={() => this.props.deleteStock(this.props.stockToShowData)}
										color='red'
									>
										Delete Stock
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