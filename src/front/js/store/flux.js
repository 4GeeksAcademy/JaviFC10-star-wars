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
			characters: []
		},
		actions: {
			// CRUD Contacts
			createContacts: async () => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts`;
				const dataToSend = {};
				const options = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText)
					return
				};
				getActions().getContacts();
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
			updateContacts: async () => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts/id`;
				const dataToSend = {};
				const options = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				};
				getActions().getContacts();
			},
			deleteContacts: async () => {
				const uri = `${getStore().baseUrl}/${getStore().user}/contacts/id`;
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				};
				getActions().getContacts();
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
				console.log('Soy characters', data);
				setStore({ characters: data.results })
			},
		}
	};
};

export default getState;
