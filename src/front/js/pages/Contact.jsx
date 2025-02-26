import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const [listContact, setListContact] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newContact, setNewContact] = useState({ name: "", phone: "", address: "", email: "" });
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const handleDelete = (id) => {};
    const editContact = (id) => {};
    const handleAddContact = () => {};

    // const handleDelete = async (id) => {
    //     const uri = `https://playground.4geeks.com/contact/agendas/javi/contacts/${id}`;
    //     const options = { method: 'DELETE' };
    //     const response = await fetch(uri, options);
    //     if (!response.ok) {
    //         console.log('Error: ', response.status, response.statusText);
    //         return;
    //     }
    //     getContacts();
    // }

    // const editContact = (contact) => {
    //     const newName = prompt("Ingrese el nuevo nombre", contact.name);
    //     const newPhone = prompt("Ingrese el nuevo teléfono", contact.phone);
    //     const newAddress = prompt("Ingrese la nueva dirección", contact.address);
    //     const newEmail = prompt("Ingrese el nuevo correo", contact.email);

    //     if (newName && newPhone && newAddress && newEmail) {
    //         const updatedContact = { ...contact, name: newName, phone: newPhone, address: newAddress, email: newEmail };
    //         const uri = `https://playground.4geeks.com/contact/agendas/javi/contacts/${contact.id}`;
    //         const options = {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updatedContact)
    //         };

    //         fetch(uri, options)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     console.log('Error:', response.status, response.statusText);
    //                     return;
    //                 }
    //                 getContacts();
    //             })
    //             .catch(error => console.log('Fetch error:', error));
    //     }
    // }

    // const handleAddContact = async () => {
    //     if (!newContact.name || !newContact.phone || !newContact.address || !newContact.email) {
    //         alert("Todos los campos son obligatorios.");
    //         return;
    //     }

    //     const contactToAdd = {
    //         ...newContact,
    //         agenda_slug: "javi"
    //     };

    //     const uri = 'https://playground.4geeks.com/contact/agendas/javi/contacts';
    //     const options = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(contactToAdd)
    //     };

    //     const response = await fetch(uri, options);
    //     if (!response.ok) {
    //         console.log('Error:', response.status, response.statusText);
    //         return;
    //     }


    //     setNewContact({ name: "", phone: "", address: "", email: "" });

    //     setShowForm(false);

    //     getContacts();
    // };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Contactos</h1>
            <button className="btn btn-primary" onClick={()=>{navigate('/createcontact')}}>Crear nuevo contacto</button>
            <div className="d-flex justify-content-center">
                <ul className="list-group w-100" style={{ maxWidth: '800px' }}>
                    {store.contacts.map((item) => (
                        <li key={item.id} className="list-group-item bg-light bg-gradient mb-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
                            <img className="rounded mb-2 mb-md-0" src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg} style={{ width: '100px', height: '100px' }`} alt="RandomUser" />
                            <div className="card-body text-center text-md-start">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">
                                    <i className="fa fa-phone"></i> {item.phone}<br />
                                    <i className="fa fa-location-dot"></i> {item.address}<br />
                                    <i className="fa fa-envelope"></i> {item.email}
                                </p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-warning text-white me-2" onClick={() => editContact(item)}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}