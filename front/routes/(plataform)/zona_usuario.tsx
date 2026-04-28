import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { connectToMongoDB_conversaciones, ConversacionModel } from "../../bbdd/conexion.ts";
import Zona_usuario from "../../islands/Zona_usuario.tsx";
import { Message } from "./traductor.tsx";
 export type User = {
    id?: string,
    username: string,
    cobol: string;  
    python: string;
}
export const handler: Handlers = {
    GET: async (request: Request, ctx: FreshContext<unknown,User[]>) => {
          const messagecollection = await connectToMongoDB_conversaciones();
          const cookie = request.headers.get("Cookie") || "";
          const usernamecookie=cookie.split(";").find(c=>c.trim().startsWith("username="));
          const username=usernamecookie?.split("=")[1] || "unknown_user";
          const usersmdel:ConversacionModel[] = await messagecollection.find({username}).toArray()
          const users : User[] = usersmdel.map((usermodel) => ({
            id: usermodel.id?.toString(),
            username: usermodel.username,
            cobol: usermodel.cobol,
            python: usermodel.python
          }));
          return ctx.render(users);
    }
          
}

const Page = (props: PageProps<User[]>) => {
    return (
       <Zona_usuario users={props.data} />
    );
}

export default Page;
