from xml.parsers.expat import model

from click import prompt
import google.generativeai as genai
GEMINI_API_KEY="AIzaSyDnU-fiAeQXlcQJm4hRyVaG0Kv4Xc0YV04"
# esta primera funcion la hice paraq que leyera los .cbl que tengo en local
def tratarprompt():
    global respuesta_modelo
    model = genai.GenerativeModel("gemini-1.5-flash")
    genai.configure(api_key=GEMINI_API_KEY)

    with open("C:\\Users\\34684\\Documents\\TRABAJO-PRACTICAS-EMPRESA-2\\hola_mundo.cob", "r", encoding="utf-8") as f:
        cobol_code = f.read()

    model = genai.GenerativeModel("gemini-3-flash-preview")

    prompt = f"""
    Eres un experto en modernización de código.
    Traduce este archivo COBOL a Python sin explicaciones.
    Devuelve solo el código en markdown.

    {cobol_code}
    """
    response = model.generate_content(prompt)
    return response.text

# esta funcion ya si que se encarga de tratar el codigo que se le pase
def traducir_codigo(codigo):
    global respuesta_modelo
    model = genai.GenerativeModel("gemini-1.5-flash")
    genai.configure(api_key=GEMINI_API_KEY)

    model = genai.GenerativeModel("gemini-3-flash-preview")

    prompt = f"""
    Eres un experto en modernización de código.
    Traduce este código COBOL a Python sin explicaciones.
    Devuelve solo el código en markdown.

    {codigo}
    """
    response = model.generate_content(prompt)
    return response.text
   