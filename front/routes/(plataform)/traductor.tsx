import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Message = {
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
  return (
    <div class ="contenedor">
       
      <form id="miForm" method="POST" class="form" action="/traductor">
            
      </form>
      <button  form="miForm" type="submit" class="Btn-Container"> 
          <span class="text">let's go!</span>
          <span class="icon-Container">
          <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                
                xmlns="http://www.w3.org/2000/svg"
          >
                <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
          </svg>
          </span>
        
        
      </button>

      <div class="img-cobol">
        <img src="cobol2.png" alt="Cobol Logo" />
      </div>
      
      <div class="cobol-container">
              <textarea
                class="cobol"
                name="cobol"
                form="miForm"
                defaultValue={props.data.cobol || ""}
              />
      </div>
      <div class="img-python">
        <img src="python.png" alt="Python Logo" />
      </div>
      <div class="python-container">      
              <textarea
                class="python"
                readOnly
                value={props.data.codigo_a_traducir || ""}
              />     
      </div>
    </div>   
  );
}