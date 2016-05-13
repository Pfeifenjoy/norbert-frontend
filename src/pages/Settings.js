/*
	Dominic Steinhauser
*/

import React, {Component} from "react";
import UserStore from "../stores/UserStore";
import { changePassword } from "../actions/UserActions";
import { deleteAccount } from "../actions/UserActions";
import ConfigStore from "../stores/ConfigStore";

export default class Settings extends Component {
	constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getAll(),
            oldPassword: "",
            password: "",
            repassword:"",
            submitFailed: false,
			accountDelFailed: false
        }
    }
    componentWillMount() {
        ConfigStore.on("change", () => {
            this.setState({ config: ConfigStore.getAll() });
        });
    }
	
	
	
    render() {
		
		const oldPasswordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
		const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
		const rePasswordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
		
		const deleteAccFailedMsg = <p>Account could not be deleted.</p>;
		
		const oldPassword =  <div className={oldPasswordState}>
            <input className="form-control" placeholder="Current password"
                   value={this.state.oldPassword}
                   onChange={this.handleOldPasswordChange.bind(this)} name="oldPassword"
                   type="password"
            />
			</div>;
		
		
		const password =  <div className="passwordState">
            <input className="form-control" placeholder="New password"
					value={this.state.password}
                   onChange={this.handlePasswordChange.bind(this)} name="password"
                   type="password"
            />
			</div>;
			
		const rePassword =  <div className="rePasswordState">
            <input className="form-control" placeholder="New password"
                   value={this.state.repassword}
                   onChange={this.handleRePasswordChange.bind(this)} name="repassword"
                   type="password"
            />
			</div>;
		
        return <div className="main_bg">
		<div className=" settings container"> 
			<div className=" panel panel-default">
            <div className=" panel-heading">
                <h3 className="panel-title">Passwort ändern</h3>
            </div>
            <div className="panel-body">
               <form acceptCharset="UTF-8" role="form" action="" method="post"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
					{oldPassword}
					{password}
					{rePassword}
						
                        <input className="btn btn-sm btn-success "  type="submit" value="Save"/>
                    </fieldset>
                </form>
            </div>
        </div>;
		
		<div className=" panel panel-default">
            <div className=" panel-heading">
                <h3 className="panel-title">Account löschen</h3>
            </div>
            <div className="panel-body">
			
					{
						(() => {
							if(this.state.accountDelFailed){
							
								return deleteAccFailedMsg;
							}
						})()
					}
                   <input className="btn btn-sm btn-danger btn-block " onClick={this.handleDeleteAcc.bind(this)} type="button" value="Account löschen"/>
				   
                    
                
            </div>
        </div>;
		</div>      
	</div>
		
    }
	
	handleRePasswordChange(oEvent) {
        this.setState({
            repassword: oEvent.target.value
        });
    }

    handlePasswordChange(oEvent) {
        this.setState({
            password: oEvent.target.value
        });
    }
	
	handleOldPasswordChange(oEvent) {
        this.setState({
            oldPassword: oEvent.target.value
        });
    }
	
	handleDeleteAcc(){
		deleteAccount().fail( () => {
			
			this.setState({accountDelFailed: true});
		});
	}
	
	
	handleSubmit(oEvent) {
        oEvent.preventDefault();
        let password = this.state.password;
        let oldPassword = this.state.oldPassword;
		let repassword = this.state.repassword;
        if (!oldPassword || !password || password != repassword) {
            this.setState({submitFailed: true});
            return;
        }

        changePassword( oldPassword, password).done(() =>{
			this.setState({submitFailed: false,
				oldPassword: "",
            password: "",
            repassword:""
			});			
		}).fail(() => {
            this.setState({submitFailed: true});
        })
    }
	
	
	

}

   