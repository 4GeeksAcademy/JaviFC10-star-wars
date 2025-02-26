import React, { useState } from "react";

export const EditContact = ({ contact, setSelectedContact }) => {
//     const [updatedContact, setUpdatedContact] = useState({ ...contact });

//     const handleUpdate = async () => {
//         const uri = `https://playground.4geeks.com/contact/agendas/javi/contacts/${contact.id}`;
//         const options = {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedContact)
//         };

//         const response = await fetch(uri, options);
//         if (!response.ok) {
//             console.log('Error:', response.status, response.statusText);
//             return;
//         }
//         setSelectedContact(null);
//     };

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Editar Contacto</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Ingrese el nuevo nombre" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" placeholder="Ingrese el nuevo teléfono" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" className="form-control" placeholder="Ingrese la nueva dirección" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" placeholder="Ingrese el nuevo correo electrónico" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>

    );
};


