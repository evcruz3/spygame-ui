import { Link, useParams } from "react-router-dom";
import { BioseqSetClassEnumDisplay } from '../../data_model_enums'
import { APIClient, ApiError, OpenAPI, ProjectProfileDocument, BioseqSetCreationDocument, UserProjectRoleDocument, UserProfileDocument, ProjectRole, BioseqSetDocument} from '../../client';
import { BackButton } from '../../components/input/Button';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import SequenceSection from '../edit_creation/SequenceSection'

import useUserRoleSwitcher from '../../providers/user-role-switcher/useUserRoleSwitcher';

import {
    DisplayAccessDenied,
    DisplayInfoLoading,
    DisplayPVDServerError,
    DisplayTable,
    Hyperlink
} from '../../components/display';

import {
    Button, Form, FormRow, RadioList, Select, TextInput
} from '../../components/input';
import { project } from "..";
import SingleProjectLayout from "./SingleProjectLayout";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormGroup } from "../../components/input/Form";
import { unsetIfEmpty } from "../../utils/inputs";
import ProtRefProcessedEnumDropdown from "../../components/input/Select";
import BiomolEnumDropdown from "../../components/input/Select";
import { BiomolEnumDisplay, SeqDescCompletenessEnumDisplay, SeqDescTechEnumDisplay } from "../../data_model_enums";
import CheckboxList from "../../components/input/Checkbox";
import List from "../../components/input/Checkbox";
import Datepicker from "../../components/input/Datepicker";
import { SectionProps } from "../edit_creation/SectionProps";
import { Overview } from "../edit_creation/OverviewSection";
import { Reference } from "../edit_creation/ReferenceSection";

type Tab =
  | "Overview"
  | "Reference"
  | "Molecule Information"
  | "Source"
  | "Sequence"
  | "Features"
  | "Review and Submit";

