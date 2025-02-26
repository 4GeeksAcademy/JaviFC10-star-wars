import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const CardsList = () => {
    const {store, actions} = useContext(Context)


        return (
            <ul>
                {store.characters.map((item) => <li key={item.uid
                }>{item.name}</li>)}
            </ul>
        )
}