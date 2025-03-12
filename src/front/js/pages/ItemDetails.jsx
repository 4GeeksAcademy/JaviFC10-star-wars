import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ItemDetails = () => {
    const { store } = useContext(Context);

    return (
        <div className="container mt-5">
            <div className="card custom-card-detail shadow-lg">
                <div className="card-body text-white">
                    <h1 className="text-center text-neon">{store.currentItemDetails.name}</h1>
                    <ul className="list-group custom-list">
                        {Object.entries(store.currentItemDetails).map(([currentKey, currentValue]) => {
                            return currentKey !== 'created' && currentKey !== 'edited' && currentKey !== 'name' && currentKey !== 'url' && currentKey !== 'uid' ? (
                                <li className="list-group-item custom-list-item" key={currentKey}>
                                    <strong className="text-uppercase text-neon-detail">{currentKey}:</strong> {currentValue}
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
