import { APIClient, ApiError, OpenAPI, InstitutionProfileDocument } from '../../client';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, DeleteButton, EditButton } from '../../components/input/Button';
import { DisplayAccessDenied, DisplayInfoLoading, DisplayPVDServerError, DisplayTextInfo } from '../../components/display';
import { RedConfirmModal } from '../../components/display/Modal';
import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

/**
 * @prop institution The data from the institution record to display.
 * @returns The data and a modal for deletion confirmation purposes.
 */
function DisplayInstitution(props: {institution: InstitutionProfileDocument}) {

    const insti = props.institution;
    return <>
        <RedConfirmModal 
            header={'Deleting this institution'} 
            body={`Are you sure you want to delete ${insti.institution_name} from our records?`}
        />
        <ul>
            <li><DisplayTextInfo label="Institution ID" value={insti._id} /></li>
            <li><DisplayTextInfo label="Name" value={insti.institution_name} /></li>
            <li><DisplayTextInfo label="Parent Institution" value={insti.parent_institution} /></li>
            <li><DisplayTextInfo label="Address" value={insti.institution_address} /></li>
            <li><DisplayTextInfo label="Email Address" value={insti.email} /></li>
            <li><DisplayTextInfo label="Phone Number" value={insti.phone} /></li>
        </ul>
    </>
}

/**
 * @returns Corresponding page to display depending on whether the institution is set.
 */
function ViewInstitution() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [institution, setInstitution] = useState<InstitutionProfileDocument>();
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const instiID = useParams().id!;
    const userRoleSwitcher = useUserRoleSwitcher();

    useEffect(() => {
        if (auth.user && auth.user.profile) {
            client.institutions.viewInstitutionInstitutionsInstitutionIdGet(instiID).then((data: InstitutionProfileDocument) => {
                console.log(data);
                setInstitution(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth.user]);
    
    if(userRoleSwitcher.activeRole != 'pvd-super-admin') {
        return <DisplayAccessDenied required_role='pvd-super-admin' />;
    } else if(error) {
        return <DisplayPVDServerError error={error} />;
    }
    else if(institution){
        return (<>
            <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deleting Institution'} 
                body={<>Are you sure you would like to delete <b>{institution?.institution_name}</b> from the database?</>} 
                action={(() => navigate('delete'))}
            />
            <BackButton />
            <DisplayInstitution institution={institution} />
            <DeleteButton />
            <EditButton />
        </>);
    }
    else {
        return <DisplayInfoLoading />;
    }
}

export default ViewInstitution;