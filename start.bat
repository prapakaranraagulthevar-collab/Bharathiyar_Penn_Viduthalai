@echo off
title Bharathiyar Penn Viduthalai - Women Liberation & Safety Portal
color 0E

echo =====================================================================
echo    BHARATHIYAR'S VISION ON WOMEN'S LIBERATION & SAFETY HUB
echo    மகாகவி பாரதியாரின் புதுமைப் பெண் & மகளிர் பாதுகாப்பு தளம்
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/3] Detecting Python environment...
set "PY_EXE="
if exist "C:\Users\Syed\AppData\Local\Programs\Python\Python314\python.exe" (
    set "PY_EXE=C:\Users\Syed\AppData\Local\Programs\Python\Python314\python.exe"
) else (
    set "PY_EXE=python"
)

echo [2/3] Launching browser at http://127.0.0.1:8080 ...
start "" "http://127.0.0.1:8080"

echo [3/3] Running local server on port 8080...
echo.
echo =====================================================================
echo    SERVER IS ACTIVE!
echo    URL: http://127.0.0.1:8080
echo    Press Ctrl+C to stop the server anytime.
echo =====================================================================
echo.

"%PY_EXE%" -m http.server 8080 --bind 127.0.0.1

if %errorlevel% neq 0 (
    echo.
    echo Port 8080 was busy or Python error occurred. Opening index.html directly...
    start "" "index.html"
)

pause
