import { useEffect, useRef } from "react";
import { BioseqSetDocument } from "../../client/models/BioseqSetDocument";
import { Form, FormRow, TextInput } from "../../components/input";
import Select from "../../components/input/Select";
import { BioseqSetClassEnumDisplay } from "../../data_model_enums";
import { SectionProps } from "./SectionProps";
import { useForm } from 'react-hook-form';
import { APIClient } from "../../client/APIClient";
import { OpenAPI } from "../../client/core/OpenAPI";
import { useParams } from "react-router-dom";


type ChangedFields = {
    name: keyof BioseqSetDocument;
    previousValue: any;
    currentValue: any;
  };

export function Overview(props: SectionProps) {
    const client = new APIClient(OpenAPI);
    const projID = useParams().id!;
    const creationId = useParams().creationID!;
    const bioseqset = props.document.bioseqset as BioseqSetDocument

    const { 
            register,
            watch,
            formState: {
                errors,
            },
        } = useForm<BioseqSetDocument>({
            mode: "onBlur", 
            defaultValues: 
                bioseqset as BioseqSetDocument
        }) 

    const formData = watch();
    const prevFormDataRef = useRef<BioseqSetDocument>(formData);

    useEffect(() => {
        // Compare the previous and current form data to find changed fields
        const changedFields: ChangedFields[] = Object.keys(formData).reduce<ChangedFields[]>((result, name) => {
        const currentValue = formData[name as keyof BioseqSetDocument];
        const previousValue = prevFormDataRef.current[name as keyof BioseqSetDocument];
        if (currentValue !== previousValue) {
            result.push({ name: name as keyof BioseqSetDocument, previousValue: previousValue || '', currentValue: currentValue || '' });
        }
        return result;
        }, []);

        console.log('Form data changed:', changedFields);

        // Call the API here
        let dict: any = {}
        changedFields.forEach((value) => {
            if(value.name !== 'seq_set')
                dict[value.name] = value.currentValue;
        })

        if (Object.keys(dict).length > 0){
            client.projects.updateDraftSequenceCreationBioseqsetProjectsProjectIdDraftCreationsCreationIdBioseqsetPatch(projID, creationId, dict).then((data) => {
                props.document.bioseqset = data
                props.setDocument!(props.document)
                console.log("Successfully patched")
            }).catch((error) => {
                console.log("failed to patch")
            })
        }

        // Update the previous form data
        prevFormDataRef.current = formData;
    }, [formData]);

    return <Form title="Overview">
        <FormRow>
          <label className="block text-gray-700 text-sm font-bold" htmlFor="class" >Class</label>
          <Select inline_label={true} choices={BioseqSetClassEnumDisplay} placeholder={false} selectName="set_class" register={register} required={true}/>
        </FormRow>
        <FormRow>
          <TextInput flex="grow" label="Release" errors={errors} {...register("release", {required: true})}/>
        </FormRow>
      </Form>
  }