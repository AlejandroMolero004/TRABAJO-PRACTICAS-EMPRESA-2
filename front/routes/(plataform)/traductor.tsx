import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import TraductorIsland from "../../islands/TraductorIsland.tsx";


export type Message = {
  cobol?: string;
  codigo_a_traducir?: string;
};

export const handler: Handlers<Message> = {
  POST: async (request: Request, ctx: FreshContext<unknown, Message>) => {
    const form = await request.formData();
    const cobol = form.get("cobol")?.toString() || "";
    if (!cobol) {
      return ctx.render({
        cobol,
        codigo_a_traducir: "",
      });
    }
    const response = await fetch("https://trabajo-practicas-empresa-2-production.up.railway.app/traducir", {
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
    console.log(data)
    data.traduccion = data.traduccion .replace(/```python/g, "") // quita ```python
                                      .replace(/```/g, "")       // quita ```
                                      .trim();
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
   
    return <TraductorIsland message={props.data} />;
    
}