export default function BizCookies(biz){

    cookieStore.set({
        name: 'biz',
        value: JSON.stringify(biz), 
        path: '/',
    });
    return 
}