import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsLogo from "../../img/star-wars-logo.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const handleFavoriteClick = (favoriteName) => {
        const favoriteItem = [...store.characters, ...store.starships, ...store.planets].find(item => item.name === favoriteName);

        if (favoriteItem) {
            actions.getItemsDetails(favoriteItem.url);
            navigate("/itemdetails");
        }
    };
    const handleLogout = () => {
		actions.logout();
		navigate("/login");
	};
    
    return (
        <nav className="navbar navbar-expand-md custom-navbar">
            <div className="container">
                <Link to="/" className="navbar-brand text-light">
                    <img src={starWarsLogo} alt="Star Wars Logo" className="logo-navbar" />
                </Link>
                <button className="navbar-toggler border-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link to="/characters" className="nav-link">
                                <button className={`btn neon-blue ${location.pathname === "/characters" ? "active-neon" : ""}`}>Characters</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/starships" className="nav-link">
                                <button className={`btn neon-blue ${location.pathname === "/starships" ? "active-neon" : ""}`}>Starships</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/planets" className="nav-link">
                                <button className={`btn neon-blue ${location.pathname === "/planets" ? "active-neon" : ""}`}>Planets</button>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className={`btn neon-purple dropdown-toggle ${location.pathname === "/favorites" ? "active-neon" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Favorites
                                <span className="badge neon-purple-badge">{store.favorites.length}</span>
                            </button>
                            <ul className="dropdown-menu neon-purple-dropdown">
                                {store.favorites.length > 0 ? (
                                    store.favorites.map((favoriteItem, index) => (
                                        <li key={index}>
                                            <span className="dropdown-item clickable-favorite" onClick={() => handleFavoriteClick(favoriteItem)}>
                                                {favoriteItem}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li><span className="dropdown-item">No favorites yet</span></li>
                                )}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                <button className={`btn neon-green ${location.pathname === "/contact" ? "active-neon" : ""}`}>Contacts</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                        {store.token ? (
						<button onClick={handleLogout} className="btn neon-red">Logout</button>
					    ) : (
                            <Link to="/login" className="nav-link">
                                <button className={`btn neon-red ${location.pathname === "/login" ? "active-neon" : ""}`}>Login</button>
                            </Link>)}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
