@echo off
title Deploy to Vercel - Bharathiyar Portal
color 0B
cd /d "%~dp0"

echo =====================================================================
echo    VERCEL DEPLOYMENT LAUNCHER
echo =====================================================================
echo.
echo Deploying your site to Vercel...
echo If it asks to log in, choose your preferred method (GitHub / Google).
echo.

npx vercel --prod

echo.
echo =====================================================================
echo Deployment process finished!
echo =====================================================================
pause
