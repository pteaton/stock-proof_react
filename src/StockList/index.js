import React from 'react'
import '../index.css'
import { Card } from 'semantic-ui-react'

export default function StockList(props) {

	const listedStocks = props.stocks.map(stock => {
		return (
			<Card key={stock.id}> 
				<Card.Content>
					<Card.Header 
						className='fake-link'
						onClick={() => props.switchMode(stock.id)}
					>
						{stock.symbol}
						{stock.name}
					</Card.Header>
					<Card.Meta>
						<h1>Stock Data here: </h1>
					</Card.Meta>
					<Card.Description>
						<strong>By:</strong> {stock.user.username.toUpperCase()} 
						<small>Date Added: </small> {stock.date_added}
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<React.Fragment>
			<h3> Stocks </h3>
			<Card.Group centered={true}> 
				{listedStocks} 
			</Card.Group>
		</React.Fragment>
	)
}