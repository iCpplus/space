#!/bin/bash
# This script copies 404.html to 404.html for GitHub Pages routing
# GitHub Pages will serve 404.html when a file is not found
# This allows Gatsby to handle client-side routing

if [ -f public/404.html ]; then
  echo "✓ 404.html found in public directory"
else
  echo "✗ 404.html not found!"
  exit 1
fi

echo "GitHub Pages 404 redirect is ready"
