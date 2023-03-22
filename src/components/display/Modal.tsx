import { Button } from "../input";

type ModalProps = {
    header: string,
    body?: string | JSX.Element,
    modalName?: string, 
    size?: string,
    buttons?: JSX.Element[],
    onCancel?: () => void,
    verticallyCentered?: boolean
} & Partial<JSX.IntrinsicElements["div"]>;

/**
 * 
 * @prop header     The text to display for the modal-header.
 * @prop body       What to put in the modal-body.
 * @prop modalName  The id for modal div.
 * @prop buttons    A list of Buttons to put in the modal-footer.
 * @returns A Modal component given its header, body, id, and buttons for the footer.
 */
function Modal({header, body, modalName = "defaultModalName", size="m", buttons, onCancel, verticallyCentered = false, ...props}: ModalProps) {
    const str_verticallyCentered = verticallyCentered ? " modal-dialog-centered " : ""

    // If buttons are passed, footer for the modal is created.
    var footer = <></>;
    if(buttons) {
        footer = <div
            className="modal-footer flex items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            {buttons}
        </div>
    }
    return <div className="modal fixed top-0 left-0 hidden w-full h-full overflow-y-auto overflow-x-hidden outline-none"
        id={modalName} tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
        <div className={"modal-dialog modal-dialog-scrollable pointer-events-none relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out " + str_verticallyCentered + " modal-" + size}>
            <div className="modal-content pointer-events-auto relative flex max-h-[100%] w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id={modalName}>{header}</h5>
                <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close" onClick={onCancel}></button>
            </div>
            <div className="modal-body relative overflow-y-auto p-4">
                {body}
                {props.children}
            </div>
            {footer}
            </div>
        </div>
    </div>
}

/**
 * 
 * @prop header - the text to display for the modal-header
 * @prop body - what to put in the modal-body
 * @prop modalName - the id for modal div
 * @prop action - what to do when confirm is clicked
 * @prop confirmButton - a custom confirm button to use, if given
 * @returns a modal with a red confirm button and a back button
 */
function RedConfirmModal(props: {header: string, body: string|JSX.Element, modalName?: string, action?: any, onCancel?: () => void, confirmButton?: JSX.Element, verticallyCentered?: boolean}) {
    const modalName = props.modalName ? props.modalName : "confirmationButton";
    
    const goBackButton = <Button purpose="link" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={props.onCancel}>Go back</Button>;
    const confirmButton = props.confirmButton ? props.confirmButton : <Button purpose="danger" data-bs-dismiss="modal" onClick={props.action}>Confirm</Button>;
    return <Modal header={props.header} body={props.body} modalName={modalName} buttons={[goBackButton, confirmButton]} onCancel={props.onCancel} verticallyCentered={props.verticallyCentered}></Modal>;
}

export default Modal;
export {RedConfirmModal};