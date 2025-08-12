/**
 * Server-side API exports  
 * Use these in server components, server actions, and route handlers
 */
import 'server-only';

// We'll need to generate server-specific endpoints
// For now, export models and we'll update this after configuring Orval
export * from './orval-generated/models';