'use server'
import { cookies } from "next/headers"

export default async function getCookies(){
    const cookiesStore= cookies()
    const biz = cookiesStore.get('biz')
    const token = cookiesStore.get('token')
    return { biz: biz?.value, token: token?.value };
}