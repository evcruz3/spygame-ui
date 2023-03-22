function AuthLoading() {
    return (
        <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
            <div className="bg-sky-400 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
            <div className="bg-sky-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
            <div className="bg-sky-900 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
        </div>
    );
}

export default AuthLoading;