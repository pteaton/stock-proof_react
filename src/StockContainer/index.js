import React, { Component } from 'react'
// import { Chart } from 'react-charts'
import Plot from 'react-plotly.js';
import StockList from '../StockList'
import StockShowPage from '../StockShowPage'

export default class StockContainer extends Component {
	constructor() {
		super()
		this.state = {
			stockChartXValues: [],
			stockChartYValues: [],
			stocks: [],
			mode: 'index',
			stocksToShowData: ''
		}
	}

	componentDidMount() {
		this.fetchStock();
		this.getStocks()
	}
	// stock api graph display
	fetchStock() {
		const pointerToThis = this;
		console.log(pointerToThis)
		const API_KEY = 'EIRKD54AJXO1NRSD';
		let StockSymbol = 'GOOG'
		let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`
		let stockChartXValuesFunction = [];
		let stockChartYValuesFunction = [];

		fetch(API_Call)
			.then(
				function(response) {
					const responseJson = response.json()
					console.log(responseJson)
					return responseJson
				}
			)
			.then(
				function(data) {
					console.log(data);

					for (let key in data['Time Series (5min)']) {
						stockChartXValuesFunction.push(key)
						stockChartYValuesFunction.push(data['Time Series (5min)']
						[key]['1. open']);
					}

					// console.log(stockChartXValuesFunction)
					pointerToThis.setState({
						stockChartXValues: stockChartXValuesFunction,
						stockChartYValues: stockChartYValuesFunction
					})
				}
			)
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
      			<Plot
        			data={[
          			  {
            			x: this.state.stockChartXValues,
            			y: this.state.stockChartYValues,
            			type: 'scatter',
            			mode: 'lines+markers',
            			marker: {color: 'red'},
          			  }
        			]}
        			layout={{width: 720, height: 440, title: 'StockSymbol'}}
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
			</>
		)
	}

}