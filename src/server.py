
from fastapi import FastAPI, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from src.ejecutar_bat import llamar_bat
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from src.tratarprompt import traducir_codigo, tratarprompt
from src.utilities import limpiar_prompt
from src.tipos import codigo_a_traducir

# ejecutar el servidor:  python -m uvicorn src.server:app --reload --port 8001
app = FastAPI()

# esto es para el css 
app.mount("/static", StaticFiles(directory="templates/static"), name="styles")

# esto es para el html templates
templates = Jinja2Templates(directory="templates")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

global resultado
resultado = None

resultado = llamar_bat()

url = "http://localhost:8001/"

print(f"El servidor está corriendo en {url}")

@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return templates.TemplateResponse("index.html", {"request": request, "resultado": "Has superado el límite de solicitudes. Por favor, inténtalo de nuevo más tarde."}, status_code=429)

@app.get("/")
def home():
    if resultado:      
        return templates.TemplateResponse("index.html", {"request": {}, "resultado": resultado.stdout.strip().splitlines()[0]})
    else:
        return {"message": "No se ha ejecutado el bat todavía"}

@app.get("/openIA")
def openIA():
    prompt = tratarprompt()
    resultado_str = limpiar_prompt(prompt)
    return {"message": resultado_str}

@app.post("/traducir")
@limiter.limit("5/minute")
def traducir(request: Request, data: codigo_a_traducir):
    print(data.codigo)
    resultado_traduccion = traducir_codigo(data.codigo)
    return {"traduccion": resultado_traduccion}
    