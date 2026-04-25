def ejecutar_codigo_python(codigo):
    import subprocess
    import sys
    import tempfile

    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as temp_file:
        temp_file.write(codigo.encode())
        temp_file.flush()
        try:
            result = subprocess.run(
                [sys.executable, temp_file.name],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=10
            )
            return result.stdout + result.stderr
        except subprocess.TimeoutExpired:
            return "Error: El código tardó demasiado en ejecutarse."
        except Exception as e:
            return f"Error al ejecutar el código: {str(e)}" 