
import { useAuth } from "react-oidc-context";
import { Route, Routes } from "react-router-dom";
import { OpenAPI } from '../../client';
import { 
    institution,
    project,
    sequence,
    profile,
    request,
    roleRequest,
} from "../../modules";


function Home() {

    const auth = useAuth();
    OpenAPI.TOKEN = auth.user?.access_token;

    console.log("building home")

    return (
        <> 
            <Routes>
                <Route path="/" />
                <Route path="institutions">
                    <Route path="add" element={<institution.AddInstitution />}/>
                    <Route path=":id/edit" element={<institution.EditInstitution />}/>
                    <Route index element={<institution.ViewInstitutions/>}/>
                    <Route path=":id" element={<institution.ViewInstitution/>}/>
                    <Route path=":id/delete" element={<institution.DeleteInstitution/>}/>
                </Route>
                <Route path="projects">
                    <Route path="add" element={<project.AddProject />}/>
                    <Route index element={<project.ViewProjects/>}/>
                    <Route path=":id">
                        <Route index element={<project.ViewProject/>}/>
                        <Route path="edit" element={<project.EditProject />}/>
                        <Route path="delete" element={<project.DeleteProject/>}/>
                        
                        <Route path="draft_creations" element={<project.ViewDraftSequences />}/>
                        <Route path="draft_creations/:creationID" element={<project.ViewDraftSequence />}/>
                        <Route path="draft_creations/:creationID/edit" element={<project.EditDraftSequence />}/>
                        <Route path="draft_creations/:creationID/delete" element={<project.DeleteDraftSequence />}/>

                        <Route path="submitted_creations" element={<project.ViewSubmittedSequences />}/>
                        <Route path="submitted_creations/:acc" element={<project.ViewSubmittedSequence />}/>

                        <Route path="approved_creations" element={<project.ViewApprovedSequences />}/>
                        <Route path="approved_creations/:acc" element={<project.ViewApprovedSequence />}/>

                        <Route path="settings" element={<project.EditProject />}/>
                        <Route path="settings/delete" element={<project.DeleteProject />}/>
                        <Route path="settings/access" element={<project.ViewAccessSettings/>}/>
                        <Route path="settings/access/add" element={<project.AddMember/>}/>
                        <Route path="settings/access/:userId/delete" element={<project.DeleteMember/>}/>
                    </Route>
                </Route>
                <Route path="sequences">
                    <Route path="add" element={<sequence.AddDraft/>}/>
                    <Route path=":acc/edit" element={<sequence.EditDraft />}/>
                    <Route index element={<project.ViewApprovedSequences/>}/>
                    <Route path=":acc" element={<sequence.ViewDraft/>}/>
                    <Route path=":acc/delete" element={<sequence.DeleteDraft/>}/>
                </Route>
                <Route path="profile">
                    <Route path="edit" element={<profile.EditProfile/>}/>
                    <Route index element={<profile.ViewProfile/>}/>
                </Route>
                <Route path="user-update-requests">
                    <Route index element={<request.ViewRequests/>}/>
                    <Route path=":id" element={<request.ViewRequest/>}/>
                    <Route path=":id/approve" element={<request.ApproveRequest/>}/>
                    <Route path=":id/reject" element={<request.RejectRequest/>}/>
                </Route>
                <Route path="role-requests">
                    <Route index element={<roleRequest.ViewRoleRequests/>}/>
                    <Route path=":id" element={<roleRequest.ViewRoleRequest/>}/>
                    <Route path=":id/approve" element={<roleRequest.ApproveRoleRequest/>}/>
                    <Route path=":id/reject" element={<roleRequest.RejectRoleRequest/>}/>
                </Route>
            </Routes>
        </>
    );
}
export default Home;
