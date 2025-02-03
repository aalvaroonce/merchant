'use server'
import { cookies } from "next/headers"

export default async function getWeb(){
    const cookiesStore= cookies()
    const web = cookiesStore.get('web')
    return web.value
}