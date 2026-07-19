@echo off
title Krishna Govind Seva Sansthan NGO - Goushala App Launcher
cls
echo =======================================================================
echo    Krishna Govind Seva Sansthan NGO - GOUSHALA APP LAUNCHER (WINDOWS)
echo =======================================================================
echo.
echo Preparing launch sequences...
echo.

:: Check backend node_modules
if not exist "backend\node_modules\" (
    echo [System] Installing backend dependencies...
    cd backend && call npm install && cd ..
)

:: Check frontend node_modules
if not exist "frontend\node_modules\" (
    echo [System] Installing frontend dependencies...
    cd frontend && call npm install && cd ..
)

echo.
echo [System] Starting Backend Service on http://localhost:5000 ...
start "Goushala Backend API" cmd /c "cd backend && npm start"

echo [System] Starting Frontend Vite App on http://localhost:5173 ...
start "Goushala Frontend UI" cmd /c "cd frontend && npm run dev"

echo.
echo =======================================================================
echo    SERVERS STARTED SUCCESSFULLY!
echo    - Public Website: http://localhost:5173
echo    - Secret Admin Panel: http://localhost:5173/seva-trust/admin/login
echo    - Backend API Health: http://localhost:5000/health
echo =======================================================================
echo.
pause
