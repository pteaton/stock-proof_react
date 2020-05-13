import React from 'react'
import '../index.css'
import { Card, Image } from 'semantic-ui-react'

export default function StockList(props) {

	const listedStocks = props.stocks.map(stock => {
		return (
			<Card key={stock.id}> 
				<Card.Content>
					<Card.Header 
						className='fake-link'
						onClick={() => props.switchMode(stock.id)}
					>
						{stock.company_name} 
					</Card.Header>
					<Card.Meta>
						{stock.stock_open} 
						{stock.stock_high}
						{stock.stock_low}
						{stock.previous_close}
						{stock.stock_volume}
					</Card.Meta>
					<Card.Description>
						<strong>By:</strong> {stock.poster.username.toUpperCase()} 
						<strong>Date Posted: </strong> {stock.date_posted}
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