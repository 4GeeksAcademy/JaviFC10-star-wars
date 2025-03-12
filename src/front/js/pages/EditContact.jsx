import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const edited = store.currentContact;
    const [name, setName] = useState(edited.name);
    const [phone, setPhone] = useState(edited.phone);
    const [address, setAddress] = useState(edited.address);
    const [mail, setMail] = useState(edited.mail);
    const navigate = useNavigate();

    useEffect(() => {
        if (edited) {
            setName(edited.name || "");
            setPhone(edited.phone || "");
            setAddress(edited.address || "");
            setMail(edited.mail || "");
        }
    }, [edited]);

    const handleUpdate = async () => {
        const updatedContact = { name, phone, address, mail };

        const success = await actions.updateContacts(edited.id, updatedContact);

        if (success) {
            navigate('/contact');
        } else {
            console.error("No se pudo actualizar el contacto.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="edit-contact-container shadow-neon p-4">
                <h3 className="text-center text-neon mb-4">Editar Contacto</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese el nuevo nombre" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese el nuevo teléfono" value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control input-neon" placeholder="Ingrese la nueva dirección" value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control input-neon" placeholder="Ingrese el nuevo correo electrónico" value={mail} onChange={(event) => setMail(event.target.value)} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn neon-red" onClick={() => { navigate('/contact') }}>Cancelar</button>
                        <button type="button" className="btn neon-green" onClick={handleUpdate}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
