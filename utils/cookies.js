import { useState } from "react"
import cookie from "universal-cookie"

export const useCookie = ()=>{
    const cookies = new cookie()
    const [cookieValue,setCookieValue] = useState()
    const date = new Date()
    date.setDate(date.getDate()+365)
    const setCookie = (name,value)=>{
        setCookieValue(()=>{
            cookies.set(name,value,{path:'/',expires:date})
            return value})
    }
    const getCookie = (name)=>{
        return cookies.get(name)
    }
    const removeCookie = (name)=>{
        setCookieValue(()=>{
            cookies.remove(name)
            return null})
    }
    return {getCookie,setCookie,removeCookie}
}