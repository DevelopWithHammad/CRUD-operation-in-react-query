import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="">
            <ul className="flex items-center justify-center gap-12">
                <Link to="/">
                    <li className="cursor-pointer">Home</li>
                </Link>
                <Link to="/trending-products">
                    <li className="cursor-pointer">Trending Products</li>
                </Link>
                <Link to="/daily-products">
                    <li className="cursor-pointer">Daily Products</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar
