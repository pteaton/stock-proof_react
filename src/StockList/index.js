import React from 'react'
import '../index.css'
import { Card, Button } from 'semantic-ui-react'

export default function StockList(props) {
	console.log("here is props, hi", props)

	const listedStocks = props.stocks.map(stock => {
		return (
			<Card key={stock.id}> 
				<Card.Content>
					<Card.Header 
						className='fake-link'
						onClick={() => props.switchMode(stock.id)}
					>
					</Card.Header>
					<Card.Meta>
						<p> Ticker:
							<strong> {stock["1. symbol"]} </strong> 
						</p>
					</Card.Meta>
					<Card.Meta>
						<p> Name:
							<strong> {stock["2. name"]} </strong> 
						</p>
					</Card.Meta>
						<Card.Description>
							<small>Region: {stock["4. region"]} </small> 
						</Card.Description>
				</Card.Content>
				<Button onClick={() => console.log(stock)} />
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