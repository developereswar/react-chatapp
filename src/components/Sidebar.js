import React from 'react';
import io from "socket.io-client";

class Sidebar extends React.Component {
	state = {
		UsersList:[]
	}


	componentDidMount(){
		this.socket = io('http://localhost:8080');
		this.socket.on("GroupMessage",(msgList,name,list)=>{
			this.viewUsers(list)
		});
	}

	viewUsers = (list)=>{
		var {UsersList} = this.state;
		console.log("list",...list)
		UsersList = [...list];
		this.setState({UsersList})
	}

	render(){
		const {UsersList} = this.state;
		return(
			<div className="Sidebar_wrapper">
			<ul className="sidebarui">
				{ (UsersList.length != 0) ? 
									UsersList.map((e,i)=>{
										return(
												<li key={i}>
													{e ? e : null}
												</li>
											)
									})
								:null}
			</ul>
			</div>
			)

	}
}

export default Sidebar;