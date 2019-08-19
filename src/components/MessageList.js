import React from 'react';
import io from "socket.io-client";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class MessageList extends React.Component {
	
		state = {
			Message:"",
			users:[],
			MessageList:[],
			username:null,
			toggle:false
		}
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.check();
		let currentUser = localStorage.getItem("CurrentUser");
		this.socket = io('http://localhost:8080')
		this.setState({username:currentUser})
		this.socket.emit("username", currentUser)
		this.socket.on("GroupMessage",(msgList,name,l)=>{
				console.log(l)
				let msg = {	
					"recieve": ((currentUser !== name)? true: false),
					"text": msgList
				}
				this.setState({
					MessageList: [...this.state.MessageList, msg ]
				});
			
		});
		this.socket.on('username', (name)=>{
			this.setState({
				users:[...name]
			})
		});
	}

	SendMsg = () =>{
		var { Message, username} = this.state;
		this.socket.emit("GroupMessage", Message, username)
		Message =""
		this.setState({ Message})
	}

	Toggle = ()=>{
		 localStorage.setItem("CurrentUser", this.state.username);
		 this.setState({toggle:false});
	}

	Handler=(e)=>{
		this.setState({username:e.target.value})
		}

		check = ()=>{
		let user = localStorage.getItem("CurrentUser");
		console.log(user)
		if(user && user !== "null"){
			this.setState({toggle:false})
		}else{
			this.setState({toggle:true})
		}
	}
	render() {
		
		const { MessageList, username, toggle } = this.state;
		return (
				<div className="MessageList_wrapper">
				<Modal isOpen={toggle} >
			          <ModalBody>
			          <h4>Enter Username</h4>
			            	<input type="text" onChange={this.Handler}  name="username"/>
			          </ModalBody>
			          <ModalFooter>
			            <Button color="primary" onClick={this.Toggle}>Submit</Button>
			          </ModalFooter>
	    	    </Modal>
					<div className="MessageList_header">
						<div className="user_header">
							<h4> Group Chat</h4>
							
						</div>
					</div>
					<div className="MessageList">
						<ul className="Message_ul">
							<li className="income_msg">
								Lorem ikewion ewifjioew oifhewihiofew
							</li>
						
							
									{ (MessageList.length != 0) ? (MessageList.map((e,i) =>{
																			return(<li key={i} className={(e.recieve)? 'income_msg':'outgoing_msg'}>{e.text}</li>)
																		})):null}
							
						</ul>
					</div>
					<div className="Input_wrapper">
							<textarea placeholder="Message" disabled={(!username)?"disabled":""} 
							className="input" 
							value ={this.state.Message}
							onKeyPress = {(e)=>{if(e.key === 'Enter')this.SendMsg()}}
							onChange={event => {this.setState({Message: event.target.value})}}
							 name="messagewriter" />
							<button type="button" onClick={this.SendMsg} className="send"> Send </button>
					</div>

		
				</div>
			)
	}
}

export default MessageList;