import React from "react";

function Contacto({ contacto, borrarContacto, setContactoEditar }) {
  return (
    <tr>
      <td>{contacto.nombre}</td>
      <td>{contacto.correo}</td>
      <td>{contacto.telefono}</td>
      <td>{contacto.genero}</td>
      <td>
        <button onClick={() => setContactoEditar(contacto)}>Editar</button>
        <button onClick={() => borrarContacto(contacto._id)}>Borrar</button>
      </td>
    </tr>
  );
}

export default Contacto;
