import React from 'react'
import '../index.css'
import { Card } from 'semantic-ui-react'

export default function ScreenList(props) {

	const listedScreens = props.screens.map(screen => {
		return (
			<Card key={screen.id}> 
				<Card.Content>
					<Card.Header 
						className='fake-link'
						onClick={() => props.switchMode(screen.id)}
					>
						{screen.poster.username.toUpperCase()} 
					</Card.Header>
					<Card.Meta>
						{screen.return_on_assets} 
						{screen.cash_flow_from_operations}
						{screen.direction_of_return_of_assets}
						{screen.accrual_accounting_check}
						{screen.direction_of_leverage}
						{screen.direction_of_liquidity}
						{screen.issue_stock}
						{screen.direction_of_margin}
						{screen.direction_of_asset_turnover}
					</Card.Meta>
					<Card.Description>
						<small>Date Posted: </small> {screen.date_posted}
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<React.Fragment>
			<h3> Screens </h3>
			<Card.Group centered={true}> 
				{listedScreens} 
			</Card.Group>
		</React.Fragment>
	)
}