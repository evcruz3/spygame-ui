import { Component } from 'react';
import { AuthContextProps } from 'react-oidc-context';
import jwt_decode from "jwt-decode";
import { Provider } from './UserRoleSwitcherContext';
import UserRoleSwitcher from './UserRoleSwitcher';
import {isEmpty, xor } from 'lodash';
import { UserRole } from '../../client';

export type UserRoleType = `${UserRole}`;

export default class UserRoleSwitcherProvider extends Component<any, UserRoleSwitcher> {
  private switchableRoles : UserRoleType[] = [];
  private activeRole : UserRoleType = UserRole.PVD_GUEST;
  private isMounted : boolean = false;

  private setSwitchableRoles = (roles : UserRoleType[]) => {

    this.switchableRoles = [];
    // 1. Add all user roles in the switchable roles
    for (var role of roles){
      this.switchableRoles.push(role);
    }

    // 2. Set the highest role as the active role
    // Hierarchy:
    // role hierarchy:
    //  pvd-super-admin
    //  pvd-site-admin
    //  pvd-member

    if(this.switchableRoles.includes(UserRole.PVD_SUPER_ADMIN)){
        let role = UserRole.PVD_SUPER_ADMIN;
        this.activeRole = role;
        this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
    }
    else if(this.switchableRoles.includes(UserRole.PVD_SITE_ADMIN)){
        let role = UserRole.PVD_SITE_ADMIN;
        this.activeRole = role;
        this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
    }
    else if(this.switchableRoles.includes(UserRole.PVD_VALIDATOR)){
        let role = UserRole.PVD_VALIDATOR;
        this.activeRole = role;
        this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
    } else if(this.switchableRoles.includes(UserRole.PVD_MEMBER)){
        let role = UserRole.PVD_MEMBER;
        this.activeRole = role;
        this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
    } else {
        let role = UserRole.PVD_GUEST;
        this.activeRole = role;
        this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
    }
    if(this.isMounted == true)
      this.setState({activeRole: this.activeRole, switchableRoles : [...this.switchableRoles]})
  }

  private setActiveRole = (role : UserRoleType)  => {
    if(this.switchableRoles.includes(role))
    {
      this.switchableRoles = this.switchableRoles.filter(obj => obj !== role);
      this.switchableRoles.push(this.activeRole);
      this.activeRole = role;
      if(this.isMounted == true)
        this.setState({activeRole: this.activeRole, switchableRoles: this.switchableRoles});
    }
      
    else
      console.log("You may not switch to this role");
  }

  get_user_roles(client: string, token: string) {
    if(token){
      const token_decoded: object = jwt_decode(token);
      console.log("decoded token: ")
      console.log(token_decoded)
      const available_resources = token_decoded['resource_access'];
      if (client in available_resources && 'roles' in available_resources[client]) {
          return available_resources[client]['roles'];
      }
      return [];
    }
    else{
      return [];
    }
  }

  onStorageUpdate = (e: any) => {
    const { key, newValue } = e;
    if (key === "roleSwitcherProviderState") {
      console.log("Detected a change in role switcher provider in the localstorage, updating the role provider...")
      if(this.isMounted == true)
        this.setState(JSON.parse(newValue))
    }
  };

  constructor(props: AuthContextProps) {
    super(props);

    window.addEventListener("storage", this.onStorageUpdate);
    
    let JSONString = localStorage.getItem("roleSwitcherProviderState")
    let localRoleSwitcherProviderState = typeof(JSONString) == 'string' ? JSON.parse(JSONString) : null;

    if(localRoleSwitcherProviderState != null){
      this.activeRole = localRoleSwitcherProviderState.activeRole;
      this.switchableRoles = localRoleSwitcherProviderState.switchableRoles;
    }

    this.state = {
      activeRole: this.activeRole,
      setActiveRole: this.setActiveRole,
      switchableRoles: this.switchableRoles,
      setSwitchableRoles: this.setSwitchableRoles,
    }

  }


  componentDidUpdate(prevProps : any, prevState : any) {
    this.isMounted = true;
    let prev_access_token = prevProps["value"].user?.access_token;
    let curr_access_token = this.props["value"].user?.access_token;

    if(prev_access_token !== curr_access_token){
      let roles : UserRoleType[] = this.get_user_roles("pvd-server", curr_access_token)

      // Update switchable roles if 
      // active role is not present on the access_token roles 
      // or 
      // there is a difference between the current switchable roles and the access_token roles
      let updateSwitchableRoles = !roles.includes(this.activeRole) ||
        !isEmpty(xor(this.switchableRoles, roles.filter((element) => element !== this.activeRole)));
     
      if (updateSwitchableRoles) this.setSwitchableRoles(roles);
    }
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) => {
        if(prevState[key] !== val && key == "activeRole"){
          console.log(`State '${key}' changed`);
          localStorage.setItem("roleSwitcherProviderState", JSON.stringify(this.state))
        }
      }
      );
    }
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    window.removeEventListener("storage", this.onStorageUpdate);
  }
 
  render() {
    

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

