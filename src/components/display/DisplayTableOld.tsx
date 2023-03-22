import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditButton, ViewButton, DeleteButton, RejectButton, ApproveButton } from "../input/Button"
import { RedConfirmModal } from "./Modal";

export type ColumnData = {
    /** Heading to display for this column. */
    heading: string,
    /** Name of the field for this column. */
    value: string,
    /** Function to render the data into a JSX Element. */
    renderer?: (data:any) => JSX.Element,
}

/**
 * @prop data    Data that will be rendered in the table.
 * @prop columns Information on the columns headers of the table.
 * @prop idField    Name of the field where the object's ID is specified.
 * @prop editURL Part of the route to navigate to if edit is clicked.
 * @prop delURL  Part of the route to navigate to if delete is clicked.
 * @prop approveURL  Part of the route to navigate to if approve is clicked.
 * @prop rejectURL  Part of the route to navigate to if reject is clicked.
 * @returns The JSX.Element containing the table with the data.
 */
function DisplayTableOld(props: {
    data: any, 
    columns: ColumnData[],
    idField?: string,
    editURL?: string, 
    delURL?: string,
    draft_sequencesURL?: string,
    approveURL?: string,
    rejectURL?: string
}) {
    var deleteConfirm =<></>;
    var approveConfirm=<></>;
    var rejectConfirm =<></>;
    const navigate = useNavigate();
    const [clickedRow, setClickedRow] = useState<JSX.Element>();
    const idField = props.idField ? props.idField : '_id';

    // Returns an array of table headers.
    const headers = props.columns.map((header: {heading:string, value:string}) => {
        return <th>{header.heading}</th>
    })
    
    if(props.approveURL) {
        headers.push(<th></th>)
        approveConfirm = 
        <RedConfirmModal 
            modalName="approveConfirmationModal" 
            header={'Approve Request'} 
            body={'Are you sure you would like to approve this?'} 
            action={(() => navigate(clickedRow+'/approve'))}
        />
    }
   
    if(props.rejectURL) {
        headers.push(<th></th>)
        rejectConfirm = 
        <RedConfirmModal 
            modalName="rejectConfirmationModal" 
            header={'Deletion of entry'} 
            body={'Are you sure you would like to reject this?'} 
            action={(() => navigate(clickedRow+'/reject'))}
        />
    }


    if(props.editURL) {
        headers.push(<th></th>)
    }

    if(props.draft_sequencesURL) {
        headers.push(<th></th>)
    }

    if(props.delURL) {
        headers.push(<th></th>)
        deleteConfirm = 
        <RedConfirmModal 
            modalName="deleteConfirmationModal" 
            header={'Deletion of entry'} 
            body={'Are you sure you would like to delete this?'} 
            action={(() => navigate(clickedRow+'/delete'))}
        />
    }

    /**
     * Returns a row element containing the passed data and an edit and/or delete button, if included.
     *
     * @prop row     Data that will be rendered in the table.
     * @prop columns Information on the columns headers of the table.
     * @prop editURL Part of the route to navigate to if edit is clicked.
     * @prop delURL  Part of the route to navigate to if delete is clicked.
     * @returns The JSX.Element that is a row containing the data.
     */
    function TableRow(props: {
        row: any, 
        columns: ColumnData[], 
        editURL?: string, 
        draft_sequencesURL?: string,
        delURL?: string,
        approveURL?: string,
        rejectURL?: string
    })  {
        const itemID = props.row[idField];

        // Returns an array of table data elements containing rendered data.
        const displayRow = props.columns.map((item: ColumnData) => {
            const renderer= item.renderer ? item.renderer : (data: any) => data;
            const values = item.value.split(".")
            const row = props.row[`${values[0]}`]
            if (row == null) {
                return <td></td>
            }
            else if (typeof(row) != "string") {
                if (item.renderer) {
                    return <td>{renderer(row)}</td>;
                }
                else {
                    return <td>{row[values[1]]}</td>;
                }
            }
            else {
                return <td>{renderer(row)}</td>;

            }
            
        });
        
        if(props.approveURL) {
            displayRow.push(
                <ApproveButton 
                    url={itemID+'/'+props.approveURL} 
                    onClickAction={() =>{setClickedRow(props.row[idField])}}
                />);
        }
        if(props.rejectURL) {
            displayRow.push(
                <RejectButton 
                    url={itemID+'/'+props.rejectURL} 
                    onClickAction={() =>{setClickedRow(props.row[idField])}}
                />);
        }

        if(props.editURL) {
            displayRow.push(<EditButton url={itemID+'/'+props.editURL}/>);
        } 

        if(props.draft_sequencesURL) {
            displayRow.push(<ViewButton url={itemID+'/'+props.draft_sequencesURL}/>);
        } 
    
        if(props.delURL) {
            // When delete button is pressed, it sets the state of clickedRow to the _id field of the given data.
            displayRow.push(
            <DeleteButton 
                url={itemID+'/'+props.delURL} 
                onClickAction={() =>{setClickedRow(props.row[idField])}}
            />);
        } 
    
        return (
            <tr>{displayRow}</tr>
        );
    }

    return (
        <>
            {deleteConfirm}
            {rejectConfirm}
            {approveConfirm}
            <table>
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {props.data.map((row: any) => {
                        return (
                        <TableRow 
                            row={row} 
                            columns={props.columns} 
                            editURL={props.editURL}
                            draft_sequencesURL={props.draft_sequencesURL} 
                            delURL={props.delURL}
                            approveURL={props.approveURL}
                            rejectURL={props.rejectURL}
                        />)
                    })}
                </tbody>
            </table>
        </>
    );
}

export default DisplayTableOld;
