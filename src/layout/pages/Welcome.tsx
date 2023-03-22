import { useAuth } from "react-oidc-context";

function Welcome() {
    const auth = useAuth();
    return (
        <>
            <p>Welcome to the Philippine Virome Database!</p>        
            <br />
            User: <pre>{JSON.stringify(auth.user, null, '\t')}</pre>
        </>
);
}

export default Welcome;

