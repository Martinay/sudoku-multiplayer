# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multiplayer Sudoku game built as a monorepo with:
- **Frontend**: React + TypeScript with Chakra UI and urql GraphQL client
- **Backend**: Bun + TypeScript with graphql-yoga server and WebSocket support
- **Package Manager**: Bun
- **Architecture**: GraphQL API with real-time subscriptions for multiplayer functionality

## Commands

### Development
- `bun run dev` - Start both frontend and backend in development mode
- `bun run build` - Build both applications
- `bun run graphql-gen` - Regenerate GraphQL code generation in watch mode

### Individual App Commands
From project root, these commands work on specific apps:

**Backend** (`apps/backend/`):
- `bun run dev` - Hot reload backend server
- `bun run build` - Build backend to `out/app.js`
- `bun run lint` - ESLint backend code
- `bun run prettier:write` - Format backend code
- `bun run graphql-gen` - Generate GraphQL resolvers and types

**Frontend** (`apps/frontend/`):
- `bun run dev` - Start Vite dev server
- `bun run build` - TypeScript compile + Vite build
- `bun run lint` - ESLint frontend code
- `bun run preview` - Preview production build

### Docker
- `bun run docker:build` - Build Docker image
- `bun run docker:run` - Run containerized app on port 3100

## Architecture

### Backend Structure
- GraphQL schema split by domain (`src/schema/game/`, `src/schema/base/`)
- Code-first approach with generated resolvers and types
- Real-time multiplayer via GraphQL subscriptions over WebSocket
- Game state persisted as JSON files in `games/` directory
- Message bus pattern for subscription events (`src/services/message-bus.ts`)

### Frontend Structure
- React Router with `/` (home) and `/sudoku/:gameId` (game) routes
- GraphQL client (urql) with subscription support
- Component structure: `SudokuGrid`, `NumberPad` in `src/components/`
- Pages: `Home.tsx`, `Game.tsx` in `src/pages/`

### GraphQL Code Generation
Both apps use `@graphql-codegen/cli` to generate TypeScript types and resolvers from schema. The backend uses the `@eddeee888/gcg-typescript-resolver-files` preset for type-safe resolver generation.

### Key Integration Points
- Backend serves frontend static files and GraphQL endpoint on same port
- WebSocket subscriptions enable real-time cell updates across clients
- Game state includes cell values, solution, and update tracking for multiplayer sync