import React from 'react'
import { Card } from 'semantic-ui-react'
import '../index.css'

export default function UserList(props) {
	const style = ""
	console.log(style)
	const usersListed = props.users.map(user => {
		return (	
			<Card 
				key={user.id}
				className='card'
			> 
				<Card.Content>
					<Card.Header 
						className='fake-link' 
						onClick={() => props.switchMode(user.id)}
					>
						{user.username}
					</Card.Header>
					<Card.Description>
						<i>{user.poster}</i>
						<i>{user.stocks}</i>
						<i>{user.screens}</i>
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<div>
			<Card.Group centered={true}> 
				{usersListed} 
			</Card.Group>
		</div>
	)
}