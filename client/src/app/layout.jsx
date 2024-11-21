import Navbar from '@/components/Navbar'
import './globals.css'
export const metadata = {
    title: 'Bildy App',
    description: 'Gestiona tus albaranes',
    keywords: "tienda, online, ecommerce"
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}