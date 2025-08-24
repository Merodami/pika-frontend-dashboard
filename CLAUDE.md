# Pika Frontend Dashboard - Development Guidelines

## CRITICAL: Validation & Type Rules (MANDATORY)

### ❌ NEVER DO THIS:

```typescript
// WRONG - Creating validation schemas in frontend
const CreateUserFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  // ...
})
```

### ✅ ALWAYS DO THIS:

```typescript
// CORRECT - Use schemas from @merodami/pika-api package
import { userAdmin, authFrontend } from '@merodami/pika-api'

// Use the existing backend schemas
const { AdminCreateUserRequest, transformToAdminCreateUser } = userAdmin
```

## Strict Rules for Validation & Types

1. **ALL validation schemas MUST come from `@merodami/pika-api` package**
   - NO custom Zod schemas in frontend code
   - NO duplicating validation logic
   - Backend team is responsible for updating schemas when needed

2. **ALL types for backend entities MUST come from `@merodami/pika-types` package**
   - Use `UserRole`, `UserStatus`, etc. from the types package
   - Never create duplicate enums or types

3. **Single Source of Truth**
   - Backend packages (`@merodami/pika-api` and `@merodami/pika-types`) are the ONLY source of truth
   - Frontend must adapt to backend schemas, not the other way around
   - If a schema is missing or needs changes, request it from the backend team

4. **Form Validation Pattern**

   ```typescript
   // Import schemas from backend
   import { authFrontend, userAdmin } from '@merodami/pika-api'

   // Use existing schemas and transformers
   const { AdminCreateUserSchema, transformToAdminCreateUser } = authFrontend

   // Use with react-hook-form
   const form = useForm({
     resolver: zodResolver(AdminCreateUserSchema),
   })
   ```

## Why This Matters

- **Consistency**: Same validation on frontend and backend
- **Type Safety**: Types are always in sync
- **Maintainability**: Changes in one place affect entire system
- **No Duplication**: Validation logic exists only in backend packages
- **Prevents Bugs**: Frontend and backend always agree on data structure

## If You Need a Schema That Doesn't Exist

1. Check if it exists in `@merodami/pika-api` first
2. If not, request the backend team to add it
3. NEVER create it locally as a "temporary" solution
4. Wait for the backend package to be updated

## Example: User Creation Form

```typescript
// ❌ WRONG
const schema = z.object({
  email: z.string().email(),
  // ... custom validation
})

// ✅ CORRECT
import { userAdmin } from '@merodami/pika-api'
const { AdminCreateUserRequest } = userAdmin
// Use AdminCreateUserRequest schema directly
```

---

**Remember: The frontend is a consumer of backend schemas, not a creator of them.**
