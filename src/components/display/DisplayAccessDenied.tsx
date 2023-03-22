/**
 * 
 * @prop required_role  the server role that the user is required to have active. 
 * @returns an HTML object displaying an 'Access Denied' message.
 */
 function DisplayAccessDenied(props: {required_role?: string | string[], reason?:string, action?:string}) {
    const required_role = typeof(props.required_role) == "string" ?
        [props.required_role] :
        props.required_role
    const roles_list = required_role ? required_role.map((role: string) => {return <li>{role}</li>}) : "";
    const reason = props.reason ? props.reason : "Only the following roles are allowed access to this module:";
    const action = props.action ? props.action : "Please switch to any of the correct roles or request access from an administrator.";
    return <>
        <div className="bg-slate-400 rounded-lg p-5 mb-5">
            <h2 className="mb-2 text-2xl font-semibold">Access Denied!</h2>
            <h3>{reason}</h3>
            <h3><ul><b>{roles_list}</b></ul></h3>
            <br />
            <h3>{action}</h3>
        </div>
    </>
}

export default DisplayAccessDenied;