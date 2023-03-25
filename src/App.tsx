import { Component } from 'react';
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

  render() {

    console.log("rendering asdasdsa")
    return (<>
    <Body>
    {/* <HomePage joinEvent={(eventCode, playerName) => {console.log("hello")}}/> */}
    <MQTTComponent event_id={'KIKO'} player_id={"6418b74d938f694ed61a56aa"}/>
    </Body></>)
  }
}

export default  App; 