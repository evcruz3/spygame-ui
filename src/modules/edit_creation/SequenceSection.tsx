
import { useEffect, useState, ChangeEvent, useRef } from 'react';
import { Bioseq, SeqInstDataCompressionEnum, SeqId, SeqIdGenBank, SeqIdGi, BioseqDocument, SeqDesc, SeqAnnot, SeqInst, Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post, SeqIdLocal, SeqIdEmbl, SeqIdDdbj, SeqIdSwissProt, Body_create_bioseq_source_modifiers_projects__project_id__draft_creations__creation_id__bioseqset_sequences_source_modifiers_post} from '../../client/index'
import { Observable, Observer } from 'rxjs';
import React from "react";

import { Link, useParams } from "react-router-dom";
import { APIClient, ApiError, OpenAPI, DraftSequenceDocument, ProjectProfileDocument, UserProfileDocument, UserProjectRoleDocument, ProjectRole, BioseqSetCreationDocument, BioseqSetCreationRequest} from '../../client';
import Modal, { RedConfirmModal } from '../../components/display/Modal';

import { useAuth } from 'react-oidc-context';
import { useForm, SubmitErrorHandler, FieldErrorsImpl, DeepRequired } from 'react-hook-form';
import { Button, TextInput, Form, FormRow, MultiFileUpload } from '../../components/input';
import { getEnumKeyByEnumValue, SeqInstMolEnumDisplay, SeqInstReprEnumDisplay} from '../../data_model_enums'
import TextWithHoverEdit from '../../components/input/TextWithHoverEdit'
import { BufferedFileLineReader } from './bufferedfilelinereader';
import { SectionProps } from './SectionProps';


function parseSeqId(seqId: string): Array<SeqId> {
  const trimmedSeqId = seqId.trim(); // trim the input string
  const pairs = trimmedSeqId.split("|");
  // const result: { [key: string]: string } = {};
  let output: Array<SeqId> = []
  if (pairs.length > 1){
    for (let i = 0; i < pairs.length-1; i += 2) {
      if (pairs[i] == 'gb') { // genbank
        const tmp = pairs[i+1].split(".")
        output.push({value: {accession: tmp[0], name: pairs[i+2], release: "", version: Number(tmp[1])} as SeqIdGenBank} as SeqId)
        i += 1;
        continue;
      }
      else if (pairs[i] == "gi"){
        output.push({value: {gi: Number(pairs[i+1])} as SeqIdGi} as SeqId)
        continue;
      }
        
      else if (pairs[i] == "emb"){
        const tmp = pairs[i+1].split(".")
        output.push({value: {accession: tmp[0], name: pairs[i+2], release: "", version: Number(tmp[1])} as SeqIdEmbl} as SeqId)
        i += 1;
        continue;
      }
      else if(pairs[i] == "dbj"){
        const tmp = pairs[i+1].split(".")
        output.push({value: {accession: tmp[0], name: pairs[i+2], release: "", version: Number(tmp[1])} as SeqIdDdbj} as SeqId)
        i += 1;
        continue;
      }
      else if(pairs[i] == "sp"){
        const tmp = pairs[i+1].split(".")
        output.push({value: {accession: tmp[0], name: pairs[i+2], release: "", version: Number(tmp[1])} as SeqIdSwissProt} as SeqId)
        i += 1;
        continue;
      }
      else 
        output.push({value: {id: pairs[i+1] ?? ""} as SeqIdLocal} as SeqId)
        continue;
      // result[pairs[i]] = pairs[i + 1];
    }
  }
  else{
    console.log("SUPPOSED TO ENTER HERE")
    output.push({value: {id: pairs[0]} as SeqIdLocal} as SeqId)
  }
  
  console.log("output: ")
  console.log(output)
  return output;
}

