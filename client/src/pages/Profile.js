import {Component} from 'react';
import del from './delete.svg';
import axios from 'axios';
import {env} from '../config.js'

class Profile extends Component{
    constructor(props){
        super(props);

        const urlParams = new URLSearchParams(window.location.search); 
        const id = urlParams.get('id');

        this.state = {
            'id': id,
            'error': false,
            'attributes': {},
        }

        const profile = this;
        axios.get(`${env}/users`, {
            id: id,
        }).then(res => {
            
            console.log(res);

            if(res.data.error){
                profile.state['error'] = true;
            } else{
                profile.state['error'] = false;
                profile.state['attributes'] = res.data;
            }
        }).catch(error => {
            console.log(error);
            profile.state['error'] = true;
        });
    }

    deleteProfile = () =>{
        
        const profile = this;

        axios.delete(`${env}/users`, {
            id: profile.state.id,
        }).then(res => {

            console.log(res);

            if(res.data.error){
                profile.state['error'] = true;
            } else{
                window.location = "/";
            }
        }).catch(error => {
            console.log(error);
            profile.state['error'] = true;
        });
    }

    render(){
        return (           
            <div className="App">
                <h1>Profile</h1>
                <ul>
                    {Object.entries(this.state.attributes).map( ([k, v]) => 
                        <li key={k} >{k + ": " + v}</li>) } 
                </ul>       
                <img src={del} className="del-img"  alt="del" onClick={this.deleteProfile} />
                {this.state.error ? <p>Error occured. Please try again.</p> : null}
            </div>
        );
    }
}

export {Profile};