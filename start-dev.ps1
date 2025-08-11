# Wine Club Development Server Startup Script
# This script starts both the backend and frontend servers

Write-Host "Starting Wine Club Development Servers..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Start backend server
Write-Host "Starting backend server on port 5000..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\sofiatrevino\OneDrive - Microsoft\Desktop\Files\Personal Projects\Wine Club\Wine-Club\backend'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm start"

# Wait a moment before starting frontend
Start-Sleep -Seconds 3

# Start frontend server  
Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\sofiatrevino\OneDrive - Microsoft\Desktop\Files\Personal Projects\Wine Club\Wine-Club\frontend'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "Development servers are starting..." -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop the servers, close the terminal windows or press Ctrl+C in each" -ForegroundColor Yellow
