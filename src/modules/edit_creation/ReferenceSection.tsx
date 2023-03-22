import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SeqDescPub } from "../../client";
import { APIClient } from "../../client/APIClient";
import { OpenAPI } from "../../client/core/OpenAPI";
import { BioseqSetDocument } from "../../client/models/BioseqSetDocument";
import { Button, FormRow, RadioList, Select, TextInput } from "../../components/input";
import Datepicker from "../../components/input/Datepicker";
import Form, { FormGroup } from "../../components/input/Form";
import { SectionProps } from "./SectionProps";
import { RedConfirmModal } from "../../components/display/Modal";


function isSeqDescPub(obj: Object): obj is SeqDescPub {
    return areValidKeys(obj, ["title", "status", "pubstatushist", "authors"])
  }

function areValidKeys(obj: any, keys: string[]): boolean {
    return keys.every((key) => obj.hasOwnProperty(key));
}
  
type ChangedFields = {
    name: keyof BioseqSetDocument;
    previousValue: any;
    currentValue: any;
  };

export function Reference(props: SectionProps) {

    const client = new APIClient(OpenAPI);
    const projID = useParams().id!;
    const creationId = useParams().creationID!;
    const bioseqset = props.document.bioseqset as BioseqSetDocument
    const publications = bioseqset.descr?.filter((desc) => isSeqDescPub(desc.value))
    const modalName = "deletePublications"

    const { 
      register, 
      control,
      handleSubmit,
      formState: {
          errors
      },
      reset,
      watch
    } = useForm<any>({
      mode: "onBlur", defaultValues: {"same_publication": publications === undefined ? "No" : "Yes"}});
  
    const inSamePublication = watch("same_publication")
    const pubStatus = watch("publication_status")
    const prevAnswer = useRef<"Yes" | "No">(inSamePublication)
    const hiddenButtonRef = useRef<HTMLButtonElement>(null)
    
    const handleCancel = () => {
        reset({ same_publication: "Yes" });
    }

    const handleAnswerChange = async () => {
        console.log("CALL API NOW")
    };

    useEffect(() => {
        
        if(prevAnswer.current != inSamePublication){
            if (inSamePublication == "No"){
                if (hiddenButtonRef.current) {
                    hiddenButtonRef.current.click();
                  }
            }
            else{
                console.log("CALL API NOW")
            }
        }

        prevAnswer.current = inSamePublication;
    }, [inSamePublication]);
  
    function AuthorArray() {
      const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "authors"
      });
  
      const authors = fields.map((field, index) => (
        <div className="flex flex-row border-b-2 py-4">
          <div>
            <FormRow>
              <TextInput flex='grow-[3]' label="Last Name" key={`last_name_${field.id}`} {...register(`authors.${index}.last_name`)} errors={errors} />
              <TextInput flex='grow-[2]' label="First Name" key={`first_name_${field.id}`} {...register(`authors.${index}.first_name`)} errors={errors} />
              <TextInput flex='grow-[1]' label="Middle Name" key={`middle_name_${field.id}`} {...register(`authors.${index}.middle_name`)} errors={errors} />
              <TextInput flex='grow-0' label="Suffix" key={`suffix_${field.id}`} {...register(`authors.${index}.suffix`)} errors={errors} />
            </FormRow>
            <FormRow>
              <TextInput flex='grow-[3]' label="Contact Email" key={`email_${field.id}`}  {...register(`authors.${index}.email`, {
                pattern: {
                    value: /\S+@\S+\.\S+/, 
                    message: "Please enter a valid email."
                } })} errors={errors} readOnly={false} />
              <TextInput flex='grow-[3]' label="Contact Number"  key={`phone_${field.id}`}  {...register(`authors.${index}.phone`, {
                pattern: {
                    value: /[0-9]+/, 
                    message: "Please enter numbers only."
                }})} errors={errors} readOnly={false} />
            </FormRow>
            <FormRow>
              <TextInput flex='grow-[3]' label="Affiliation" key={`affiliation_${field.id}`} {...register(`authors.${index}.affiliation`)} errors={errors}/>
              <RadioList choices={["Primary Level", "Secondary Level"]} label="Author Level" key={`author_level_${field.id}`} radioName={`authors.${index}.author_level`} register={register}/>
              <TextInput label="Author Role" key={`author_role_${field.id}`} {...register(`authors.${index}.author_role`)} errors={errors} />
            </FormRow>
          </div>
          <div className="flex py-4 pl-4">
            <Button purpose={"danger"} type="button" onClick={() => {remove(index)}}>Remove Author</Button>
          </div>
        </div>
      ))
  
      return inSamePublication === "Yes" ? <FormGroup groupName={"Authors"}>
        {authors}
        <div className="pt-4">
          <Button type="button" purpose={"primary"} onClick={() => append({last_name:"", first_name: "", middle_name: "", suffix: "", author_level:"", author_role: ""})}>Add another Author</Button>
        </div> 
      </FormGroup> : null
    }
  
    function Publication() {
      return <FormGroup groupName="Publication">
          <FormRow>
            <RadioList choices={["Unpublished", "In-Press", "Published", "Revised"]} radioName="publication_status" register={register} label="Publication Status" inline_options={true}/>
          </FormRow>
          <FormRow>
            <TextInput flex="grow-[3]" label="Article Title" errors={errors} {...register("article_title")} />
          </FormRow>
        {
          ["In-Press", "Published"].includes(pubStatus) ? <> 
            <FormRow>
              <TextInput flex="grow-[3]" label="Publication/Journal Title" errors={errors} {...register("journal_title")}/>
            </FormRow>
            <FormRow>
              <TextInput label="Volume" errors={errors} {...register("volume")}/>
              <TextInput label="Issue" errors={errors} {...register("issue")}/>
              <TextInput label="Pages:from" errors={errors} {...register("pages_from")}/>
              <TextInput label="Pages:to" errors={errors} {...register("pages_to")}/>
            </FormRow>
          </> : null
        }
        { pubStatus == "Published" ? <FormRow>
          <Datepicker register={register} name='publication_date' inline_options={true} label="Publication Date"/>
        </FormRow> : null
        }
      </FormGroup>
    }
  
    function PublicationHistory() {
      const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "publication_history"
      });
  
      const pubHistory = fields.map((field, index) => {
        return <div className="flex flex-row py-4">
          <div className="">
          <FormRow>
            <Datepicker register={register} name = {`publication_history.${index}.date`} inline_options={true} label="Date" />
            <Select choices={["Unpublished", "In-Press", "Published", "Revised"]} register={register} label="Status" selectName={`publication_history.${index}.status`} key={`publication_history.status_${field.id}`} placeholder={false}/>
            <div className="grow" />
            <div className="flex justify-end pl-4">
              <Button purpose={"danger"} type="button" onClick={() => {remove(index)}}>Remove History</Button>
            </div>
          </FormRow>
  
          </div>
        </div>
      })
  
      return <FormGroup groupName={"Publication History"}>
        {pubHistory}
        
        <Button type="button" purpose={"link"} onClick={() => append({date: ""})}>Add to Publication History</Button>
      </FormGroup>
    }

    return <>
        
      <Form 
        title = "Reference"
        id = "referenceForm"
        method = "put"
      >
        <FormRow>
          <RadioList choices={["Yes", "No"]} radioName="same_publication" register={register} label="Do the sequences have the same publication?" inline={true} />
        </FormRow>
        {inSamePublication === "Yes" && <>
        <AuthorArray />
        <Publication />
        <PublicationHistory /></>}
      </Form>
      <Button purpose="link" ref={hiddenButtonRef} data-bs-toggle="modal" data-bs-target={'#' + modalName} className="hidden"></Button>
      <RedConfirmModal 
        modalName={modalName}
        header={'Remove Publications for Sequence Set'} 
        body={`Are you sure you want to delete the publications for the sequence set?`}
        action={handleAnswerChange}
        onCancel={handleCancel}
        />
        
    </>
  }