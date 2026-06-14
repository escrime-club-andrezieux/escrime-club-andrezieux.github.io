<#
=====================================================================
  build.ps1 — Construire le site web du club
=====================================================================

  Ce script fabrique le site complet, prêt à mettre en ligne, dans un
  dossier unique. Vous n'avez qu'à publier le contenu de ce dossier
  (par glisser-déposer chez votre hébergeur, ou sur GitHub Pages).

  COMMENT L'UTILISER
  ------------------
  1. Modifiez vos textes/photos/vidéos dans le dossier  content\
  2. Faites un clic droit sur ce fichier  >  « Exécuter avec PowerShell »
     (ou, dans une fenêtre PowerShell ouverte ici :  .\build.ps1 )
  3. Le site fini apparaît dans le dossier  site-a-publier\

  Si Windows refuse de lancer le script (politique d'exécution), ouvrez
  PowerShell et lancez une fois :
      powershell -ExecutionPolicy Bypass -File .\build.ps1

  PRÉREQUIS : Node.js doit être installé (https://nodejs.org — version LTS).
=====================================================================
#>

[CmdletBinding()]
param(
  # Nom du dossier final, prêt à publier.
  [string]$OutputDir = "site-a-publier"
)

# Arrête le script à la première erreur d'une commande PowerShell.
$ErrorActionPreference = "Stop"

function Write-Step($message) {
  Write-Host ""
  Write-Host "==> $message" -ForegroundColor Cyan
}

function Fail($message) {
  Write-Host ""
  Write-Host "ERREUR : $message" -ForegroundColor Red
  Write-Host ""
  Read-Host "Appuyez sur Entree pour fermer"
  exit 1
}

try {
  # Toujours travailler dans le dossier du projet (là où se trouve ce script),
  # quel que soit l'endroit d'où on le lance.
  Set-Location -Path $PSScriptRoot

  Write-Host ""
  Write-Host "  Construction du site web du club d'escrime" -ForegroundColor White
  Write-Host "  ------------------------------------------" -ForegroundColor DarkGray

  # --- Vérifications de base -----------------------------------------
  if (-not (Test-Path ".\package.json")) {
    Fail "package.json introuvable. Lancez ce script depuis le dossier du projet."
  }

  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Fail "Node.js / npm n'est pas installe. Installez la version LTS depuis https://nodejs.org puis relancez."
  }

  $nodeVersion = (& node --version)
  Write-Host "    Node.js detecte : $nodeVersion" -ForegroundColor DarkGray

  # --- Installation des dépendances ----------------------------------
  Write-Step "Installation des composants necessaires (peut prendre une minute)..."
  & npm install --no-fund --no-audit
  if ($LASTEXITCODE -ne 0) { Fail "L'installation des dependances a echoue (npm install)." }

  # --- Construction du site dans le dossier de publication -----------
  Write-Step "Construction du site dans le dossier « $OutputDir »..."
  & npm run build -- --outDir $OutputDir --emptyOutDir
  if ($LASTEXITCODE -ne 0) { Fail "La construction du site a echoue (npm run build)." }

  $fullPath = (Resolve-Path -Path $OutputDir).Path

  # --- Terminé -------------------------------------------------------
  Write-Host ""
  Write-Host "  ============================================" -ForegroundColor Green
  Write-Host "   Termine ! Le site est pret a etre publie." -ForegroundColor Green
  Write-Host "  ============================================" -ForegroundColor Green
  Write-Host ""
  Write-Host "  Dossier a mettre en ligne :" -ForegroundColor White
  Write-Host "    $fullPath" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "  Publiez TOUT le contenu de ce dossier chez votre hebergeur"
  Write-Host "  (ou poussez-le sur la branche GitHub Pages)."
  Write-Host "  Pour un apercu local : ouvrez index.html dans ce dossier."
  Write-Host ""
  Read-Host "Appuyez sur Entree pour fermer"
}
catch {
  Fail $_.Exception.Message
}
