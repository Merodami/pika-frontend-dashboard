/**
 * Main middleware entry point
 *
 * This file re-exports from the modular middleware structure.
 * The modular approach provides better maintainability, testability,
 * and follows industry-standard patterns.
 *
 * @see /middleware/index.ts for the implementation
 * @see /middleware/config/routes.ts for route configuration
 * @see /RATE_LIMITING_STRATEGY.md for rate limiting decisions
 */
export { middleware, config } from './middleware/index'
