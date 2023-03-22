import { UserRoleType } from "./UserRoleSwitcherProvider";

export default interface UserRoleSwitcher {
    activeRole: UserRoleType;
    setActiveRole: Function;
    switchableRoles: UserRoleType[];
    setSwitchableRoles: Function;
  } 