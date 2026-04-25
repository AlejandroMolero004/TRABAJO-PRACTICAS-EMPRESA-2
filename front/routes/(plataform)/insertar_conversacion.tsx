import { FreshContext, Handlers } from "$fresh/server.ts";
import { connectToMongoDB_conversaciones } from "../../bbdd/conexion.ts";

export const handler: Handlers= {
    POST: async (request: Request, _ctx: FreshContext<unknown>) => {
        const body = await request.json();
        const {username, cobol, python} = body;
        console.log("Recibido en /insertar_conversacion", {username, cobol, python});
        const trlanslatorCollection = await connectToMongoDB_conversaciones();
        await trlanslatorCollection.insertOne({
            username,
            cobol,
            python
          });
          return new Response("Conversación guardada", { status: 200 });          
    }
}
