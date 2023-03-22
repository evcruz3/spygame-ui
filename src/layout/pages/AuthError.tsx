import { useAuth } from "react-oidc-context";

function AuthError() {
    const auth = useAuth();
    return (
        <div className="bg-white space-x-2 p-5 rounded-md justify-center items-center animate-pulse">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-500 text-4xl font-semibold inline-block my-auto" >Oops...</h1>            
            <div className="font-mono">{auth.error?.message}!</div>
        </div>
    );
}

export default AuthError;