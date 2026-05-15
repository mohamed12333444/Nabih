# Architecture

Nabih is organized by business domain under `src/modules`.

Required modules:

- auth
- users
- tasks
- ai
- voice
- dashboard
- notifications
- subscriptions

Each module is designed to own components, services, repositories, DTOs, validators, hooks, API adapters, schemas, types, and utils.

## Layers

- App Router pages and route handlers live in `src/app`.
- Business orchestration lives in module services.
- Persistence is isolated in repositories.
- Input validation uses Zod.
- Provider integrations are isolated behind interfaces.

## AI

The AI layer is provider-agnostic and prepared for OpenRouter, OpenAI, Gemini, and future providers.

## Notifications

Notifications are abstracted for WhatsApp, Telegram, Email, and Push providers.

## Cloud IDE

The dev server binds to `0.0.0.0`, and the repository includes a devcontainer setup.
