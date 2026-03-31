import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Message = {
  codigo?: string;
  codigo_a_traducir?: string;
};

export const handler: Handlers<Message> = {
  POST: async (request: Request, ctx: FreshContext<unknown, Message>) => {
    const form = await request.formData();
    const codigo = form.get("codigo")?.toString() || "";

    const response = await fetch("http://localhost:8001/traducir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("/traducir error", response.status, errText);

      return ctx.render({
        codigo,
        codigo_a_traducir: `Error traducir: ${response.status}`,
      });
    }

    const data: { traduccion: string } = await response.json();

    return ctx.render({
      codigo,
      codigo_a_traducir: data.traduccion,
    });
  },

  GET: (_request: Request, ctx: FreshContext<unknown, Message>) => {
    return ctx.render({
      codigo: "",
      codigo_a_traducir: "",
    });
  },
};

export default function Traductor(props: PageProps<Message>) {
  return (
    <div class ="contenedor">
        
    <button type="submit" class="shadow-effect"> Traducir </button>
      <form  method="POST" action="/traductor">
        
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={props.data.codigo || ""}          
        />

        
      </form>

        <div class ="campos-traduccion">
            <input
            type="text"
            class="cobol"
            name="cobol"
            value={props.data.codigo || ""}
            readOnly
          />

          {props.data.codigo_a_traducir && (
            <input
              type="text"
              class="python"
              name="python"
              value={props.data.codigo_a_traducir}
              readOnly
            />
            )}
        </div>
          

    </div>
   
  );
}