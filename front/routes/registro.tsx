import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { connectToMongoDB, UsuarioModel } from "../bbdd/conexion.ts";

export type mensaje_informativo={
    mensaje:string
}
export const handler: Handlers = {
    POST:async (req:Request,ctx:FreshContext<unknown, mensaje_informativo>) => {
        const form = await req.formData();
        const username = form.get("username")?.toString() || "";
        const password = form.get("password")?.toString() || "";
        if (!username || !password) {
            const messaje_informativo:mensaje_informativo={
                mensaje:"Rellena todos los campos"
            }
            return ctx.render(messaje_informativo);
        }
        const trlanslatorCollection = await connectToMongoDB()
        const datamodel: UsuarioModel | null = await trlanslatorCollection.findOne({username:username,password:password});
        if (datamodel){
            const messaje_informativo:mensaje_informativo={
                mensaje:"El usuario ya existe"
            }
            return ctx.render(messaje_informativo);
        }
        else{   
            const trlanslatorCollection = await connectToMongoDB()
            await trlanslatorCollection.insertOne({username:username,password:password});
            return new Response(null,
             {
                status:302,
                headers:{
                    location:"/traductor"                    
                }
            }
            );
        }
    }   
}

const Page = (props:PageProps<mensaje_informativo>) => {
    return (
        <div>
            <form method="POST" class="formulario" action="/registro">
                <label for="username" style="color: white;">Username:</label>
                <input type="text" id="username" name="username" required />
                <label for="password" style="color: white;">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit" class="btn-login">Register</button>                               
            </form>
            {props.data?.mensaje && <p style="color: red;">{props.data.mensaje}</p>}
        </div>
    );

}

export default Page;