import React from "react"

export function fetchData (path: string, body, auth){
    // const authHeader = new Headers()
    // if(auth !== null || auth !== undefined){
    //     authHeader.append("Authorization", `Bearer ${auth}`)
    // }

    // authHeader.append("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}${checkSlash(path)}`, {
        method: 'GET',
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

/**
 * Format the string to be corrected used in the fetchData function
 * @param path String Path
 * @returns A path with a slash in the begining
 */
function checkSlash(path: string){
    return path.substring(0,1) === "/" ? path : `/${path}`
}