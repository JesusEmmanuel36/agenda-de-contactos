import React, { useState, useEffect } from "react";
import Contacto from "./components/Contacto";
import FormularioContacto from "./components/FormularioContacto";
import "./styles.css";

function App() {
  const [contactos, setContactos] = useState([]);
  const [contactoEditar, setContactoEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  const API = "/api/contactos"; // Vercel route

  // =============================
  // CARGAR CONTACTOS (GET)
  // =============================
  const cargarContactos = async () => {
    setCargando(true);
    const res = await fetch(API);
    const data = await res.json();
    setContactos(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  // =============================
  // AGREGAR CONTACTO (POST)
  // =============================
  const agregarContacto = async (contacto) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacto),
    });

    const nuevo = await res.json();
    setContactos([...contactos, nuevo]);
  };

  // =============================
  // EDITAR CONTACTO (PUT)
  // =============================
  const editarContacto = async (contactoActualizado) => {
    await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactoActualizado),
    });

    setContactos(
      contactos.map((c) =>
        c._id === contactoActualizado.id ? { ...c, ...contactoActualizado } : c
      )
    );
  };

  // =============================
  // BORRAR CONTACTO (DELETE)
  // =============================
  const borrarContacto = async (id) => {
    await fetch(`${API}?id=${id}`, {
      method: "DELETE",
    });

    setContactos(contactos.filter((c) => c._id !== id));
  };

  const abrirFormulario = () => {
    setContactoEditar(null);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setContactoEditar(null);
    setMostrarFormulario(false);
  };

  return (
    <div className="App">
      <h1>Agenda de Contactos</h1>

      <div className="boton-agregar-container">
        <button className="boton-agregar" onClick={abrirFormulario}>
          Agregar Contacto
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioContacto
          agregarContacto={agregarContacto}
          editarContacto={editarContacto}
          contactoEditar={contactoEditar}
          cerrarFormulario={cerrarFormulario}
        />
      )}

      {cargando ? (
        <p>Cargando contactos...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {contactos.map((contacto) => (
              <Contacto
                key={contacto._id}
                contacto={contacto}
                borrarContacto={borrarContacto}
                setContactoEditar={(c) => {
                  setContactoEditar(c);
                  setMostrarFormulario(true);
                }}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
