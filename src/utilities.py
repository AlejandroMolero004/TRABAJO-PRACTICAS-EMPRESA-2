from fastapi.templating import Jinja2Templates
templates = Jinja2Templates(directory="templates")

def limpiar_prompt(prompt):
    if not prompt:
        return ""

    # convertir string escapado a texto real
    if isinstance(prompt, str):
        prompt = prompt.encode().decode("unicode_escape")

    # convertir a lista de líneas
    if isinstance(prompt, list):
        lineas = prompt
    else:
        lineas = str(prompt).strip().splitlines()

    # eliminar bloques ``` si existen
    if "```" in lineas:
        idx = lineas.index("```")
        contenido = lineas[1:idx] if idx > 0 else []
    else:
        contenido = lineas

    return "\n".join(contenido)