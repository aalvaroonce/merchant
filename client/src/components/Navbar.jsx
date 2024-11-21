import Link from 'next/link'
export default function Navbar() {
    return (
        <nav className='bg-slate-400 mb-4 flex justify-between items-center px-20 p-3 font-bold text-black'>

            <Link href="/">
                Home
            </Link>
            <ul>
                <li>
                    <Link href="/login" >
                        Iniciar Sesión
                    </Link>
                </li>
                <li>
                    <Link href="/contact/book" >
                        Book
                    </Link>
                </li>
                <li>
                    <Link href="/posts" >
                        Posts
                    </Link>
                </li>
            </ul>
        </nav>
    )
}