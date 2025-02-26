import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";

export const CreateContact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const {store, actions} = useContext(Context);
    const handleSubmit = (event) => {
        event.preventDefault();

        const dataToSend = {name, phone, address, email};
        actions.createContacts()
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Añadir Contacto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Ingrese el nombre" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" placeholder="Ingrese el teléfono" value={phone} onChange={(event)=>{setPhone(event.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" placeholder="Ingrese la dirección" value={address} onChange={(event)=>{setAddress(event.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" placeholder="Ingrese el correo electrónico" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">Guardar Contacto</button>
                    </div>
                </form>
            </div>
        </div>
    )
}