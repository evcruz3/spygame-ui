type ScaffoldProps = {
    header: string | React.ReactNode | React.ReactNode[];
    body: React.ReactNode | React.ReactNode[];
    footer?: React.ReactNode | React.ReactNode[];
    floatingActionButton?: React.ReactNode | React.ReactNode[];
}

function Scaffold({header, body, footer, floatingActionButton}: ScaffoldProps) {

    const headerElement = <>{header}</>
    return(
        <div className='w-full flex-col justify-between mb-6'>
            <div className="m-auto">
                <div className="py-2"><h1 className="text-xl font-semibold text-gray-600">{headerElement}</h1></div>
                {body}
            </div>
            <div className="m-auto">
                {footer!=null ? 
                    <div className="mt-2">{footer}</div>
                 : <></>}
            </div>
            {floatingActionButton != null ? 
                    <div className="fixed bottom-16 right-10 ...">
                    <div className="mt-2">{floatingActionButton}</div>
                </div>
                 : <></>
        }
        </div>
    )
}

export default Scaffold;