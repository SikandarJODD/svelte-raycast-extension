# PowerShell script to resize screenshot to Raycast requirements
# Required size: 2000 x 1250 pixels

$inputPath = "metadata\svelte-1.png"
$outputPath = "metadata\svelte-1-resized.png"

if (-not (Test-Path $inputPath)) {
    Write-Host "Error: $inputPath not found!" -ForegroundColor Red
    exit 1
}

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile((Resolve-Path $inputPath))
$newWidth = 2000
$newHeight = 1250

$newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($newImg)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)

$newImg.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$newImg.Dispose()
$img.Dispose()

Write-Host "Screenshot resized successfully!" -ForegroundColor Green
Write-Host "Original: $inputPath" -ForegroundColor Yellow
Write-Host "Resized: $outputPath (2000 x 1250 pixels)" -ForegroundColor Green
Write-Host ""
Write-Host "Please replace the original file with the resized one:" -ForegroundColor Cyan
Write-Host "  Move-Item -Force $outputPath $inputPath" -ForegroundColor White

