'use server'
import { cookies } from "next/headers"

export default async function getBiz(){
    const cookiesStore= cookies()
    const biz = cookiesStore.get('biz')
    return biz.value
}