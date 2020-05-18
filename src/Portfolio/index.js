import React from 'react'
import { Card, Button } from 'semantic-ui-react'

export default function Portfolio(props) {
	console.log(props.currentUser)
	console.log(props.userStocks)
	const currentStocks = props.userStocks.map(stock => {
		return (
			<Card key={stock.id}>
				<Card.Content>
					<Card.Header>
						{stock.name}
					</Card.Header>
					<Card.Meta>
						{stock.symbol}
					</Card.Meta>
					<Button onClick={() => console.log(stock.symbol)}>Show Graph</Button>
				</Card.Content>
			</Card>
		)
	})

	return (
		<React.Fragment>
			<Card.Group>
				{currentStocks}
			</Card.Group>
		</React.Fragment>
	)
}