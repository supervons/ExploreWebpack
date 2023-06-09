import React, {Suspense} from 'react'
const RemoteApp = React.lazy(() => import("app4/home"));

export default function APP(){
    return <div>
        hello, 123
        <Suspense fallback={"loading..."}>
            <RemoteApp/>
        </Suspense>
    </div>
}