function parseFastaFile(file: File): Observable<Bioseq> {
  return new Observable((observer: Observer<Bioseq>) => {
    let currentSequenceName = '';
    let currentSequenceDefLine = '';
    let currentSequenceData = '';
    let currentSequenceId: Array<SeqId> = [];
    let currentSequenceDefArray = []
    console.log("Starting parsing...");
    new BufferedFileLineReader(file).readLines(
      // callback
      function(raw_line){
        const line = raw_line.trim();
        if (line.startsWith('>')) {
          if (currentSequenceDefLine !== '' && currentSequenceData !== '') {
            // sequences.push({
            observer.next({
                seq_ids: currentSequenceId,
                descr: [{
                value: { 
                  name: currentSequenceName
                  } , 
                }],
                inst: { 
                  data: { 
                    data: currentSequenceData,
                    compression: SeqInstDataCompressionEnum._0
                  },
                repr: 0,
                mol: 0
                }
              });

            currentSequenceData = '';
          }
          currentSequenceDefLine = line.substring(1);
          currentSequenceDefArray = currentSequenceDefLine.split(" ")
          currentSequenceId = [...parseSeqId(currentSequenceDefArray[0])]
          currentSequenceName = currentSequenceDefArray.slice(1).join(' ')
        } else {
          currentSequenceData += line;
        }
      },
      // on end call back
      function() {
        if (currentSequenceDefLine !== '' && currentSequenceData !== '') {
          // sequences.push({ 
          observer.next({
            seq_ids: [...currentSequenceId],
            descr: [{
            value: { 
              name: currentSequenceName
              } , 
            }],
            inst: { 
              data: { 
                data: currentSequenceData,
                compression: SeqInstDataCompressionEnum._0
              },
            repr: 0,
            mol: 0
            }
          });
        }
        observer.complete();
      }
        );
  });
};

type Props = {
  sequences: Array<BioseqDocument>;
  setSequences: React.Dispatch<React.SetStateAction<Array<BioseqDocument>>>;
  isParsing: boolean;
  setIsParsing: React.Dispatch<React.SetStateAction<boolean>>;
};
  
type SequenceProps = {
  sequences: BioseqDocument[];
};

const FastaSequenceTable: React.FC<SequenceProps> = ({ sequences}) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Accession No.</th>
          <th>Seq Id</th>
          <th>Description</th>
          <th>Representation Type</th>
          <th>Molecule</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sequences.map((sequence, index) => (
          <UploadingSequenceRow sequence={sequence} index={index}/>
        ))}

      </tbody>
    </table>
  );
};

type newSeqProps = {
  sequence: BioseqDocument;
  index: number
}

