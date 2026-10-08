#!/usr/bin/env bash

set -euo pipefail

if [ ! -f ".env.deploy" ]; then
  echo "Erro: arquivo .env.deploy não encontrado."
  exit 1
fi

set -a
source .env.deploy
set +a

echo "1/4 - Executando lint..."
pnpm lint

echo "2/4 - Gerando build..."
pnpm build

echo "3/4 - Sincronizando com S3..."
aws s3 sync dist "s3://${AWS_FRONTEND_BUCKET}" --delete

echo "4/4 - Invalidando cache do CloudFront..."
INVALIDATION_ID=$(
  aws cloudfront create-invalidation \
    --distribution-id "${AWS_CLOUDFRONT_DISTRIBUTION_ID}" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text
)

echo "Invalidation criada: ${INVALIDATION_ID}"

aws cloudfront wait invalidation-completed \
  --distribution-id "${AWS_CLOUDFRONT_DISTRIBUTION_ID}" \
  --id "${INVALIDATION_ID}"

echo "Deploy concluído."