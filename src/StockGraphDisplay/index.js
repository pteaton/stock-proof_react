import React from 'react'
import Plot from 'react-plotly.js'

export default class StockGraphDisplay extends Component {
	constructor() {
		super()
		this.state = {
			stockChartXValues: [],
			stockChartYValues: [],
			stocks: [],
			stocksToShowData: ''
		}
	}

	componentDidMount() {
		this.fetchStock();
	}

	fetchStock() {
		const pointerToThis = this;
		console.log(pointerToThis)
		const API_KEY = 'EIRKD54AJXO1NRSD';
		// variable? const stockDisplay = this.props.stocks to change from hardcode
		let StockSymbol = 'AMZN'
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
						[key]['1. open']['2. high']['3. low']['5. volume'])
						// adding other data to key?
					}

					// console.log(stockChartXValuesFunction)

					pointerToThis.setState({
						stockChartXValues: stockChartXValuesFunction,
						stockChartYValues: stockChartYValuesFunction
					})
				}
			)
	}

	render() {
		return (
			<React.Fragment>
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
			</React.Fragment>

		)
	}

}