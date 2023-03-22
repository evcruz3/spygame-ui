function DisplayInfoLoading() {
    return (
        <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
            <div className="bg-sky-400 p-2  w-4 h-4 rounded-full animate-bounce"></div>
            <div className="bg-sky-600 p-2 w-4 h-4 rounded-full animate-bounce"></div>
            <div className="bg-sky-900 p-2  w-4 h-4 rounded-full animate-bounce"></div>
        </div>
    );
}

export default DisplayInfoLoading;