import Navbar from '@/components/Navbar';
import './globals.css';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'Bildy App',
    description: 'Gestiona tus albaranes',
    keywords: 'tienda, online, ecommerce',
};

export default async function AppLayout({ children }) {

    const cookiesStore = await cookies();
    const user = cookiesStore.get('user')?.value;
    const userRole = user? JSON.parse(user).role: undefined;
    const bizRole = cookiesStore.get('biz')?.value;


    const role = userRole === 'admin'? 'admin': userRole? 'user': bizRole? 'biz': 'guest';

    return (
        <html lang="en">
            <body className="min-h-screen bg-black">
                <Navbar role={role}/>
                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
}
