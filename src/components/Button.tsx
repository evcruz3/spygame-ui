import { useAuth } from "react-oidc-context";
import { useNavigate} from 'react-router-dom';
import React from 'react';


const ButtonPurpose = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    DANGER: 'danger',
    WARNING: 'warning',
    INFO: 'info',
    LIGHT: 'light',
    DARK: 'dark',
    LINK: 'link',
} as const;
type ButtonPurpose = typeof ButtonPurpose[keyof typeof ButtonPurpose];

type ButtonProps = {
    className?: string,
    purpose: ButtonPurpose,
} & Partial<JSX.IntrinsicElements["button"]>;

const typeColors = {
    "primary": " bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg ",
    "secondary": " bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg active:bg-purple-800 active:shadow-lg ",
    "success": " bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg active:bg-green-700 active:shadow-lg ",
    "danger": " bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg ",
    "warning": " bg-yellow-500 text-white shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg active:bg-yellow-700 active:shadow-lg ",
    "info": " bg-blue-400 text-white shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg active:bg-blue-600 active:shadow-lg ",
    "light": " bg-gray-200 text-gray-700 shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg active:bg-gray-400 active:shadow-lg ",
    "dark": " bg-gray-800 text-white shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg active:bg-gray-900 active:shadow-lg ",
    "link": " bg-transparent text-blue-600 hover:text-blue-700 hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 active:bg-gray-200 ",
};

const disabledLook = "pointer-events-none opacity-60 ";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, purpose, ...props}: ButtonProps, ref) => {
    const disabled = props.disabled ? disabledLook : "";
    return (
        <button 
            ref={ref}
            className={"inline-flex items-center px-5 py-2.5 mr-3 md:mr-0 font-medium text-xs leading-tight uppercase rounded-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out" + typeColors[purpose] + disabled + className}
            {...props} >
            {props.children}
        </button>
    );
});

function LoginLogoutButton() {
    const auth = useAuth();


    const login = () => {
        console.log("logging in");
        auth.signinRedirect();
    }

    const logout = () => {
        auth.signoutRedirect();
    }

    return (
        <Button purpose="primary" onClick={auth.isAuthenticated ? logout: login}>
            {auth.isAuthenticated ? "Log Out" : "Log In"}
        </Button>
    );

}
/**
 * A danger reject button that navigates to './reject' by default.
 */
 function RejectButton(props: {modalName?: string, url?:string, onClickAction?:any}) {
    const modalName = (props.modalName ? props.modalName : "#rejectConfirmationModal")!;
    const navigate = useNavigate();
    const url = (props.url ? props.url : null)!;
    const onClickAction = props.onClickAction ? props.onClickAction : (url ? (() => navigate(url)) : null);
    return <Button purpose='danger' data-bs-toggle="modal" data-bs-target={modalName} onClick={onClickAction}>Reject</Button>
}


/**
 * A primary edit button that naviagtes to './edit' by default.
 */
function EditButton(props: {url?:string}) {
    const url = (props.url ? props.url : "edit")!;
    const navigate = useNavigate();
    return <Button purpose='primary' onClick={() => {navigate(url)}}>Edit</Button>
}

/**
 * A primary edit button that naviagtes to './edit' by default.
 */
function ViewButton(props: {url?:string}) {
    const url = (props.url ? props.url : "draft_creations")!;
    const navigate = useNavigate();
    return <Button purpose='primary' onClick={() => {navigate(url)}}>Next</Button>
}

/**
 * A primary approve button that naviagtes to './approve' by default.
 */
 function ApproveButton(props: {modalName?: string, url?:string, onClickAction?:any}) {
    const modalName = (props.modalName ? props.modalName : "#approveConfirmationModal")!;
    const navigate = useNavigate();
    const url = (props.url ? props.url : null)!;
    const onClickAction = props.onClickAction ? props.onClickAction : (url ? (() => navigate(url)) : null);

    return <Button purpose='primary' data-bs-toggle="modal" data-bs-target={modalName} onClick={onClickAction}>Approve</Button>
}

/**
 * A danger delete button that navigates to './delete' by default.
 */
function DeleteButton(props: {modalName?: string, url?:string, onClickAction?:any}) {
    const modalName = (props.modalName ? props.modalName : "#deleteConfirmationModal")!;
    const navigate = useNavigate();
    const url = (props.url ? props.url : null)!;
    const onClickAction = props.onClickAction ? props.onClickAction : (url ? (() => navigate(url)) : null);
    return <Button purpose='danger' data-bs-toggle="modal" data-bs-target={modalName} onClick={onClickAction}>Delete</Button>
}

/**
 * A link back button that naviagtes to '../'.
 */
function BackButton(props: {url?: string, text?: string}) {
    const url = (props.url ? props.url : "../");
    const text = (props.text ? props.text : "Back");
    const navigate = useNavigate();
    return <Button purpose="link" className="pl-1" onClick={() => {navigate(-1)}}>
        <svg aria-hidden="true"  focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        {text}
    </Button>
}

export default Button;
export { LoginLogoutButton, ApproveButton, RejectButton, EditButton, ViewButton, DeleteButton, BackButton };