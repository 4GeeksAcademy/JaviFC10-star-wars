import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        
        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setError("");
        console.log("📩 Datos enviados:", { email, password });
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="card login-card shadow-lg p-4">
                <h3 className="text-center text-neon">🔑 Iniciar Sesión</h3>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-light">Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control input-neon" 
                            placeholder="Tu email..." 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control input-neon" 
                            placeholder="Tu contraseña..." 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn neon-purple">Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
