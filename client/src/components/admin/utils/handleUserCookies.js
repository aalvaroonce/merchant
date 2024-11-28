export default function UserCookies(user){

    cookieStore.set({
        name: 'user',
        value: JSON.stringify(user), 
        path: '/',
    });
    return 
}