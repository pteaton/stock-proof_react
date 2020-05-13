import React, { Component } from 'react'
import UserList from '../UserList'
import UserShowPage from '../UserShowPage'
import '../index.css'

export default class UserContainer extends Component {
	constructor() {
		super()

		this.state = {
			users: [],
			allStocksByUsers: [],
			mode: 'index',
			userToShowData: '',
			userToShowStocks: '',
			// userToShowScreens: ''
		}
	}

	componentDidMount() {
		this.getUsers()
	}

	switchMode = (id) => {
		
		if(this.state.mode === 'index') {

			this.getUserToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				userToShowData: '',
				userToShowStocks: ''
				// userToShowScreens: ''
			})
		}
	}

	getUserToShowInfo = async (id) => {
		
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + id

			const showUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const showUserJson = await showUserResponse.json()

			const users = await this.state.users

			const index = await users.findIndex(user => user.id === id)

			await this.setState({
				userToShowData: showUserJson.data,
				userToShowStocks: this.state.allStocksByUsers[index]
			})
			
		} catch (error) {
			console.error(error)
		}
	}


	getAllStocksByUsers = async (id) => {
		try {

			const url = process.env.REACT_APP_API_URL + '/users/' + id

			const showUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const showUserJson = await showUserResponse.json()

			let allStocksByUsers = await this.state.allStocksByUsers
			await allStocksByUsers.push(showUserJson.stocks)
			await this.setState({
				allStocksByUsers: allStocksByUsers
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	closeShowModal = () => {
		this.switchMode()
	}

	getUsers = async () => {
		try {

			const url = process.env.REACT_APP_API_URL + '/users/all'

			const usersResponse = await fetch(url, {
				credentials: 'include'
			})

			const usersJson = await usersResponse.json()

			if(usersJson.status === 200) {
				this.setState({
					users: usersJson.data
				})
			}

			for(let i = 0; i < this.state.users.length; i++){
				await this.getAllStocksByUsers(this.state.users[i].id)
			}

		} catch (error) {

			console.error(error)
	 
	 	}
	}

	deleteUser = async (deleteInfo) => {

		const url = process.env.REACT_APP_API_URL + '/users/' + deleteInfo.id
		// console.log(url);
		try {
			
			const deleteUserResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteUserJson = await deleteUserResponse.json()

			if(deleteUserJson.status === 200) {
				this.setState({
					users: this.state.users.filter(user => user.id !== deleteUserJson.id) 
				})
				this.props.logout()
				this.closeShowModal()
				this.getUsers()
			}

		} catch (error) {

			console.error(error)

		}
	}

	updateUser = (updateInfo) => {

		this.closeShowModal()

		const users = this.state.users
		const indexOfUserBeingEdited = users.findIndex(user => user.id === updateInfo.data.id)

		users[indexOfUserBeingEdited] = updateInfo.data

		this.setState({
			users: users
		})
	}

	render() {

		return (
			<React.Fragment>
				<h3> Our Traders </h3>
				<UserList switchMode={this.switchMode} users={this.state.users}/>
				{
					this.state.mode === 'show'
					&&
					<UserShowPage 
						closeShowModal={this.closeShowModal} 
						userToShowData={this.state.userToShowData}
						userToShowStocks={this.state.userToShowStocks}
						currentUser={this.props.currentUser}
						updateUser={this.updateUser}
						deleteUser={this.deleteUser}
					/>
				}
			</React.Fragment>
		)
	}

}