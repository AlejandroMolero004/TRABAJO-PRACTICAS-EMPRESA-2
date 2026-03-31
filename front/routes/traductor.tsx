import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Message = {
  cobol?: string;
  codigo_a_traducir?: string;
};

export const handler: Handlers<Message> = {
  POST: async (request: Request, ctx: FreshContext<unknown, Message>) => {
    const form = await request.formData();
    const cobol = form.get("cobol")?.toString() || "";

    const response = await fetch("http://localhost:8001/traducir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo: cobol }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("/traducir error", response.status, errText);

      return ctx.render({
        cobol,
        codigo_a_traducir: `Error traducir: ${response.status}`,
      });
    }
    const data: { traduccion: string } = await response.json();

    return ctx.render({
      cobol,
      codigo_a_traducir: data.traduccion,
    });
  },

  GET: (_request: Request, ctx: FreshContext<unknown, Message>) => {
    return ctx.render({
      cobol: "",
      codigo_a_traducir: "",
    });
  },
};

export default function Traductor(props: PageProps<Message>) {
  return (
    <div class ="contenedor">
           
      <form id="miForm" method="POST" class="form" action="/traductor">
            
      </form>
      <button  form="miForm" type="submit" class="shadow-effect"> Traducir </button>
      <div class="cobol-container">
              <input
                type="text"
                class="cobol"
                name="cobol"
                value={props.data.cobol || ""}
                form="miForm"
              />
      </div>
         
      <div class="python-container">      
            <input
              type="text"
              class="python"
              value={props.data.codigo_a_traducir || ""}
              readOnly
            />        
      </div>
    </div>   
  );
}