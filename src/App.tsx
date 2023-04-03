import { Component, useEffect } from 'react';
import { AuthContext, AuthContextProps, useAuth, withAuth } from 'react-oidc-context';
import { Body, HomePage } from './layout';
import MQTTComponent from './layout/MQTTComponent';
import Dashboard from './layout/MQTTComponent';

class App extends Component <any> {

  constructor(props: any){
    super(props);
  }

  componentDidUpdate(prevProps: any, prevState: any) {

    Object.entries(this.props).forEach(([key, val]) => {
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
      if(key === "user"){
        let isAuthenticated = localStorage.getItem("isAuthenticated");
        console.log("isAuthenticated? : " + isAuthenticated);
        console.log(this.props.user);
        if((this.props.user === null) && (isAuthenticated === 'true')) {
          this.props.signinRedirect();
        }
        else if(this.props.user !== null && isAuthenticated === "false"){
          this.props.signoutRedirect();
        }
        // else if(this.props.user !== undefined && this.props.user !== null){
        //   console.log("Setting localStorage isAuthenticated to true...");
        //   localStorage.setItem("isAuthenticated", "true");
        // }
      }
    }
    );
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

  random_users = ["6418b74d938f694ed61a56aa", "6418b76a938f694ed61a56ab", "6418b772938f694ed61a56ac"]
  randomIndex = Math.floor(Math.random() * this.random_users.length)

  render() {


    console.log("rendering asdasdsa")
    return (<>
    <Body>
    {/* <HomePage joinEvent={(eventCode, playerName) => {console.log("hello")}}/> */}
      <MQTTComponent event_id={'KIKO'} player_id={this.random_users[this.randomIndex]}/>
    </Body></>)
  }
}

export default  App; 