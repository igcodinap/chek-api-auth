#!/bin/bash

# Define the Dockerfile name
DOCKERFILE_NAME="Dockerfile.development"

# Define the image name and tag
IMAGE_NAME="api_wallet:development"

# Read the .env file and export the variables
export $(grep -v '^#' .env | xargs)

# Build the Docker image with the environment variables
docker build \
  --build-arg DB_USER="${DB_USER}" \
  --build-arg DB_PASSWORD="${DB_PASSWORD}" \
  --build-arg DB_HOST="${DB_HOST}" \
  --build-arg DB_PORT="${DB_PORT}" \
  --build-arg DB_NAME="${DB_NAME}" \
  --build-arg JWT_SECRET="${JWT_SECRET}" \
  -t "${IMAGE_NAME}" \
  -f "${DOCKERFILE_NAME}" .


docker run -it --rm \
  -p 3002:3002 \
  -e DB_USER="${DB_USER}" \
  -e DB_PASSWORD="${DB_PASSWORD}" \
  -e DB_HOST="${DB_HOST}" \
  -e DB_PORT="${DB_PORT}" \
  -e DB_NAME="${DB_NAME}" \
  -e JWT_SECRET="${JWT_SECRET}" \
  "${IMAGE_NAME}"