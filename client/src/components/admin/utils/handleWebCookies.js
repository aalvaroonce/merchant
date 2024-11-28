export default function BizCookies(web){

    cookieStore.set({
        name: 'web',
        value: JSON.stringify(web), 
        path: '/',
    });
    return 
}