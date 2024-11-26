'use server'
import { cookies } from "next/headers"

async function checkWebExists(){
    const cookiesStore= cookies()
    const web = cookiesStore.get('web')
    const validation= web ? true: false
    return validation
}

export default checkWebExists