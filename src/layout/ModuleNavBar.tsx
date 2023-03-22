import { NavLink } from "react-router-dom";
import { DropdownMenu } from "../components/display";
import { DropdownItem } from "../components/display/DropdownMenu";
import { Button } from "../components/input";
import useUserRoleSwitcher from '../providers/user-role-switcher/useUserRoleSwitcher';

function ModuleNavBar() {
    const userRoleSwitcher = useUserRoleSwitcher();
    let navLinkData;

    if(userRoleSwitcher.activeRole == 'pvd-super-admin') {
        navLinkData = {
            "/": "Home",
            "institutions": "Institutions",
            "profile": "Profile",
        };
    } else if(userRoleSwitcher.activeRole == 'pvd-site-admin') {
        navLinkData = {
            "/": "Home",
            // "projects": "Projects",
            "profile": "Profile",
        };
    } else if(userRoleSwitcher.activeRole == 'pvd-member') {
        navLinkData = {
            "/": "Home",
            "projects": "Projects",
            "sequences": "Sequences",
            "profile": "Profile",
        };
    } else {
        navLinkData = {
            "/": "Home",
            "profile": "Profile",
        };
    }

    const navLinks = Object.entries(navLinkData).map(([path, label]) => {
        return (
            <li key={label} className="text-gray-900 dark:text-white">
                <NavLink className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to={path}>
                    {label}
                </NavLink>
            </li>
        );
    })

    console.log(userRoleSwitcher.activeRole == 'pvd-super-admin' || userRoleSwitcher.activeRole == 'pvd-site-admin')

    const requestsTab = userRoleSwitcher.activeRole == 'pvd-super-admin' || userRoleSwitcher.activeRole == 'pvd-site-admin' ?
    <li className="text-gray-900 dark:text-white">
        <button className="nav-link dropdown-toggle normal-case flex items-center text-sm font-medium text-gray-500 rounded-full hover:text-gray-700 dark:hover:text-blue-500 focus:ring-1 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" 
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="requestsDropdown"
            role="button">
            Requests  
            <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button>
        <DropdownMenu ariaLabel="requestsDropdown">
            <NavLink to="user-update-requests"><DropdownItem>
                User Profile Updates
            </DropdownItem></NavLink>
            {userRoleSwitcher.activeRole == 'pvd-super-admin' ? <NavLink to="role-requests"><DropdownItem>
                Roles
            </DropdownItem></NavLink> : <></>}
        </DropdownMenu>
    </li>: <></>

    const NavLinkList = () => {
        return (
            <>
                {navLinks}
                {requestsTab}
            </>
        );
    }

    return (
            <nav className="bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <ul className="flex flex-row space-x-12 text-sm font-medium">
                        <NavLinkList />
                    </ul>
                </div>
            </nav>
    );
}

export default ModuleNavBar;