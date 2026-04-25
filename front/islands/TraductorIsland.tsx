import { FunctionalComponent } from "preact";
import { Message } from "../routes/(plataform)/traductor.tsx";
import { useRef, useState } from "preact/hooks";
import { connectToMongoDB_conversaciones } from "../bbdd/conexion.ts";
type Props = {
  message: Message; 
};
const ejecutar_python =  () => {};
const TraductorIsland:FunctionalComponent<Props> = ({message}) => {
    const [animarcobol, setAnimarcobol] = useState(false);
    const [animarpython, setAnimarpython] = useState(false);

    const cobolref = useRef<HTMLTextAreaElement>(null);
    const pythonref = useRef<HTMLTextAreaElement>(null);

    const handleClick = (language: "cobol" | "python") => () => {
      if (language === "cobol") {
        setAnimarcobol(true);
        navigator.clipboard.writeText(cobolref.current?.value || "");
      } else {
        setAnimarpython(true);
        navigator.clipboard.writeText(pythonref.current?.value || "");
      }
      setTimeout(() => {
        if (language === "cobol") {
          setAnimarcobol(false);
        } else {
          setAnimarpython(false);
        }
      }, 2000);
    };
    const guardar_conversacion = async () => {
      const cobol = cobolref.current?.value || "";
      const python = pythonref.current?.value || "";
      const user = document.cookie.split("; ").find(row => row.startsWith("username="))?.split("=")[1] || "unknown_user";
      const response = await fetch ("http://localhost:8000/insertar_conversacion",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username: user,
          cobol: cobol,
          python: python
        })
      });
      if (response.ok){
        alert("Conversación guardada");
      }else{
        alert("Error al guardar la conversación");
      }
    }
    return (
         <div class ="contenedor">
       
      <form id="miForm" method="POST" class="form" action="/traductor">
            
      </form>
      <button  form="miForm" type="submit" class="Btn-Container" > 
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
                ref={cobolref}
                class="cobol"
                name="cobol"
                form="miForm"               
                defaultValue={message.cobol || ""}
              />
      </div>

      <div class="div-copiar-cobol">
        <button class={animarcobol ? "animar" : "btn-copiar-cobol"} onClick={handleClick("cobol")}>Copy cobol</button>
      </div>
      <div class = "guardar">
        <button class="btn-guardar" onClick={(_e) => guardar_conversacion()}>Guardar</button>
      </div>
      <div class ="perfil">
        <button class="btn-perfil" onClick={(_e) => globalThis.location.href="/zona_usuario"}>Perfil</button>
      </div>
      <div class="img-python">
        <img onClick={(_e)=>ejecutar_python()} src="python.png" alt="Python Logo" />
      </div>
      <div class="python-container">      
              <textarea
                ref={pythonref}
                class="python"
                readOnly
                value={message.codigo_a_traducir || ""}
              />     
      </div>
      <div class="div-copiar-python">
        <button class={animarpython ? "animar" : "btn-copiar-cobol"} onClick={handleClick("python")}>Copy Python</button>
      </div>
    </div>
    )
    
};


export default TraductorIsland;