@echo off
echo ==========================================
echo    Hackathon Winner - Dev Launcher
echo ==========================================

echo [1/2] Installing/Verifying dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Starting development server...
echo Press Ctrl+C to stop the server.
echo.
call npm run dev

pause
