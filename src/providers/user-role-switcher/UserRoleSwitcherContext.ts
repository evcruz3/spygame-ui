import { createContext } from "react"
import { UserRole } from "../../client";
import { UserRoleType } from "./UserRoleSwitcherProvider";


export const UserRoleSwitcherContext = createContext({
    activeRole: UserRole.PVD_GUEST,
    setActiveRole: (role: UserRoleType) => {},
    switchableRoles: [],
    setSwitchableRoles: (roles: UserRoleType[]) => {},
});

export const {Provider, Consumer} = UserRoleSwitcherContext;

export default UserRoleSwitcherContext;