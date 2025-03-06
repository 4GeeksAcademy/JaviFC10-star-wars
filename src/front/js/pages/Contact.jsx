import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getContacts();
    }, []);

    const editContact = (contact) => {
        actions.setCurrentContact(contact);
        navigate('/editcontact');
    };

    const handleDelete = async (id) => {
        await actions.deleteContacts(id);
        actions.getContacts();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Contactos</h1>
            <button className="btn btn-primary mb-3" onClick={() => navigate('/createcontact')}>
                Crear nuevo contacto
            </button>
            <div className="d-flex justify-content-center">
                <ul className="list-group w-100" style={{ maxWidth: '800px' }}>
                    {store.contacts.map((item) => (
                        <li key={item.id} className="list-group-item bg-light bg-gradient mb-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
                            <img 
                                className="rounded mb-2 mb-md-0" 
                                src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`} 
                                style={{ width: '100px', height: '100px' }} 
                                alt="RandomUser" 
                            />
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
};
