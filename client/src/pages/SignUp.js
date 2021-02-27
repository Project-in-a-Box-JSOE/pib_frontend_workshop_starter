import {Component} from 'react';
import axios from 'axios';
import env from '../config.js'

class SignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            'username': '',
            'pw': '',
            'first': '',
            'last': '',
            'major': '',
            'error': false,
        }
    }

    submitForm = () => {
        const signup = this;
        axios.post(env.URL + '/users/signup', {
            username: this.state.username,
            password: this.state.pw,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            major: this.state.major,
        }).then(res => {
            console.log(res);

            if(res.data.error){
                signup.setState({'error': true})
            } else{
                signup.setState({'error': false})

                const id = res.data.user.id;
                window.location =  "/profile?id=" + id;

            }
        }).catch(error => {
            console.log(error);

            signup.setState({'error': true})
        });
    }

    render(){
        return (           
            <div className="App">
                <h1>Sign Up</h1>
                <input type="text" name="first" placeholder="First Name" onChange={(e) => this.setState({'first':e.target.value})} />
                <input type="text" name="last" placeholder="Last Name" onChange={(e) => this.setState({'last':e.target.value})} />
                <input type="text" name="user" placeholder="Username" onChange={(e) => this.setState({'username':e.target.value})} />
                <input type="text" name="pw" placeholder="Password" onChange={(e) => this.setState({'pw':e.target.value})} />
                <input type="text" name="major" placeholder="Major" onChange={(e) => this.setState({'major':e.target.value})} />
                <button onClick={this.submitForm}>Submit</button>
                {this.state.error ? <p>Error occurred. Please try again.</p> : null}
            </div>
        );
    }
}

export {SignUp}