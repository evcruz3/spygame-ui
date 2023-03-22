import { Component } from 'react';
import { AuthContext, AuthContextProps, useAuth, withAuth } from 'react-oidc-context';
import { 
  Header,
  Body,
  Footer,
  pages,
  ModuleNavBar
} from './layout';
import UserRoleSwitcherProvider from './providers/user-role-switcher/UserRoleSwitcherProvider';



function AuthComponent() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return (<pages.SigningIn />);
    case "signoutRedirect":
      return (<pages.SigningOut />);
  }

  if (auth.isLoading) {
    return (<pages.AuthLoading />);
  }

  if (auth.error) {
    return (<pages.AuthError />);
  }

  if (auth.isAuthenticated) {
    return (<pages.Home />);
  }

  return (<pages.Welcome />);
}

class App extends Component <any> {

  constructor(props: any){
    super(props);

    window.addEventListener("storage", this.onStorageUpdate);

    console.log("Rendering app...")
    console.log(props);

  }

  onStorageUpdate = (e: any) => {
    const { key, newValue } = e;
    if (key === "isAuthenticated") {
      if((this.props.user === null) && (newValue === 'true')) {
        this.props.signinRedirect();
      }
      else if(this.props.user !== null && newValue === "false"){
        this.props.signoutRedirect();
      }
    }
  };

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

  componentWillUnmount(): void {
    window.removeEventListener("storage", this.onStorageUpdate);
  }

  render() {

    return (
          <AuthContext.Consumer>
            {(_auth: AuthContextProps | undefined) => (
              <UserRoleSwitcherProvider value={_auth}>
                <div className='min-h-screen flex flex-col'>
                  <Header />
                  
                  {/* {this.props.isAuthenticated? <ModuleNavBar/>:<></>}  */}
                  <Body>
                  {/* <StickyNavBar /> */}

                    <AuthComponent />
                  </Body>
                  <Footer />    
                </div>
              </UserRoleSwitcherProvider>
            )}
          </AuthContext.Consumer>
        )
  }
}

export default  withAuth(App); 