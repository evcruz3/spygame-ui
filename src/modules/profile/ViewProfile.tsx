import { APIClient, ApiError, OpenAPI, RequestableUserRole, RequestState, UserProfileDocument, UserRole, UserRoleRequest } from '../../client';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher'
import UserRoleType from '../../providers/user-role-switcher/useUserRoleSwitcher'
import {isEmpty, xor } from 'lodash';


// import Modal from 'react-bootstrap/Modal';


import {
    DisplayTextInfo,
    DisplayInfoLoading,
    DisplayPVDServerError,
    DropdownMenu
} from '../../components/display';

import {
    Button
} from '../../components/input';
import { RedConfirmModal } from '../../components/display/Modal';
import { User } from 'oidc-client-ts';
import { DropdownHeader, DropdownItem } from '../../components/display/DropdownMenu';
import Scaffold from '../../components/display/Scaffold';

function DisplayProfile(props: {profile: UserProfileDocument | any}) {
    const userRoleSwitcher = useUserRoleSwitcher();
    // console.log(userRoleSwitcher?.activeRole);

    if (props.profile) {
        const profile = props.profile;
        return (
            <ul>
                <li><DisplayTextInfo label="User ID" value={profile.oidc_user_id} /></li>
                <li><DisplayTextInfo label="First Name" value={profile.first_name} /></li>
                <li><DisplayTextInfo label="Middle Name" value={profile.middle_name} /></li>
                <li><DisplayTextInfo label="Last Name" value={profile.last_name} /></li>
                <li><DisplayTextInfo label="Suffix" value={profile.suffix} /></li>
                <li><DisplayTextInfo label="Organization" value={profile.organization} /></li>
                <li><DisplayTextInfo label="Department" value={profile.department} /></li>
                <li><DisplayTextInfo label="Region" value={profile.region} /></li>
                <li><DisplayTextInfo label="Province" value={profile.province} /></li>
                <li><DisplayTextInfo label="City/Municipality" value={profile.city_municipality} /></li>
                <li><DisplayTextInfo label="Street Address" value={profile.street_address} /></li>
                <li><DisplayTextInfo label="Contact Number" value={profile .contact_number} /></li>
                <li><DisplayTextInfo label="Office Number" value={profile.office_number} /></li>
                <li><DisplayTextInfo label="Email Address" value={profile.email_address} /></li>
                <li><DisplayTextInfo label="Alternate Email Address" value={profile.alt_email_address} /></li>
                <li><DisplayTextInfo label="Affiliation" value={profile.affiliation?.institution_name} /></li>
                <li><DisplayTextInfo label="Roles" value={[...userRoleSwitcher.switchableRoles, userRoleSwitcher.activeRole].join(", ")} /></li> 
            </ul>
        );
    } else {
        return <DisplayInfoLoading />;
    }
}

function ViewProfile() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [profile, setUserProfile] = useState<UserProfileDocument>();
    const [error, setError] = useState<ApiError>();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const roleSwitcher = useUserRoleSwitcher();

    async function RequestSiteAdminRole() {

        var data : UserRoleRequest = {oidc_user_id: auth.user!.profile.sub, status: RequestState.PENDING, role: RequestableUserRole.PVD_SITE_ADMIN };
        client.users.insertRoleRequestUsersRoleRequestsPost(data).then((data: UserRoleRequest) => {
            return;
        }).catch((error: ApiError) => {
            setError(error);
        });
    }


    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.users.viewUserProfileUsersUserIdGet(auth.user.profile.sub).then((data: UserProfileDocument) => {
                setUserProfile(data);
            }).catch((error: ApiError) => {

                setError(error);
            });
        }
    }, [auth.user]);

    const [selectedRole, setSelectedRole] = useState('');
    const handleRoleChange = (event: any) => {
        setSelectedRole(event.target.value);
      };

      const roleHeader = <DropdownHeader>Request Role</DropdownHeader>
                    
      const listRoles =  [UserRole.PVD_SITE_ADMIN, UserRole.PVD_VALIDATOR].map((role: UserRole) => {
          return <DropdownItem
              onClick={()  => {setSelectedRole(role);}}
          >
              {role}
          </DropdownItem>
      });
      const roleMenu = <>{roleHeader}{listRoles}<   hr className="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" /></>

      const dropdownMenu = <DropdownMenu ariaLabel="profileDropdown">
          {roleMenu}
      </DropdownMenu>;

    if (error) {
        console.log("error status: ", error.status)
        if (error.status == 404) {
            // if there is no profile, redirect to update profile page.
            console.log("Navigating to edit")
            return <Navigate to="edit" replace={true}></Navigate>;
        } 
        else{
            return <DisplayPVDServerError error={error} />;
        }
        
    } else {

        const body = <>{showSuccessModal == true ? <h1>Request for a site-admin role has been sent</h1> : <></>}
        <DisplayProfile profile={profile} /></>

        return (
            <>
                <Scaffold header={"My Profile"} body={body} footer={<><Button purpose='primary' onClick={() => {navigate('edit')}}>Edit Profile</Button><RoleRequestButton /></>}/>
                
                
             

            </>
            
            
            );
    }
}


// type Role = "pvd-site-admin" | "pvd-validator";

function RoleRequestButton() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RequestableUserRole>(RequestableUserRole.PVD_SITE_ADMIN);
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [error, setError] = useState<ApiError>();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleConfirmationOk = () => {
        setShowConfirmationModal(false);
    };

  function requestRole() {
    // Call an API or perform some action to request the selected role
    console.log("Requesting role:", selectedRole);
    var data : UserRoleRequest = {oidc_user_id: auth.user!.profile.sub, status: RequestState.PENDING, role: RequestableUserRole.PVD_SITE_ADMIN };
    client.users.insertRoleRequestUsersRoleRequestsPost(data).then((data: UserRoleRequest) => {
        return;
    }).catch((error: ApiError) => {
        setError(error);
    });
    // Close the modal
    setShowModal(false);
    setShowConfirmationModal(true);
  }

  return (
    <div>
      <Button purpose="primary" onClick={() => setShowModal(true)}>Request Role</Button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "0.5rem",
              maxWidth: "30rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Request Role</h2>
            <label htmlFor="role-dropdown">Select a role:</label>
            <select
              id="role-dropdown"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as RequestableUserRole)}
              style={{ marginBottom: "1rem" }}
            >
              <option value={RequestableUserRole.PVD_SITE_ADMIN}>pvd-site-admin</option>
              <option value={RequestableUserRole.PVD_VALIDATOR}>pvd-validator</option>
            </select>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <Button purpose="danger" onClick={requestRole}>Request Role</Button>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="modal" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div className="modal-content" style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "0.5rem",
              maxWidth: "30rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h2>Request Sent</h2>
            <p>Request for role {selectedRole} has been sent.</p>
            <button onClick={handleConfirmationOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}



export default ViewProfile;