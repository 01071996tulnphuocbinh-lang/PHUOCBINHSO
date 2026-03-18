# Project Structure (Clean Architecture)

## Core Layers

- `domain/`: entities, value objects, repository interfaces, use cases.
- `application/`: dependency orchestration and DTO contracts.
- `infrastructure/`: SDK/API adapters and repository implementations.
- `presentation/`: hooks/services used by UI components and pages.

## Supporting Layers

- `configs/`: dependency wiring exports.
- `shared/`: shared primitives/extensions for cross-layer usage.
- `main.tsx`: app bootstrap entrypoint.

## Legacy Compatibility

- Existing `components/`, `pages/`, `store/`, `service/` remain active for UI behavior compatibility.
- Store slices now call use cases through `application/services/ServiceContainer.ts`.
- Direct `zmp-sdk` usage has been moved to `infrastructure/sdk/zalo.sdk.ts`.
