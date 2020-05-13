import React, { Component } from 'react'


export default class ScreenContainer extends Component {
	constructor() {
		super()
		this.state = {
			stocks: [],
			mode: 'index',
			screensToShowData: ''
		}
	}

	componentDidMount() {
		this.getScreens()
	}

	switchMode = (id) => {
		if(this.state.mode === 'index') {

			this.getScreensToShowInfo(id)

			this.setState({
				mode: 'show'
			})
		} else {
			this.setState({
				mode: 'index',
				screensToShowData: ''
			})
		}
	}

	getScreensToShowInfo = async (id) => {

		try {

			const url = process.env.REACT_APP_API_URL + '/screens/' + id

			const showScreensResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		
			const showScreensJson = await showScreensResponse.json()

			this.setState({
				screensToShowData: showScreensJson.data
			})
		} catch (error) {
			console.error(error)
		}
	}


	getScreens = async () => {

		try {

			const url = process.env.REACT_APP_API_URL + '/screens/all'

			const screensResponse = await fetch(url, {
				credentials: 'include'
			})

			const screensJson = await screensResponse.json()

			if(screensJson.status === 200) {
				this.setState({
					stocks: screensJson.data
				})
			}
		} catch(error) {
			console.error(error)
		}
	}

	closeShowModal = () => {
		this.switchMode()
	}

	deleteScreens = async (deleteInfo) => {
		
		const url = process.env.REACT_APP_API_URL + '/screens/' + deleteInfo.id

		try {
			
			const deleteScreenResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteScreenJson = await deleteScreenResponse.json()

			if(deleteScreenJson.status === 201) {
				this.setState({
					screens: this.state.filter(screen => screen.id !== deleteScreenJson.id)
				})
				this.closeShowModal()
				this.getScreens()
			}
		} catch(error) {
			console.error(error)
		}
	}

	updateScreens = (updateInfo) => {
		
		this.closeShowModal()
		
		const screens = this.state.screens
		const indexOfScreenBeingEdited = screens.findIndex(screen => screen.id === updateInfo.data.id)
		
		screens[indexOfScreenBeingEdited] = updateInfo.data
		
		this.setState({
			screens: screens
		})
	}

	render() {

		return (
					<ScreenList switchMode={this.switchMode} screens={this.state.screens} />
					{
						this.state.mode === 'show'
						&&
						<ScreenShowPage 
							closeShowModal={this.closeShowModal}
							screensToShowData={this.state.screenToShowData}
							currentUser={this.props.currentUser}
							updateScreens={this.updateScreens}
							deleteScreens={this.deleteScreens}
						/>
					}
		)
	}
}