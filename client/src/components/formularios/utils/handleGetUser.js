'use server'
import { cookies } from "next/headers"

export default async function getUser(){
    const cookiesStore= cookies()
    const user = cookiesStore.get('user')
    if(JSON.parse(user.value).role === 'admin'){
        const users = cookiesStore.get('users')
        return users.value
    }
    
    return user.value
}