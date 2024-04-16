import { Link } from "react-router-dom";

type Props = {
    setLogout: (user: string | null) => void;
};

const Navbar = ({ setLogout }: Props) => {
    const logOut = () => {
        setLogout(null);
        sessionStorage.clear();
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        Home
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    to="/admin"
                                    className="nav-link active"
                                    aria-current="page"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/add" className="nav-link">
                                    Add Product
                                </Link>
                            </li>
                        </ul>
                        <div className="ms-auto">
                            <Link
                                to="/login"
                                className="btn btn-info text-light fw-medium me-2"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-info text-bg-light fw-medium me-2"
                            >
                                Register
                            </Link>
                            <button
                                onClick={logOut}
                                className="btn btn-info text-bg-light fw-medium me-2"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
