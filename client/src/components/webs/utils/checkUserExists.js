'use server'
import { cookies } from "next/headers"

export default async function handleAuth(){
    const cookiesStore= cookies()
    const user = cookiesStore.get('user')
    const token= cookiesStore.get('token')
    const validation= user || token? true: false
    return validation
}