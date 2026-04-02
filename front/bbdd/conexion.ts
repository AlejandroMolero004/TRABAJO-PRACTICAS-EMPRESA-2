import { MongoClient, Collection, ObjectId } from "npm:mongodb@6.1.0";

export type UsuarioModel = {
  id?: ObjectId;
  username: string;
  password: string;
};

export const connectToMongoDB = async () => {
    const MONGO_URI = Deno.env.get("MONGODB_KEY");

    if (!MONGO_URI) {
    throw new Error("Falta la variable de entorno MONGODB_KEY");
    }

    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db("users_translator");

    const translatorCollection: Collection<UsuarioModel> = db.collection<UsuarioModel>("users");
    return translatorCollection;
};