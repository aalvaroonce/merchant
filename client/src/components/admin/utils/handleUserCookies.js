export default function UserCookies(user){

    cookieStore.set({
        name: 'users',
        value: JSON.stringify(user), 
        path: '/',
    });
    return 
}