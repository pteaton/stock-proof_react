import React, { Component } from 'react'
import NewStockForm from '../NewStockForm'
import { Modal } from 'semantic-ui-react'
import '../index.css'

export default class Header extends Component {
	constructor() {
		super()

		this.state = {
			showModal: false
		}
	}

	showModal = () => {
		if(this.state.showModal){
			this.setState({
				showModal: false
			})
		} else {
			this.setState({
				showModal: true
			})
		}
	}

	render() {
		
		return (
			<div className='Header-nav'>
				<React.Fragment>
				{
		
					<div className='Logo'>
						<img 
							className='fake-link'
							height="100"
							onClick={this.props.goHome}
							src='https://i.imgur.com/G5bHYVn.png'
						/>
					</div>
		
				}
					<div className="Nav">
						
						<span className='fake-link' onClick={this.props.goHome}>Home</span>
						
						|-----|
						<span className='fake-link' onClick={this.props.switchMode}>User</span>
						
						|-----|
						<span className='fake-link' onClick={this.props.switchMode}>Stocks</span>

						{
							this.props.loggedIn
							?
							<React.Fragment>
								<div>
									<span className='fake-link' onClick={this.showModal}>Add Stock</span>
									{
										this.state.showModal
										&&
										<Modal 
											open={true}
											closeIcon
											onSubmit={this.showModal}
											onClose={this.showModal}
										> 
											<NewStockForm addStock={this.props.addStock}/> 
										</Modal>
									}
									|
									<span className='fake-link' onClick={this.props.logout}>Logout</span>
								</div>
							</React.Fragment>
							:
							<React.Fragment>
								
								<span className='fake-link' onClick={this.props.switchMode}>Log In |-----| Register</span>
							</React.Fragment>
						}
					</div>
				</React.Fragment>
			</div>
		)		
	}
}