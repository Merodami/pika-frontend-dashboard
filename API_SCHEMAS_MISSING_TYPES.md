# API Schemas Missing Proper Types - Backend Extension Needed

## Overview

This document identifies specific API endpoints where schemas need to be extended with proper types from `@merodami/pika-types` instead of generating new types or using primitive types.

## 1. POST `/vouchers/{id}/scan` - Scan Voucher Endpoint

### Current Schema Issues:

#### a. ScanSource Field

**Current:** Generates `ScanVoucherBodyScanSource` enum locally

```typescript
// Generated in: models/scanVoucherBodyScanSource.ts
export const ScanVoucherBodyScanSource = {
  camera: 'camera',
  gallery: 'gallery',
  link: 'link',
  share: 'share',
} as const
```

**Should be:** Reference `VoucherScanSource` from `@merodami/pika-types`

```typescript
import { VoucherScanSource } from '@merodami/pika-types'
// Which has: CAMERA, GALLERY, LINK, SHARE
```

**Backend Fix Needed:** Update OpenAPI schema to reference the shared enum type instead of inline definition.

#### b. Location Field

**Current:** Generates separate latitude/longitude fields

```typescript
// Generated in: models/scanVoucherBodyLocation.ts
export type ScanVoucherBodyLocation = {
  latitude: number // -90 to 90
  longitude: number // -180 to 180
}
```

**Should be:** Use GeoJSON Point type

```typescript
export type GeoLocation = {
  type: 'Point'
  coordinates: [number, number] // [longitude, latitude]
}
```

**Backend Fix Needed:** Update schema to use GeoJSON Point format for location data.

#### c. DeviceInfo Field

**Current:** Generates inline type with required fields

```typescript
// Generated in: models/scanVoucherBodyDeviceInfo.ts
export type ScanVoucherBodyDeviceInfo = {
  platform: string // Required
  version: string // Required
  model?: string // Optional
}
```

**Should be:** More flexible DeviceInfo type from shared package

```typescript
export interface DeviceInfo {
  userAgent?: string
  platform?: string
  appVersion?: string
  deviceId?: string
}
```

**Backend Fix Needed:** Update schema to use shared DeviceInfo type with optional fields.

## 2. POST `/vouchers/{id}/redeem` - Redeem Voucher Endpoint

### Current Schema Issues:

#### a. Location Field

**Current:** Uses `unknown` type

```typescript
// Generated in: models/redeemVoucherBody.ts
export type RedeemVoucherBody = {
  code: string
  location?: unknown // No type definition
}
```

**Should be:** Use GeoJSON Point type (same as scan endpoint)

```typescript
export type RedeemVoucherBody = {
  code: string
  location?: GeoLocation // From @merodami/pika-types
}
```

**Backend Fix Needed:** Define proper GeoJSON schema for location field.

## 3. POST `/vouchers/{id}/claim` - Claim Voucher Endpoint

### Current Schema Issues:

#### a. NotificationPreferences Field

**Current:** Generates voucher-specific notification type

```typescript
// Generated in: models/claimVoucherBodyNotificationPreferences.ts
export type ClaimVoucherBodyNotificationPreferences = {
  enableReminders?: boolean
  reminderDaysBefore?: number // 1-30 days
}
```

**Should be:** Use shared NotificationPreferences type

```typescript
export interface NotificationPreferences {
  email?: boolean
  push?: boolean
  sms?: boolean
  inApp?: boolean
}
```

**Backend Fix Needed:** Either:

1. Update to use shared NotificationPreferences type, OR
2. Add VoucherNotificationPreferences to shared types if voucher-specific fields are needed

## 4. GET Endpoints with Filter Parameters

### Current Schema Issues:

All list endpoints generate inline parameter types instead of using shared filter types.

#### Examples:

- `GET /admin/vouchers` - Should use `VoucherFilterParams`
- `GET /admin/businesses` - Should use `BusinessFilterParams`
- `GET /admin/users` - Should use `UserFilterParams`

**Current:** Parameters defined inline in OpenAPI spec
**Should be:** Reference shared filter parameter types from `@merodami/pika-types`

**Backend Fix Needed:** Define reusable parameter schemas that reference shared types.

## 5. Enum Value Mismatches

### Current Issues:

#### a. ScanSource Enum

**Current:** lowercase values (`camera`, `gallery`, `link`, `share`)
**Should be:** UPPERCASE values to match `VoucherScanSource` enum in pika-types

#### b. VoucherState Enum

**Current:** Some endpoints generate their own VoucherState type
**Should be:** All should reference the shared `VoucherState` enum

**Backend Fix Needed:** Ensure all enum references use the shared enum definitions with correct casing.

## Summary of Backend Changes Needed

1. **Update `/vouchers/{id}/scan` schema:**
   - Change scanSource to reference VoucherScanSource enum with UPPERCASE values
   - Change location to GeoJSON Point format
   - Change deviceInfo to reference shared DeviceInfo type

2. **Update `/vouchers/{id}/redeem` schema:**
   - Change location from unknown to GeoJSON Point format

3. **Update `/vouchers/{id}/claim` schema:**
   - Either use shared NotificationPreferences or create VoucherNotificationPreferences

4. **Create reusable parameter schemas:**
   - Define shared schemas for common filter parameters
   - Reference these in all list endpoints

5. **Fix enum references:**
   - Ensure all enums use UPPERCASE values matching pika-types
   - Reference shared enums instead of inline definitions

## Implementation Priority

**High Priority** (Blocking frontend development):

1. Fix location fields to use GeoJSON format
2. Fix scanSource enum to match VoucherScanSource
3. Fix redeem endpoint location type

**Medium Priority** (Improves type safety):

1. Update notification preferences
2. Fix device info structure
3. Standardize filter parameters

**Low Priority** (Nice to have):

1. Other enum standardizations
2. Additional shared type references
