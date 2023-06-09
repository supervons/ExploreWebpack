import React, {useEffect} from 'react'
import {getProfile} from 'base/utils'
export default function app4(){
    useEffect(()=>{
        getProfile().then(res=>{
            alert('React call:' + JSON.stringify(res))
        })
    }, [])
    return <div>
        hello, react-mfp
    </div>
}
