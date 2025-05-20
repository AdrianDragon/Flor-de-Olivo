@echo off
echo Adding Node.js to your PATH environment variable...

:: Find Node.js installation
set "NODEJS_DIR=%APPDATA%\npm"

:: Add to PATH temporarily
set "PATH=%NODEJS_DIR%;%PATH%"

:: Test if node is now accessible
node --version
npm --version

if %errorlevel% equ 0 (
    echo Node.js is now accessible! You can use 'node' and 'npm' commands.
    echo Try running 'npm start' to start your React development server.
) else (
    echo Failed to configure Node.js. Please install Node.js from https://nodejs.org/
)

echo.
echo Press any key to exit...
pause > nul 