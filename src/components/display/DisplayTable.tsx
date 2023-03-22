import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditButton, ViewButton, DeleteButton, RejectButton, ApproveButton } from "../input/Button"
import { RedConfirmModal } from "./Modal";

type GenericType = {[key: string]: any | undefined};

export type Renderer<T extends GenericType = GenericType> = (args: T|string) => JSX.Element|JSX.Element[]|string;

type RenderPreset = "edit" | "delete" | "approve" | "reject"

export type ColumnData<T extends GenericType> = {
    /** Heading to display for this column. */
    heading: string,
    /** Name of the field for this column. */
    value?: T | string,
    /** Function to render the data into a JSX Element. */
    renderer?: RenderPreset | Renderer<T>,
}

export type DisplayTableProps<T extends GenericType> = {
    /** Data that will be rendered in the table. */
    data: T[],
    /** Information on the columns of the table. */
    columns: ColumnData<T>[],
    /** Primary key of the data. */
    primaryKey?: string
}

/**
 * @prop data    Data that will be rendered in the table.
 * @prop columns Information on the columns headers of the table.
 * @prop primaryKey Primary key of the data.
 * @returns The JSX.Element containing the table with the data.
 */
function DisplayTable<T extends GenericType>({data, columns, primaryKey='_id', ...props} : DisplayTableProps<T>) {
    let confirmModals = {
        'delete': {
            'modal': <RedConfirmModal 
                modalName="deleteConfirmationModal" 
                header={'Deletion of entry'} 
                body={'Are you sure you would like to delete this?'} 
                action={(() => navigate(clickedRow+'/delete'))}
            />,
            'show': false
        },
        'approve': {
            'modal': <RedConfirmModal 
                modalName="approveConfirmationModal" 
                header={'Approve Request'} 
                body={'Are you sure you would like to approve this?'} 
                action={(() => navigate(clickedRow+'/approve'))}
            />,
            'show': false
        },
        'reject': {
            'modal': <RedConfirmModal 
                modalName="rejectConfirmationModal" 
                header={'Deletion of entry'} 
                body={'Are you sure you would like to reject this?'} 
                action={(() => navigate(clickedRow+'/reject'))}
            />,
            'show': false
        },
    }
    const navigate = useNavigate();
    const [clickedRow, setClickedRow] = useState<string>();

    /**
     * 
     * @param props 
     */
    function TableRow<T extends GenericType>(props: {
        row: T, 
        columns: ColumnData<T>[],
        primaryKey: string 
    }) {
        // Render preset definitions
        const presets = {
            "edit":     (id: string) => {return <EditButton url={id+'/edit'}/>},
            "delete":   (id: string) => {return <DeleteButton 
                url={id+'/approve'}  
                onClickAction={() =>{setClickedRow(id as string)}}/>},
            "approve":   (id: string) => {return <ApproveButton 
                url={id+'/approve'} 
                onClickAction={() =>{setClickedRow(id as string)}}/>},
            "reject":   (id: string) => {return <RejectButton 
                url={id+'/reject'} 
                onClickAction={() =>{setClickedRow(id as string)}}/>}
    }

        // render each cell in the row
        const renderedRow = props.columns.map((item: ColumnData<T>, index) => {
            const val = item.value;
            const ren = item.renderer;

            if (typeof(ren) == "function") {
                if(val != undefined) {
                    if(typeof(val) == "string") return <td className="px-6 py-3">{ren(props.row[val])}</td>;
                    else return <td className="px-6 py-3">{ren(val)}</td>;
                }    
                else return <td className="px-6 py-3">{ren(props.row)}</td>;
            }
            else if (ren == undefined && typeof(val) == 'string') {
                return <td className="px-6 py-3">{props.row[val]}</td>;
            }
            else if(typeof(ren) == 'string') {
                const key = typeof(val) == 'string' ? val : props.row[primaryKey];
                console.log(key)
                return <td className={index == props.columns.length - 1 ? "pr-3 py-3" : "px-0 py-3"}>{presets[ren](key)}</td>;
            }
        });

        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">{renderedRow}</tr>
    }

    // set if modals will show up
    columns.forEach((col) => {
        if (typeof(col.renderer) == 'string' && col.renderer != 'edit') {
            confirmModals[col.renderer].show = true;
        }
    })

    const modals = Object.entries(confirmModals).map(([k, v], i) => v.show ? v.modal : <></>);

    // Table is constructed row by row, starting with the headers
    const headers = columns.map((col: ColumnData<T>) => {
        return <th scope="col" className="px-6 py-3">{col.heading}</th>
    });

    // Rows are constructed using function
    const displayRows = data.map((row: T) => {
        return <TableRow row={row} columns={columns} primaryKey={primaryKey}/>
    })

    return <>
        {modals}
        <div className="relative overflow-x-auto hover:shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {displayRows}
                </tbody>
            </table>
        </div>
    </>
}

export default DisplayTable;