const UploadingSequenceRow: React.FC<newSeqProps> = ({sequence, index}) => {
  const auth = useAuth();
  const client = new APIClient(OpenAPI);
  const projID = useParams().id!;
  // const creationID = useParams().creationId!;
  const [error, setError] = useState<ApiError>();
  const [sequenceDocument, setSequenceDocument] = useState<BioseqDocument>(sequence);
  const creationId = useParams().creationID!;
  const [status, setStatus] = useState<String>("OK")
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const destroyFunc = useRef<void>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  // Ensure that upload of sequences with no seqid are only done ONCE
  var uploadOnce = () => {
    if (auth.user && auth.user.profile && sequence.accession_no == null && isUploading == false) {
      setStatus("Uploading...")
      var data = [sequence]
      
      client.projects.createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesPost(projID, creationId, data).then((data: BioseqDocument[]) => {
          setSequenceDocument(data[0])
          console.log(`finished uploading: ${data[0].accession_no}`)
          setStatus("OK")
          // console.log('2 is uploading: ', isUploading)
          // isUploading = true;
      }).catch((error: ApiError) => {
          setError(error);
          setStatus("ERROR")
      });
      
    }
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = uploadOnce();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      // if (destroyFunc.current) {
      //   destroyFunc.current();
      // }
    };
  }, []);

  const deleteSequence = () => {
    if (auth.user && auth.user.profile) {
      setStatus("DELETING...")
      client.projects.createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesAccessionNoDelete(projID, creationId, sequenceDocument.accession_no).then(() => {
        setStatus("DELETED")
        setIsDeleted(true);
      }).catch((error: ApiError) => {
          setError(error);
          setStatus("ERROR")
      });
    }
  }

  
  const editModalContent = () => {
    return (<>Are you sure you would like to delete <b>{sequence?.descr[0]?.value?.name ?? " this sequence"}</b> from the database?</>);
  }

  function displaySeqId(seq_ids : Array<SeqId>){
    let output = "";
    let length = seq_ids.length
    for(let i=0;i<length;i++){
      let endline = i==length - 1 ? '' : '\n'
      // let endline = '\n'
      if(seq_ids[i]._type == "SeqIdLocal")
        output = output.concat(seq_ids[i]._type + ": " + seq_ids[i].value.id + endline)
      else if(seq_ids[i]._type == "SeqIdGi")
        output = output.concat(seq_ids[i]._type + ": " + seq_ids[i].value.gi + endline)
      else{
        output = output.concat(seq_ids[i]._type + ": " + seq_ids[i].value.accession + endline)
      }
    }
    return output;
  }
  

  return(
    <>
    
    <Modal 
      modalName={"editModal"+sequence?.accession_no}
      header={"Edit Sequence Instance"}
      body={<div><TextWithHoverEdit initialText={sequenceDocument?.descr[0]?.value?.name ?? "Sequence Instance"} updateText={() => {console.log("update text invoked")}} /> 
      {JSON.stringify(sequenceDocument)}
      </div>

    
    
    } 
      verticallyCentered={true}
      buttons={undefined}
      size="xl"
      />
    
    <tr key={index} >
      <td className="truncate max-w-xl">{status != "OK" ? status: sequenceDocument?.accession_no}</td>
      <td className="truncate max-w-xl"><div style={{whiteSpace: "pre-line"}}>{displaySeqId(sequenceDocument.seq_ids)}</div></td>
      <td className="truncate max-w-xl">{sequenceDocument?.descr[0]?.value?.name ?? ""}</td>
      <td className="truncate max-w-xl">{getEnumKeyByEnumValue(SeqInstReprEnumDisplay, sequenceDocument.inst.repr)}</td>
      <td className="truncate max-w-xl">{getEnumKeyByEnumValue(SeqInstMolEnumDisplay, sequenceDocument?.inst.mol) ?? ""}</td>
      <td>{isDeleted == false && sequenceDocument?.accession_no != null ? <><Button purpose='primary' type="button" data-bs-toggle="modal" data-bs-target={"#editModal"+sequence?.accession_no}>Edit</Button><Button purpose='danger' onClick={deleteSequence}>Delete</Button></>: null}</td>
      {/* <td >{JSON.stringify(sequence.seq_ids) ?? ""}</td>
      <td >{sequence?.descr[0]?.value?.name ?? ""}</td>
      <td >{sequence?.inst?.data?.data}</td> */}
    </tr>
    </>
  )
}

export type FileUploaderClass = {
  fasta_files: FileList
}

export type SourceModFileUploaderClass = {
  source_mod_files: FileList
}

