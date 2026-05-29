import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
        <>
            <nav>
                <Link to="/">Home</Link><br />
                <Link to="/about">About Us</Link><br />
                <Link to="/contact">Contact</Link><br />
                <Link to="/login">Login</Link><br />
            </nav>
        </>
    );
}