from xml.parsers.expat import model
import os 
from click import prompt
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()  # carga el .env
GOOGLE_API_KEY=  os.getenv("GOOGLE_API_KEY")
# esta primera funcion la hice paraq que leyera los .cbl que tengo en local
def tratarprompt(codigo):
    global respuesta_modelo
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    

    with open("C:\\Users\\34684\\Documents\\TRABAJO-PRACTICAS-EMPRESA-2\\hola_mundo.cob", "r", encoding="utf-8") as f:
        cobol_code = f.read()

    model = genai.GenerativeModel("gemini-3-flash-preview")

    prompt = f"""
   Eres un experto en modernización de código.

Traduce el archivo COBOL a Python.

Debes generar UNA SOLA versión final en Python, combinando:
- fidelidad funcional al comportamiento original del COBOL
- estilo moderno, limpio y eficiente en Python

No generes dos versiones.
No incluyas una versión “fiel” separada y otra “moderna” separada.
No añadas explicaciones, comentarios, análisis, notas ni texto fuera del código.
Devuelve únicamente un bloque markdown con código Python.

Formato obligatorio de salida:
```python
# código Python completo aquí

    {codigo}
    """
    response = model.generate_content(prompt)
    return response.text

# esta funcion ya si que se encarga de tratar el codigo que se le pase
def traducir_codigo(codigo):
    global respuesta_modelo
    model = genai.GenerativeModel("gemini-1.5-flash")
    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel("gemini-3-flash-preview")

    prompt = f"""
    Eres un experto en modernización de código.
    Traduce este archivo COBOL a Python sin explicaciones.
    Aparte haz una traducción fiel al codigo origanal de COBOL 
    analiza el contexto del codigo y haz una traducción a Python 
    que sea mas moderna y eficiente.
    Traduce este código COBOL a Python sin explicaciones.
    Devuelve solo el código en markdown.
    {codigo}
    """
    response = model.generate_content(prompt)
    return response.text
   