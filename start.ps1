Write-Host "===================================================" -ForegroundColor Green
Write-Host "🚀 Starting IdeaForge AI High-Speed Platform..." -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; node server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host ""
Write-Host "✅ Both Backend API & Frontend Web Dev Server launched!" -ForegroundColor Cyan
Write-Host "🌐 Backend API:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "🖥️ Frontend Web:  http://localhost:3000" -ForegroundColor Yellow
