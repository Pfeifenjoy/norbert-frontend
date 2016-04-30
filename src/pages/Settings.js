/*
	Dominic Steinhauser
*/

import React, {Component} from "react";
import UserStore from "../stores/UserStore";
import { changePassword } from "../actions/UserActions";

export default class Settings extends Component {
	
    render() {
        return <div className="main_bg">
		<div className="container"> 
			<div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Please register</h3>
            </div>
            <div className="panel-body">
               <p> Input felder für passwort</p>
            </div>
        </div>;
		</div>	
                
                
           
      
	</div>
		
    }
	/*
	user = UserStore.username;
	
	changepas(user,oldpas,pass).fail(() => {
		
	});*/
}

   