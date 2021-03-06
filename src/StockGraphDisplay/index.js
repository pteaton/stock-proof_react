import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { Modal, Button}  from 'semantic-ui-react'
import EditStockModal from '../EditStockModal'

export default class StockGraphDisplay extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stockChartXValues: [],
			stockChartYValues: [],
			stocks: [],
			stocksToShowData: ''
		}
	}

	componentDidMount() {
		this.fetchGraph();
	}

	fetchGraph() {
		const pointerToThis = this;
		console.log(pointerToThis)
		const API_KEY = 'EIRKD54AJXO1NRSD';
		let StockSymbol = this.props.stockSymbolToView;
		let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`
		let stockChartXValuesFunction = [];
		let stockChartYValuesFunction = [];

		fetch(API_Call)
			.then(
				function(response) {
					return response.json()
				}
			)
			.then(
				function(data) {
					console.log(data);

					for(let key in data['Time Series (5min)']) {
						stockChartXValuesFunction.push(key)
						stockChartYValuesFunction.push(data['Time Series (5min)']
						[key]['1. open'])
						// adding other data to key
					}

					// console.log(stockChartXValuesFunction)

					pointerToThis.setState({
						stockChartXValues: stockChartXValuesFunction,
						stockChartYValues: stockChartYValuesFunction
					})
				}
			)
	}

	editStocks = async (editedStockInfo) => {
		
		const url = process.env.REACT_APP_API_URL + "/stocks/" + this.props.idOfStockToDelete

		try {
			const editStockResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(editedStockInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const editStockJson = await editStockResponse.json()
			console.log("editStockJson", editStockJson)

			if(editStockResponse.status == 200) {
				this.props.updateStocks(editStockJson)

			}
		} catch(error) {
			console.log(error)
		}		
	}

	render() {

		console.log(this.state, "This right here, this that State")
		console.log(this.props, "this is props man")

		return (
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Plot
        			data={[
          			  {
            			x: this.state.stockChartXValues,
            			y: this.state.stockChartYValues,
            			type: 'scatter',
            			mode: 'lines+markers',
            			marker: {color: 'red'},
          			  },
        			]}
        			layout={{width: 720, height: 440, title: 'Your Stock Data'}}
      			/>
      			<Button onClick={this.props.closeModal}>Close</Button>
      			<Button onClick={() => this.props.deleteStocks(this.props.idOfStockToDelete)}>Delete</Button>
      			<EditStockModal 
      				editStocks={this.editStocks}
      			/>
			</Modal>

		)
	}

}