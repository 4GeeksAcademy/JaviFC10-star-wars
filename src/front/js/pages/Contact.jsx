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
            <h1 className="custom-h1 text-center mb-4 text-neon"><strong>Contacts</strong></h1>   
            <div className="text-center mb-4">
                <button className="btn neon-blue" onClick={() => navigate('/createcontact')}>
                    Crear nuevo contacto
                </button>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    {store.contacts.map((item) => (
                        <div key={item.id} className="contact-block shadow-lg p-3 mb-3 d-flex flex-row align-items-center">
                            <div className="col-auto">
                                <img 
                                    src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`} 
                                    className="rounded-circle border border-primary shadow contact-img"
                                    alt="RandomUser" 
                                />
                            </div>

                            <div className="col ms-3">
                                <h5 className="mb-1">{item.name}</h5>
                                <p className="mb-1">
                                    <i className="fa fa-phone me-2"></i> {item.phone} <br />
                                    <i className="fa fa-location-dot me-2"></i> {item.address} <br />
                                    <i className="fa fa-envelope me-2"></i> {item.email}
                                </p>
                            </div>

                            <div className="col-auto d-flex flex-column gap-2">
                                <button className="btn neon-yellow btn-sm" onClick={() => editContact(item)}>
                                    <i className="fa fa-edit"></i> Editar
                                </button>
                                <button className="btn neon-red btn-sm" onClick={() => handleDelete(item.id)}>
                                    <i className="fa fa-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
