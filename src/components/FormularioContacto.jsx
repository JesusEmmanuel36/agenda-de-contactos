import React, { useState, useEffect } from "react";

function FormularioContacto({ agregarContacto, editarContacto, contactoEditar, cerrarFormulario }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    if (contactoEditar) {
      setNombre(contactoEditar.nombre);
      setCorreo(contactoEditar.correo);
      setTelefono(contactoEditar.telefono);
      setGenero(contactoEditar.genero);
    }
  }, [contactoEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contacto = {
      nombre,
      correo,
      telefono,
      genero,
    };

    if (contactoEditar) {
      editarContacto({
        ...contacto,
        id: contactoEditar._id, 
      });
    } else {
      agregarContacto(contacto);
    }

    cerrarFormulario();
    setNombre("");
    setCorreo("");
    setTelefono("");
    setGenero("");
  };

  return (
    <div className="formulario-contacto">
      <h2>{contactoEditar ? "Editar Contacto" : "Agregar Contacto"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
          <option value="">Selecciona género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <button type="submit">
          {contactoEditar ? "Guardar" : "Agregar"}
        </button>

        <button type="button" onClick={cerrarFormulario}>Cancelar</button>
      </form>
    </div>
  );
}

export default FormularioContacto;
