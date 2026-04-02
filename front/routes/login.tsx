import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler:Handlers = {
    POST: async (request: Request, ctx: FreshContext) => {
        const form = await request.formData();
        const username = form.get("username")?.toString() || "";
        const password = form.get("password")?.toString() || "";
        if(username && password){
            console.log("entro",username,password);
            const headers = new Headers();
            // cuand salga la cookie poner esto: headers.append("Set-Cookie", `username=${username}; Path=/; HttpOnly`);
            headers.append("Set-Cookie", `username=${username}; Path=/;`);
            headers.append("Set-Cookie", `password=${password}; Path=/;`);
            headers.set("Location", "/traductor");
            return new Response(null, {
                status: 302,
                headers,
            });
        }else{
            return ctx.render();
            
        }
    },
    GET: (_request: Request, ctx: FreshContext) => {
        return ctx.render();
    },
}

export default function Login() {
    return (
        
            <form method="POST" class="formulario" action="/login">
                <label for="username" style="color: white;">Username:</label>
                <input type="text" id="username" name="username" required />
                <label for="password" style="color: white;">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit" class="btn-login">Login</button>                               
            </form>
        
    );
}