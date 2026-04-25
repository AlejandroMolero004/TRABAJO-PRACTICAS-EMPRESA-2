import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { connectToMongoDB_conversaciones, ConversacionModel } from "../../bbdd/conexion.ts";
import { Message } from "./traductor.tsx";
 type User = {
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
        <div>
            <h1>Zona de Usuario</h1>
            <h2 style={{ color: 'white' }}>Conversaciones guardadas</h2>
            <ul>
                {props.data.map((user) => (
                    <li key={user.id}>
                        <strong style={{ color: 'white' }}>{user.username}</strong><br />
                        <pre>{user.cobol}</pre>
                        <pre>{user.python}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Page;
