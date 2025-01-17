#!/bin/bash

required_vars=(
  "FIRECRAWL_API_KEY"
  "FIRECRAWL_API_URL"
  "GUPY_BUILD_ID"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Erro: Variável de ambiente $var não está definida"
    exit 1
  fi
done

echo "✅ Todas as variáveis de ambiente necessárias estão configuradas" 