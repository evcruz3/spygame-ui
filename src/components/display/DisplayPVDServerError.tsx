import { ApiError } from '../../client';

import {
    DisplayTextInfo,
} from '.';
import { Link } from 'react-router-dom';

function DisplayPVDServerError(props: {error: ApiError}) {
    const error = props.error;
    console.log(error);
    return (
        <>
            <div className="bg-red-400 rounded-lg p-5 mb-5">
                <h2 className="mb-2 text-2xl font-semibold">Error!</h2>
                <ul>
                    <li><DisplayTextInfo label="URL" value={error.url} /></li>
                    <li><DisplayTextInfo label="Status" value={error.status} /></li>
                    <li><DisplayTextInfo label="Status Text" value={error.statusText} /></li>
                    <li><DisplayTextInfo label="Body" value={JSON.stringify(error.body)} /></li>
                    <li><DisplayTextInfo label="Request" value={JSON.stringify(error.request)} /></li>
                    <li><DisplayTextInfo label="Name" value={error.name} /></li>
                </ul>
            </div>
            <Link to="/" replace={true}>Back to Home</Link>
        </>
    );
}

export default DisplayPVDServerError;