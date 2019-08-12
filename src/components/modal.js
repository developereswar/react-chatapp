import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalComponent extends React.Component{
	
	state = {
		username:null,
		toggle:false
	}

	componentDidMount(){

		this.check();
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

	Handler=(e)=>{
		this.setState({username:e.target.value})
		}

	toggle = ()=>{
		 localStorage.setItem("CurrentUser", this.state.username);
		 this.setState({toggle:false})
	}

	render(){
		const { toggle } = this.state;
		return(
		
        	<Modal isOpen={toggle} >
		          <ModalBody>
		          <h4>Enter Username</h4>
		            	<input type="text" onChange={this.Handler}  name="username"/>
		          </ModalBody>
		          <ModalFooter>
		            <Button color="primary" onClick={this.toggle}>Submit</Button>
		          </ModalFooter>
    	    </Modal>
    	  )
	}
	
}

export default ModalComponent;