const SourceModifierFileUploader: React.FC<Props> = ({ sequences, setSequences, isParsing, setIsParsing }) => {
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<ApiError>();
  const projID = useParams().id!;
  const client = new APIClient(OpenAPI);
  const sizeInMBToUpload = 0


  const creationId = useParams().creationID!;
  const { 
      register, 
      handleSubmit,
      formState: { 
          errors,
          isValid,
          isDirty
      },
      watch
  } = useForm<SourceModFileUploaderClass>({
      mode: "onChange"});

  const onError: SubmitErrorHandler<SourceModFileUploaderClass> = (errors: FieldErrorsImpl<DeepRequired<SourceModFileUploaderClass>>) => {
      console.log(errors)
  }

  const disableSubmit = !isDirty || !isValid;

  const onNextSequence = (sequence: Bioseq) => {
    setSequences((prevSequences) => [...prevSequences, sequence]);
    console.log(`Parsed ${sequences.length + 1} sequence(s)`);
  };
  const onCompleteSequence = () => {
    setIsParsing(false);
    console.log(`Finished parsing ${sequences.length} sequences`);
  };  
  const onErrorSequence = (err: any) => {
    setIsParsing(false);
    console.error(err);
    };
  
  const onSubmit = (data: SourceModFileUploaderClass) => {
    setSubmitError(undefined);

    const fileList = data.source_mod_files;
    if (fileList && fileList.length > 0) {
      const allowedExtensions = /(\.txt)$/i;
      const validFiles = Array.from(fileList).filter(file => allowedExtensions.exec(file.name)
       && file.size < sizeInMBToUpload * 1024 * 1024
      );
      const validUploadableFiles = Array.from(fileList).filter(file => allowedExtensions.exec(file.name)
      && file.size >= sizeInMBToUpload * 1024 * 1024

      )
      if (validFiles.length + validUploadableFiles.length === 0) {
        setError('Invalid file type/s.');
        return;
      }

      if(validFiles.length > 0){
        setError(null);

        setIsParsing(true);
        
        for (let i = 0; i < validFiles.length; i++) {
          const sequenceStream = parseFastaFile(validFiles[i]);
          sequenceStream.subscribe({
            next: onNextSequence,
            complete: onCompleteSequence,
            error: onErrorSequence
            });
        }
        setIsParsing(false)
      }
      
      if(validUploadableFiles.length > 0){
        console.log("Uploading source modifier files...");

        client.projects.createBioseqSourceModifiersProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesSourceModifiersPost(projID, creationId, {source_mod_files: validUploadableFiles} as Body_create_bioseq_source_modifiers_projects__project_id__draft_creations__creation_id__bioseqset_sequences_source_modifiers_post).then((data) => {
          setSequences((prevSequences) => [...prevSequences, ...data]);
        }).catch((error) => {
          console.log(error);
          setSubmitError(error);
        })
      }
    }
    
  }

  const buttons = [
    <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
    <Button purpose="danger" type="submit" form="addSourceMod" data-bs-dismiss="modal">Confirm</Button>
  ];


  return (
    <div>
       <Modal 
            header={'Add Source Modifier/s'} 
            body={<>Would you like to add this source modifier to the database of sequences?</>} 
            modalName="submitSourceModConfirmation" 
            buttons={buttons}
        />
      <Form title='Export Source Modifiers'
          id='addSourceMod'
          onSubmit={handleSubmit(onSubmit, onError)}> 
          <FormRow>
              <MultiFileUpload label="Source Modifier File/s" {...register("source_mod_files", { required: true })} errors={errors} />
          </FormRow>
          <FormRow>
              <Button purpose='primary' type="button" disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitSourceModConfirmation">Submit</Button>
          </FormRow>
      </Form>
    </div>
  );
};


