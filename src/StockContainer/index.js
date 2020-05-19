import React, { Component } from 'react'
import StockList from '../StockList'
import StockShowPage from '../StockShowPage'
import SearchContainer from '../SearchContainer'

export default class StockContainer extends Component {
	constructor() {
		super()
		this.state = {
			stocks: [],
			mode: 'index',
			stocksToShowData: ''
		}
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

	// create function to call in stock list form to add stock to database
	addStocks = async (stock) => {
		try {
			const newSymbol = stock["1. symbol"]

			console.log(newSymbol)
			const newName = stock["2. name"]
			console.log(newName)

			let stockObj = {
				symbol: newSymbol,
				name: newName
			}
			console.log(stockObj)

			const url = process.env.REACT_APP_API_URL + '/stocks/add'

			const addStocksResponse = await fetch(url , {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(stockObj),
				headers: {
					'Content-Type': 'application/json'
				},
			})

			const addStocksJson = await addStocksResponse.json()

			this.setState({
				addStocks: addStocksJson.data
			})

		} catch(error) {
			console.error(error)
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
	// http://localhost:8000/api/v1/stocks/mystocks
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

	// deleteStocks = async (deleteId) => {
		
	// 	const url = process.env.REACT_APP_API_URL + '/stocks/' + deleteId

	// 	try {
			
	// 		const deleteStockResponse = await fetch(url, {
	// 			credentials: 'include',
	// 			method: 'DELETE'
	// 		})

	// 		const deleteStockJson = await deleteStockResponse.json()

	// 		if(deleteStockJson.status === 201) {
	// 			this.setState({
	// 				stocks: this.state.filter(stock => stock.id !== deleteStockJson.id)
	// 			})
	// 			this.closeShowModal()
	// 			this.getStocks()
	// 		}
	// 	} catch(error) {
	// 		console.error(error)
	// 	}
	// }

	// updateStocks = (updateInfo) => {
		
	// 	this.closeShowModal()
		
	// 	const stocks = this.state.stocks
	// 	const indexOfStockBeingEdited = stocks.findIndex(stock => stock.id === updateInfo.data.id)
		
	// 	stocks[indexOfStockBeingEdited] = updateInfo.data
		
	// 	this.setState({
	// 		stocks: stocks
	// 	})
	// }


	// editStocks = async (editedStock) => {
		
	// }

	render() {

		return (
			<React.Fragment>
				<SearchContainer 
					addStocks={this.addStocks}
				/>
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
			</React.Fragment>
		)
	}

}