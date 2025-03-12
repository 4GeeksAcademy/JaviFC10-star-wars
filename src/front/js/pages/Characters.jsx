import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    const handleFavorite = (itemName) => {
        actions.setFavorites(itemName);
    };

    const navigate = useNavigate();

    const handleDetails = (itemUid, itemUrl) => {
        actions.getItemsDetails(itemUrl);
        navigate("/itemdetails");
    };

    return (
        <div className="container mt-4">
            <h1 className="custom-h1 text-center mb-4 text-neon"><strong>Characters</strong></h1>
            <div className="row justify-content-center">
                {store.characters.map((item) => (
                    <div key={item.uid} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                        <div className="card custom-card">
                            <img
                                src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`}
                                className="card-img-top fixed-img"
                                alt={item.name}
                                onError={(e) =>
                                (e.target.src =
                                    "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/big-placeholder.jpg")
                                }
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{item.name}</h5>                        
                                <div className="d-flex justify-content-between">
                                    <button className="btn neon-blue" onClick={() => handleDetails(item.uid, item.url)}>
                                        Ver más
                                    </button>
                                    <button
                                        className={`btn neon-yellow-outline`}
                                        onClick={() => handleFavorite(item.name)}
                                    >
                                        <i className={`fa-heart fa-lg ${store.favorites.includes(item.name) ? "fas text-neon-yellow" : "far"}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
