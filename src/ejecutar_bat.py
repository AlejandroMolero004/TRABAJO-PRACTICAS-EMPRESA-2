import subprocess
def llamar_bat():
    global resultado

    ruta_bat = r'C:\Users\34684\Documents\TRABAJO-PRACTICAS-EMPRESA-2\hola.bat'

    try:
        resultado = subprocess.run(
            ["cmd", "/c", ruta_bat],
            capture_output=True,
            text=True
        )
        return resultado

    except subprocess.CalledProcessError as e:
        resultado = e
        return resultado