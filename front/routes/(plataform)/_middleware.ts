import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";
import { connectToMongoDB, UsuarioModel } from "../../bbdd/conexion.ts";


export const handler:MiddlewareHandler=async(req:Request,ctx:FreshContext<unknown>)=>{
    console.log("middleware");
    const cookie = req.headers.get("Cookie") || "";
    const usernamecookie=cookie.split(";").find(c=>c.trim().startsWith("username="));
    const passwordcookie=cookie.split(";").find(c=>c.trim().startsWith("password="));
    if (usernamecookie && passwordcookie){
        console.log("cookies",usernamecookie,passwordcookie);
        const username=usernamecookie.split("=")[1];
        const password=passwordcookie.split("=")[1];
        console.log("username",username);
        console.log("password",password);
        const trlanslatorCollection = await connectToMongoDB()
        console.log("collection",trlanslatorCollection);
        const datamodel: UsuarioModel | null = await trlanslatorCollection.findOne({username:username,password:password});
        console.log("datamodel",datamodel);
        if (datamodel){
            return await ctx.next();
        }else{
             return new Response(null,
             {
                status:302,
                headers:{
                    location:"/login"
                }
            }
            );
        }
    }else{
        return new Response(null,
             {
                status:302,
                headers:{
                    location:"/login"
                }
            }
            );
    }


}