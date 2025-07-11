import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./editProfileAdmin.css";

const URIADMIN = "http://localhost:8000/users/3/"; // URL para actualizar datos del admin

const EditAdmin = () => {
  const [password, setPassword] = useState(""); // Contraseña
  const [adress, setAdress] = useState(""); // Dirección
  const [telephone, setTelephone] = useState(""); // Teléfono
  const [email, setEmail] = useState(""); // Email
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const navigate = useNavigate();

  const navigateShop = () => {
    navigate(`/editInventory`); // Redirige a la edición del inventario
  };

  const update = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validaciones
    if (!password || !adress || !telephone || !email) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }
    if (!/^\d{10}$/.test(telephone)) {
      setErrorMessage("El teléfono debe tener exactamente 10 números.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      setErrorMessage("El email debe terminar en '@gmail.com'.");
      return;
    }

    try {
      // Petición para actualizar los datos
      await axios.put(URIADMIN, {
        password: password,
        adress: adress,
        telephone: telephone,
        email: email,
      });
      setSuccessMessage("Perfil actualizado exitosamente. Redirigiendo...");
      setTimeout(() => {
        navigateShop();
      }, 2000); // Redirige después de 2 segundos
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setErrorMessage("Ocurrió un error al actualizar el perfil.");
    }
  };

  return (
    <div className="register-form">
      <h2>Edit Profile</h2>
      <form onSubmit={update}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className={errorMessage && !password ? "input-error" : ""}
        />
        <input
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          type="text"
          name="adress"
          placeholder="Adress"
          className={errorMessage && !adress ? "input-error" : ""}
        />
        <input
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          type="text"
          name="telephone"
          placeholder="Telephone"
          className={errorMessage && !/^\d{10}$/.test(telephone) ? "input-error" : ""}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Email"
          className={errorMessage && !email.endsWith("@gmail.com") ? "input-error" : ""}
        />
        <input type="submit" className="btn-save" value="Edit" />
      </form>

      {/* Mensajes de error y éxito */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default EditAdmin;