function DisplaySections() {

  const tabs: Tab[] = ["Overview", "Reference", "Molecule Information", "Source", "Sequence", "Features", "Review and Submit"];

  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [maxTabIndex, setMaxTabIndex] = useState<number>(0);
  const activeClasses = "bg-white inline-block border-b border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold";
  const inactiveClasses = "bg-gray-200 inline-block border-b py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold";
  const disabledClasses = "bg-gray-300 inline-block border-b py-2 px-4 text-white font-semibold";
  const projID = useParams().id!
  const creationID = useParams().creationID!

  const client = new APIClient(OpenAPI);
  const auth = useAuth();
  const [error, setError] = useState<ApiError>();
  const [bioseqSetCreationDocument, setBioseqSetCreationDocument] = useState<BioseqSetCreationDocument>()
  const userRoleSwitcher = useUserRoleSwitcher();
  const [project, setProject] = useState<ProjectProfileDocument>();
  const [currentMember, setCurrentMember] = useState<UserProjectRoleDocument>();

  useEffect(() => {
    if (auth.user && auth.user.profile) {
      client.users.viewUserProfileUsersUserIdGet(auth.user!.profile.sub)
        .then((data: UserProfileDocument) => {
          return client.projects.getSingleProjectMemberProjectsProjectIdMembersUserIdGet(projID, data._id!);
        }).then((data: UserProjectRoleDocument) => {
          setCurrentMember(data);
          return client.projects.viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsCreationIdGet(projID, creationID);
        }).then((data: BioseqSetCreationDocument) => {
          setBioseqSetCreationDocument(data);
        }).catch((error: ApiError) => setError(error));
    }
  }, [auth.user]);

  function handleTabClick(tab: Tab, tabIndex: number) {
    setActiveTab(tab);
    setActiveTabIndex(tabIndex);
  }

  function handleBackClick() {
    setActiveTabIndex(Math.max(activeTabIndex - 1, 0));
    setActiveTab(tabs[Math.max(activeTabIndex - 1, 0)]);
  }

  function handleNextClick() {
    setActiveTabIndex(Math.min(activeTabIndex + 1, maxTabIndex + 1));
    setActiveTab(tabs[Math.min(activeTabIndex + 1, maxTabIndex + 1)]);
    setMaxTabIndex(Math.max(maxTabIndex, activeTabIndex + 1));
  }

  if (userRoleSwitcher.activeRole != 'pvd-member') {
    return <DisplayAccessDenied required_role='pvd-member' />;
  } else if (error) {
    if (error.status == 404 && currentMember == undefined) {
        return <DisplayAccessDenied
            reason="Only members of this project may view this page." 
            action="Please request access from a project member with member permission access roles." />
    }
    return <DisplayPVDServerError error={error} />;
  } else if(bioseqSetCreationDocument == null){
    return <DisplayAccessDenied
            reason="Creation does not exist." 
            action="Please make sure that the correct creation ID is given." />
  } else if(!currentMember?.role?.includes(ProjectRole.EDIT_SEQ)){
    return <DisplayAccessDenied
      reason="Only members with EDIT_SEQ role may view this section." 
      action="Please request access from a project member with member permission access roles." />
  } else {
    return (
      <div className="rounded-lg p-1 bg-white">
        <ul className="flex">
          {tabs.map((tab, index) => (
            <li className={`${activeTab === tab ? "mr-0" : "mr-0"} text-center`} key={tab}>
              <a
                className={`${activeTab === tab ? activeClasses : index <= maxTabIndex  ? inactiveClasses : disabledClasses}`}
                href={index<= maxTabIndex  ? "#" : undefined }
                onClick={() => index <= maxTabIndex  ? handleTabClick(tab, index) : null}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
        
        <div>
          {activeTab === "Overview" && <Overview document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Reference" && <Reference document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Molecule Information" && <MoleculeInformation document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Source" && <Source document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Sequence" && <SequenceSection document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Features" && <Features document={bioseqSetCreationDocument} setDocument={setBioseqSetCreationDocument}/>}
          {activeTab === "Review and Submit" && <ReviewAndSubmit />}
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded margin-10"
          >
              Save
          </button>
          <div className="flex items-center margin-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleBackClick}
              disabled={activeTabIndex === 0}
            >
              Back
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextClick}
              disabled={activeTabIndex === tabs.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}


function MoleculeInformation(props: SectionProps) {
  const { 
    register, 
    control,
    handleSubmit,
    formState: { 
        errors
    },
    watch
  } = useForm<any>({
    mode: "onBlur"});
  
    const inSameMolInfo = watch("same_molinfo", "No")
    const molType = watch("molecule_type")
    const seqtech = watch("sequencing_technology")

    function MoleculeType() {
      return inSameMolInfo === "Yes" ? <FormGroup groupName="Molecule Type">
        {inSameMolInfo === "Yes" ? <>
          <FormRow>
          {/* <label className="block text-gray-700 text-sm font-bold" htmlFor="moltype" ></label> */}
            <Select choices={Object.keys(BiomolEnumDisplay).filter(key => isNaN(Number(key)))} selectName="molecule_type" register={register} />
          </FormRow>
        </>:null}
        {
          inSameMolInfo === "Yes" && ["Ncrna"].includes(molType) ? <> 
            <FormRow>
              <TextInput flex="grow-[3]" label="GB Molecule Type" errors={errors} {...register("gb_MolType")}/>
            </FormRow>
            
          </> : null
        }
      </FormGroup> : null
    }

    function SequencingTech() {
      return inSameMolInfo === "Yes" ? <FormGroup groupName="Sequencing Technology">
        {inSameMolInfo === "Yes" ? <>
          <FormRow>
          <label className="block text-gray-700 text-sm font-bold" htmlFor="moltype" ></label>
            <RadioList choices={Object.keys(SeqDescTechEnumDisplay).filter(key => isNaN(Number(key)))} radioName="sequencing_technology" register={register}/>
          </FormRow>
        </>:null}
        {
          inSameMolInfo === "Yes" && ["Other"].includes(seqtech) ? <> 
            <FormRow>
              <TextInput flex="grow-[3]" label="Other" errors={errors} {...register("sequencing_technology")}/>
            </FormRow>
            
          </> : null
        }
      </FormGroup> : null
    }
    function Completeness() {
      return inSameMolInfo === "Yes" ? <FormGroup groupName="Completeness">
          <FormRow>
          <label className="block text-gray-700 text-sm font-bold" htmlFor="moltype" ></label>
        <RadioList choices={Object.keys(SeqDescCompletenessEnumDisplay).filter(key => isNaN(Number(key)))} radioName="completeness" register={register}/>
          </FormRow>
      </FormGroup> : null
    }

  return <>
    <Form title='Molecule Information'
            id="moleculeForm"
            method='put'
    >
      <FormRow>
        <RadioList choices={["Yes", "No"]} radioName="same_molinfo" register={register} label="Do the sequences have the same molecule information?" inline={true}/>
      </FormRow>
      <MoleculeType/>
      <SequencingTech/>
      <Completeness/>
    </Form>
  </>;
}

function Source(props: SectionProps) {
    return <h2>Source</h2>;
}





function Features(props: SectionProps) {
    return <h2>Features</h2>;
}

function ReviewAndSubmit() {
    return <h2>Review and Submit</h2>;
}

function EditDraft() {
    const auth = useAuth();
    const client = new APIClient(OpenAPI);
    const [draft, setDraft] = useState<BioseqSetCreationDocument[]>();
    const [project, setProject] = useState<ProjectProfileDocument>();
    const projID = useParams().id!;
    const [error, setError] = useState<ApiError>();
    const navigate = useNavigate();
    const userRoleSwitcher = useUserRoleSwitcher();
    const location = useLocation();

    // useEffect(() => {
    //     if (auth.user && auth.user.profile) {
    //       client.projects.viewProjectDraftSequenceCreationsProjectsProjectIdDraftCreationsGet(projID).then((data: BioseqSetCreationDocument[]) => {
    //             console.log(data);
    //             setDraft(data);
    //         }).catch((error: ApiError) => {
    //             setError(error);
    //         });
    //     }
    // }, [auth.user, location.state]);

    useEffect(() => {
        if (auth.user && auth.user.profile && auth.isAuthenticated) {
            client.projects.viewProjectProjectsProjectIdGet(projID).then((data: ProjectProfileDocument) => {
                console.log(data);
                setProject(data);
            }).catch((error: ApiError) => {
                setError(error);
            });
        }
    }, [auth]);


    
    if(userRoleSwitcher.activeRole != 'pvd-member') {
        return <DisplayAccessDenied required_role='pvd-member' />;
    } else if (error) {
        if (error.status == 404) {
            // if there is no project, Add a Project.
            return (
                <>
                    <p>There are no registered draft sequences.</p>
                    <Button purpose='primary' onClick={() => navigate('add')}>Add a Draft Sequence</Button>
                </>
            );
        } 
        return <DisplayPVDServerError error={error} />;
    } else if (project) {
        return (<>
            <SingleProjectLayout proj_id={projID} proj_title={project.project_title}>
                {/* <p>Registered Draft Sequences</p> */}
                <DisplaySections/>
            </SingleProjectLayout>
            </>
        );
    }
}

export default EditDraft;
