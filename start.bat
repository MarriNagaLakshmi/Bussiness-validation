@echo off
echo ===================================================
echo 🚀 Starting IdeaForge AI Full-Stack Platform...
echo ===================================================

start "IdeaForge AI Backend API" cmd /k "cd backend && node server.js"
start "IdeaForge AI Frontend Vite" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ IdeaForge AI Platform Launching!
echo 🌐 Backend API:  http://localhost:5000
echo 🖥️ Frontend Web:  http://localhost:3000
echo.
pause
