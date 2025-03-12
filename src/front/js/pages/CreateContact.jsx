import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const CreateContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newContact = { name, phone, address, email };
        const success = await actions.createContacts(newContact);

        if (success) {
            navigate('/contact');
        } else {
            console.error("Error al añadir contacto.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="edit-contact-container shadow-neon p-4">
                <h3 className="text-center text-neon mb-4">Añadir Contacto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese el nombre" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese el teléfono" value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese la dirección" value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control input-neon" placeholder="Ingrese el correo electrónico" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn neon-red" onClick={() => navigate('/contact')}>Cancelar</button>
                        <button type="submit" className="btn neon-green">Guardar Contacto</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
