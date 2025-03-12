import React, { useContext } from "react";
import { Context } from "../store/appContext";
import starWarsBackUrl from "../../img/star-wars-back.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<p>
				<img src={starWarsBackUrl} className="home-image" alt="Star Wars Background"/>
			</p>
		</div>
	);
};
