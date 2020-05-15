import React, { Component } from 'react'
import StockList from '../StockList'
import StockShowPage from '../StockShowPage'

export default class StockContainer extends Component {
	constructor() {
		super()
		this.state = {
			stocks: [],
			mode: 'index',
			stocksToShowData: ''
		}
	}

	componentDidMount() {
		this.getStocks()
	}

	switchMode = (id) => {
		if(this.state.mode === 'index') {

			this.getStocksToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				stocksToShowData: ''
			})
		}
	}

	getStocksToShowInfo = async (id) => {

		try {

			const url = process.env.REACT_APP_API_URL + '/stocks/' + id

			const showStocksResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		
			const showStocksJson = await showStocksResponse.json()

			this.setState({
				stocksToShowData: showStocksJson.data
			})
		} catch (error) {
			console.error(error)
		}
	}

	getStocks = async () => {

		try {

			const url = process.env.REACT_APP_API_URL + '/stocks/all'

			const stocksResponse = await fetch(url, {
				credentials: 'include'
			})

			const stocksJson = await stocksResponse.json()

			if(stocksJson.status === 200) {
				this.setState({
					stocks: stocksJson.data
				})
			}
		} catch(error) {
			console.error(error)
		}
	}

	closeShowModal = () => {
		this.switchMode()
	}

	deleteStocks = async (deleteInfo) => {
		
		const url = process.env.REACT_APP_API_URL + '/stocks/' + deleteInfo.id

		try {
			
			const deleteStockResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteStockJson = await deleteStockResponse.json()

			if(deleteStockJson.status === 201) {
				this.setState({
					stocks: this.state.filter(stock => stock.id !== deleteStockJson.id)
				})
				this.closeShowModal()
				this.getStocks()
			}
		} catch(error) {
			console.error(error)
		}
	}

	updateStocks = (updateInfo) => {
		
		this.closeShowModal()
		
		const stocks = this.state.stocks
		const indexOfStockBeingEdited = stocks.findIndex(stock => stock.id === updateInfo.data.id)
		
		stocks[indexOfStockBeingEdited] = updateInfo.data
		
		this.setState({
			stocks: stocks
		})
	}

	render() {

		return (
			<>
				<StockList switchMode={this.switchMode} stocks={this.state.stocks} />
					{
						this.state.mode === 'show'
						&&
						<StockShowPage 
							closeShowModal={this.closeShowModal}
							stocksToShowData={this.state.stockToShowData}
							currentUser={this.props.currentUser}
							updateStocks={this.updateStocks}
							deleteStocks={this.deleteStocks}
						/>
					}
			</>
		)
	}

}