const FastaFileUploader: React.FC<Props> = ({ sequences, setSequences, isParsing, setIsParsing }) => {
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<ApiError>();
  const [draftCreated, setDraftCreated] = useState<boolean>();
  const projID = useParams().id!;
  const client = new APIClient(OpenAPI);
  const sizeInMBToUpload = 5


  const creationId = useParams().creationID!;
  const { 
      register, 
      handleSubmit,
      formState: { 
          errors,
          isValid,
          isDirty
      },
      watch
  } = useForm<FileUploaderClass>({
      mode: "onChange"});

  const onError: SubmitErrorHandler<FileUploaderClass> = (errors: FieldErrorsImpl<DeepRequired<FileUploaderClass>>) => {
      console.log(errors)
  }

  const disableSubmit = !isDirty || !isValid;

  const onNextSequence = (sequence: Bioseq) => {
    setSequences((prevSequences) => [...prevSequences, sequence]);
    console.log(`Parsed ${sequences.length + 1} sequence(s)`);
  };
  const onCompleteSequence = () => {
    setIsParsing(false);
    console.log(`Finished parsing ${sequences.length} sequences`);
  };  
  const onErrorSequence = (err: any) => {
    setIsParsing(false);
    console.error(err);
    };
  
  const onSubmit = (data: FileUploaderClass) => {
    setSubmitError(undefined);

    const fileList = data.fasta_files;
    if (fileList && fileList.length > 0) {
      const allowedExtensions = /(\.fasta)$/i;
      const validFiles = Array.from(fileList).filter(file => allowedExtensions.exec(file.name)
       && file.size < sizeInMBToUpload * 1024 * 1024
      );
      const validUploadableFiles = Array.from(fileList).filter(file => allowedExtensions.exec(file.name)
      && file.size >= sizeInMBToUpload * 1024 * 1024

      )
      if (validFiles.length + validUploadableFiles.length === 0) {
        setError('Invalid file type/s.');
        return;
      }

      if(validFiles.length > 0){
        setError(null);

        setIsParsing(true);
        
        for (let i = 0; i < validFiles.length; i++) {
          const sequenceStream = parseFastaFile(validFiles[i]);
          sequenceStream.subscribe({
            next: onNextSequence,
            complete: onCompleteSequence,
            error: onErrorSequence
            });
        }
        setIsParsing(false)
      }
      
      if(validUploadableFiles.length > 0){
        console.log("Uploading fasta files...");

        client.projects.createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesFastaPost(projID, creationId, {fasta_files: validUploadableFiles} as Body_create_bioseqs_projects__project_id__draft_creations__creation_id__bioseqset_sequences_fasta_post).then((data) => {
          setSequences((prevSequences) => [...prevSequences, ...data]);
        }).catch((error) => {
          console.log(error);
          setSubmitError(error);
        })
      }
    }
    
  }

  const buttons = [
    <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close">Go back</Button>,
    <Button purpose="danger" type="submit" form="addDraft" data-bs-dismiss="modal">Confirm</Button>
  ];


  return (
    <div>
       <Modal 
            header={'New Draft Sequence'} 
            body={<>Would you like to add this sequence to the database of sequences?</>} 
            modalName="submitConfirmation" 
            buttons={buttons}
        />
      <Form title='Export Sequences'
          id='addDraft'
          onSubmit={handleSubmit(onSubmit, onError)}> 
          <FormRow>
              <MultiFileUpload label="Sequence File/s" {...register("fasta_files", { required: true })} errors={errors} />
          </FormRow>
          <FormRow>
              <Button purpose='primary' type="button" disabled={disableSubmit} data-bs-toggle="modal" data-bs-target="#submitConfirmation">Submit</Button>
          </FormRow>
      </Form>
    </div>
  );
};

function SequenceSection(props: SectionProps) {
  const [sequences, setSequences] = useState<BioseqDocument[]>([]);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const auth = useAuth();
  const client = new APIClient(OpenAPI);
  const projID = useParams().id!;
  const creationId = useParams().creationID!;
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
      if (auth.user && auth.user.profile) {
          setSequences([])
          console.log("Fetching sequences")
          client.projects.createBioseqsProjectsProjectIdDraftCreationsCreationIdBioseqsetSequencesGet(projID, creationId).then((data: BioseqDocument[]) => {
              setSequences(data);
          }).catch((error: ApiError) => {
              setError(error);
          });
      }
  }, [auth.user]);
    
  return (
    <div>
     
      {"Total Number of Sequences: " + sequences.length}
      {sequences.length > 0 && <FastaSequenceTable sequences={sequences} />}
      {isParsing == false ? <FastaFileUploader sequences={sequences} setSequences={setSequences} isParsing={isParsing} setIsParsing={setIsParsing} /> : 
      <>Loading sequences...</>}
      {isParsing == false ? <SourceModifierFileUploader sequences={sequences} setSequences={setSequences} isParsing={isParsing} setIsParsing={setIsParsing} /> : 
      <>Loading source modifiers...</>}
      

    </div>
  );
}

export default SequenceSection;
