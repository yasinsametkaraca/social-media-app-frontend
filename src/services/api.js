
export const PostWithAuth = (url,body) => {
    return fetch(url,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("tokenKey")},
        body:JSON.stringify(body)
    })
}
export const PostWithoutAuth = (url, body) => {
    return fetch(url,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
    })
}

export const PutWithAuth = (url, body) => {
    return fetch(url,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),
        },
        body : JSON.stringify(body),
    })
}

export const GetWithAuth = (url) => {
    return fetch(url,  {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),
        },
    })
}

export const DeleteWithAuth = (url) => {
    return fetch(url,  {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),
        },
    })

}

