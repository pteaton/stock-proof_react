import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'

export default class SearchContainer extends Component {

	constructor() {
		super()
		this.state = {
			bestMatches: [],
			stockSearch: ''
		}
	}

	// componentDidMount() {
	// 	this.fetchStock()
	// }

	fetchStocks = async (searchKey) => {
		const API_KEY = 'EIRKD54AJXO1NRSD';
		// let searchKey = this.state.stockSearch;
		let API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKey}&apikey=${API_KEY}`
		console.log(API_Call, "Calling API URL")
		
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


	handleChange = (event) => {
		console.log("this is the event", event.target.value)
		console.log("this is state", this.state)
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log("here we are searching the database yup")
		console.log(this.state)
		this.fetchStocks(this.state.stockSearch)
	}


	render() {

		return (

				<React.Fragment>
					<h1> Stock Data </h1>
					<Form onSubmit={this.handleSubmit}>
						<Label>Search bar</Label>
						<Form.Input
							name='stockSearch'
							type='text'
							value={this.state.stockSearch}
							placeholder='Type company name or stock symbol here...'
							onChange={this.handleChange}
						/>
					</Form>
					<Button type='submit' onClick={this.handleSubmit} value='Submit'>Search</Button>
				</React.Fragment>
		)
	}
}