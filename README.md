# 🧑‍🍳 ChefClaude – Ingredient-Based Recipe Suggester

ChefClaude is a React + Node.js project that lets users input ingredients and attempts to generate a recipe suggestion from them using an AI backend.

## Features

- Add ingredients via UI form
- Dynamic ingredient list rendering
- Backend API for recipe generation
- Secure `.env` handling for private keys
- Ready for AI integration (Hugging Face / others)

## Tech Used

- React (Vite)
- Express.js
- Node.js
- dotenv for environment variables

## How It Works

The frontend collects ingredients and sends them to a backend endpoint:

The backend is designed to request an AI model for recipe generation.

## Current Status

Everything is working (frontend + backend + API flow), however the AI call currently returns:
"The requested model is not supported by any provider you have enabled."

This is due to Hugging Face model/provider restrictions on the current account/token — not due to code issues.

The app remains fully wired for real AI responses once proper provider access is enabled.

## Future Plans

- Enable a supported model provider
- Format recipes in markdown
