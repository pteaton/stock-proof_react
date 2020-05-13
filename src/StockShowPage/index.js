import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import EditStockModal from '../EditStockModal'
import moment from 'moment'
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
		const dateMade = new Date(this.props.stockToShowData.date_posted)

		return (
			<>
				{
					this.props.stockToShowData.poster !== undefined
					&&
					<Modal open={true} closeIcon onClose={this.props.closeShowModal}>
						<div className='insideModalInfo'>
							<h3>{this.props.stockToShowData.title}</h3>
							<p><small><strong>By:</strong> {this.props.stockToShowData.poster.username}</small></p>
							<p><strong>Company:</strong> {this.props.stockToShowData.company_name}</p>
							<p><strong>Open:</strong> {this.props.stockToShowData.stock_open}</p>
							<p><strong>High:</strong> {this.props.stockToShowData.stock_high}</p>
							<p><strong>Low:</strong> {this.props.stockToShowData.stock_low}</p>
							<p><strong>Previous Close:</strong> {this.props.stockToShowData.previous_close}</p>
							<p><strong>Volume:</strong> {this.props.stockToShowData.stock_volume}</p>
							{
								this.props.stockToShowData.date_posted
								&&
								<p><strong>Date Made:</strong> {dateMade.toLocaleDateString()}</p>
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