@echo off
setlocal
cd /d "%~dp0"
start "Python Platform Server" cmd /c python server.py
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:8000"
