import React, { Component } from 'react'

export default class SearchContainer extends Component {

	constructor() {
		super()
		this.state = {
			bestMatches: [],
		}
	}

	componentDidMount() {
		this.fetchStock()
	}

	fetchStock = async () => {
		const API_KEY = 'EIRKD54AJXO1NRSD';
		let searchKey = 'sony';
		let API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKey}&apikey=${API_KEY}`
		console.log(API_KEY, "API KEY, WHERE ARE YOU!?")
		
		try {


			const foundStocks =  await fetch(API_Call)
			const foundStocksJson = await foundStocks.json()

			console.log("This is the foundStocks, bruh")
			console.log(foundStocksJson.bestMatches)

			console.log(foundStocksJson.bestMatches[0]["1. symbol"])
			console.log(foundStocksJson.bestMatches[0]["2. name"])

			this.setState({
				bestMatches: foundStocksJson.bestMatches
			})
		} 

		catch(err) {
			console.log(err)
		}
	}
	// best matches w/ map to pull specific stock from stock api

	// stockData = this.state.bestMatches.map((stock) => {
	// 	console.log(stockData)

	// 	return (
	// 		<div>
	// 			<p>{stock.name} </p>
	// 			<p> {stock.symbol} </p>
	// 		</div>
	// 	)
	// })


	render() {

		return (
					<h1> Stock Data? </h1>
		)
	}
}