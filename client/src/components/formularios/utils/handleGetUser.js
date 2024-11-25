'use server'
import { cookies } from "next/headers"

export default async function getUser(){
    const cookiesStore= cookies()
    const user = cookiesStore.get('user')
    return user.value
}