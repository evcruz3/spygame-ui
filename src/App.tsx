import { Component, useEffect } from 'react';
import { AuthContext, AuthContextProps, useAuth, withAuth } from 'react-oidc-context';
import { Body, HomePage } from './layout';
import MQTTComponent from './layout/MQTTComponent';
import Dashboard from './layout/MQTTComponent';
import { APIClient, JoiningPlayer, OpenAPI } from './client';
import Button from './components/Button';

class App extends Component <any> {
  private isMounted : boolean = true;

  constructor(props: any){
    super(props);
    this.isMounted = true
    const spyGameUser = localStorage.getItem('spyGameUser');
    this.state = {
      user: null
    }
    window.addEventListener("storage", this.onStorageUpdate);
  }

  onStorageUpdate (e: any) {
    const { key, newValue } = e;
    if (key === "spyGameUser") {
      console.log("Detected a change in role switcher provider in the localstorage, updating the role provider...")
      console.log(newValue)
      console.log("ismounted: ", this.isMounted)
      if(this.isMounted == true)
        this.setState({user: JSON.parse(newValue)})
    }
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    window.removeEventListener("storage", this.onStorageUpdate);
  }

  joinEvent = (eventCode: string, playerName: string) => {
    const apiClient = new APIClient(OpenAPI);

    apiClient.events.joinEventEventsEventCodePlayersPost(eventCode, {name: playerName} as JoiningPlayer)
    .then((data) => {
      localStorage.setItem("spyGameUser", JSON.stringify(data))
      this.setState({user: data})
      console.log("Successfully saved data on localstorage")

    })

  }

  quitEvent = () => {
    localStorage.removeItem('spyGameUser')
    this.setState({user: null})
    console.log("logged out")
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    this.isMounted = true;

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

  random_users = ["64313220f82cc2ab1df15291", "64313228f82cc2ab1df15292", "6431322cf82cc2ab1df15293"]
  randomIndex = Math.floor(Math.random() * this.random_users.length)

  

  render() {
    console.log("rendering asdasdsa")
    
    const spyGameUser = JSON.parse(localStorage.getItem('spyGameUser') || '{}');
    // console.log("user: ", spyGameUser)
    // console.log("bool: ", Object.keys(spyGameUser).length)
    return (
      <>
        <Body>
          {Object.keys(spyGameUser).length > 0 ? (
            <div>
            <button onClick={this.quitEvent}>Quit Game</button>
            <MQTTComponent event_id={spyGameUser.event_code} player_id={spyGameUser._id} />
            </div>
          ) : (
            <HomePage joinEvent={this.joinEvent} />
          )}
        </Body>
      </>
    )
  }
}

export default  App; 