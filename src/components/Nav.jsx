import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/">Hjem</NavLink>
            <NavLink to="/favourite">Favoritter</NavLink>
            <NavLink to="/contact">Kontakt</NavLink>
        </nav>
    );
}
