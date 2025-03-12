const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			baseUrl: 'https://playground.4geeks.com/contact/agendas',
			starWarsBaseUrl: 'https://www.swapi.tech/api',
			user: 'agenda-javi',
			contacts: [],
			currentContact: {},
			characters: [],
			starships: [],
			planets: [],
			favorites: [],
			currentItemDetails: {}
		},
		actions: {
			// CRUD Contacts
			createContacts: async (newContact) => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts`;
				const options = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newContact) // Enviar los datos correctos
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText)
					return false;
				};
				console.log('Contacto añadido correctamente')
				await getActions().getContacts();
				return true
			},
			getContacts: async () => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ contacts: data.contacts })
			},
			updateContacts: async (id, updatedContact) => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts/${id}`;
				const options = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedContact)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return false;
				};
				await getActions().getContacts();
				return true;
			},
			deleteContacts: async (id) => { 
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts/${id}`;
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return false;
				}
				await getActions().getContacts();
				return true;
			},
			

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getCharacters: async () => {
				const uri = `${getStore().starWarsBaseUrl}/people`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ characters: data.results })
			},

			getStarShips: async () => {
				const uri = `${getStore().starWarsBaseUrl}/starships`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ starships: data.results })
			},

			getPlanets: async () => {
				const uri = `${getStore().starWarsBaseUrl}/planets`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({ planets: data.results })
			},

			setFavorites: (value) => {
				if (getStore().favorites.includes(value)) {
					setStore({ favorites: getStore().favorites.filter((item) => item != value) })
				} else {
					setStore({ favorites: [...getStore().favorites, value] })
				}
			},

			getItemsDetails: async (uri) => {
                const options = { method: 'GET'}
                const response = await fetch( uri, options)
                if (!response.ok) {
                    console.log("ERROR: ", response.status, response.statusText)
                    return
                }
                const data = await response.json()
                setStore({currentItemDetails: data.result.properties})
            },

			// Funciones vistas en clase
			setCurrentContact: (contact) => { setStore({ currentContact: contact }) }
		}
	};
};

export default getState;
