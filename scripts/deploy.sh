#!/bin/bash

# Deploy Playwright service
cd services/playwright
docker compose up --build -d

# Wait for Playwright service to be ready
echo "Waiting for Playwright service to be ready..."
sleep 10

# Deploy API service
cd ../api
docker compose up --build -d 