Write-Host "Starting full-stack setup..."

# ---- SETUP BACKEND ----
Write-Host "Setting up Flask backend..."
Set-Location flask-backend

# Create venv if not exists
if (!(Test-Path -Path "venv")) {
    python -m venv venv
    Write-Host "Virtual environment created."
}

# Activate venv
& .\venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r requirements.txt
Write-Host "Backend dependencies installed."

# Go back to root
Set-Location ..

# ---- SETUP FRONTEND ----
Write-Host "Setting up Vite React frontend..."
Set-Location client

npm install
Write-Host "Frontend dependencies installed."

# Back to root
Set-Location ..

Write-Host "`nAll dependencies installed!"
Write-Host "`nTo start backend:"
Write-Host "   cd flask-backend; .\venv\Scripts\Activate.ps1; python app.py"
Write-Host "`nTo start frontend:"
Write-Host "   cd client; npm run dev"
Write-Host "`nYou're ready to develop!"

