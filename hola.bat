@echo off

cobc -x -free hola_mundo.cob

if exist hola_mundo.exe (
    hola_mundo.exe
    echo El programa se ejecutó correctamente.
) else (
    echo ERROR: No se pudo crear el archivo hola_mundo.exe
)
