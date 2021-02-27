import {Component} from 'react';
import axios from 'axios';
import {env} from '../config.js'

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            'username': '',
            'pw': '',
            'error': false,
        }
    }

    submitForm = () => {
        
        if(!this.state.username || !this.state.pw){
            return;
        }

        const login = this;

        axios.get(`${env}/users`, {
            username: this.state.username,
            password: this.state.pw,
        }).then(res => {
            
            console.log(res); // TODO: delete log

            if(res.data.error){
                login.setState({'error': true});
            } else{
                login.setState({'error': false});
                const id = res.data.id;
                window.location = "/profile?id=" + id;
            }
        }).catch(error => {
            console.log(error);
            login.setState({'error': true});
        });

    }
    render(){
        return (
            <div className="App">
                <h1>Login</h1>
                <input type="text" name="user" placeholder="Username" onChange={(e) => this.setState({'username':e.target.value})} />
                <input type="text" name="pw" placeholder="Password" onChange={(e) => this.setState({'pw':e.target.value})} />
                <button onClick={this.submitForm}>Submit</button>
                {this.state.error ? <p>Error occured. Please try again.</p> : null}
            </div>
        )
    }
}

export {Login}