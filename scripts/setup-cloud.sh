#!/usr/bin/env bash
set -euo pipefail
npm install
if [ ! -f .env.local ]; then cp .env.example .env.local; fi
echo "Nabih setup complete. Run: npm run dev"
