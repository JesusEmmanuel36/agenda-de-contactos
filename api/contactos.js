import { clientPromise } from "../db.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("AGENDA");
  const collection = db.collection("CONTACTOS");

  try {
    switch (req.method) {
      // GET obtener contactos
      case "GET":
        const contactos = await collection.find({}).toArray();
        return res.status(200).json(contactos);

      // POST crear contacto
      case "POST":
        const nuevo = req.body;

        if (!nuevo.nombre || !nuevo.correo || !nuevo.telefono || !nuevo.genero) {
          return res.status(400).json({ error: "Faltan datos del contacto" });
        }

        const resultado = await collection.insertOne(nuevo);

        return res.status(201).json({
          _id: resultado.insertedId,
          ...nuevo,
        });

      // PUT editar contacto
      case "PUT":
        const { id, ...datosActualizados } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Falta el ID del contacto" });
        }

        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: datosActualizados }
        );

        return res.status(200).json({
          message: "Contacto actualizado",
        });

      // DELETE eliminar contacto
      case "DELETE":
        const idEliminar = req.query.id;

        if (!idEliminar) {
          return res.status(400).json({ error: "Debe enviar el ID en la URL ?id=" });
        }

        await collection.deleteOne({ _id: new ObjectId(idEliminar) });

        return res.status(200).json({ message: "Contacto eliminado" });
 
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Método ${req.method} no permitido`);
    }
  } catch (error) {
    console.error("❌ Error en API:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
