import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import StockGraphDisplay from '../StockGraphDisplay'

export default class Portfolio extends Component {
	constructor(props) {
		super(props)

		this.state = {
			idOfGraphToView: -1,
			stockSymbolToView: ''
		}
	}

	handleClick = (stock) => {
		this.setState({
			idOfGraphToView: stock.id,
			stockSymbolToView: stock.symbol
		})
	}

	closeModal=() => {
		this.setState({
			idOfGraphToView: -1
		})
	}

	currentStocks = this.props.userStocks.map(stock => {
		return (
			<Card key={stock.id}>
				<Card.Content>
					<Card.Header>
						{stock.name}
					</Card.Header>
					<Card.Meta>
						{stock.symbol}
					</Card.Meta>
					<Button onClick={() => this.handleClick(stock)}>Show Graph</Button>

				</Card.Content>
			</Card>
		)
	})

	render() {
		return (
			<React.Fragment>
				{
					this.state.idOfGraphToView > -1
					&&

					<StockGraphDisplay
						closeModal={this.closeModal}
						stockSymbolToView={this.state.stockSymbolToView} 
						idOfStockToDelete={this.state.idOfGraphToView} 
						deleteStocks={this.props.deleteStocks}
					/>
				}
				<Card.Group>
					{this.currentStocks}
				</Card.Group>
			</React.Fragment>
		)
	}
}