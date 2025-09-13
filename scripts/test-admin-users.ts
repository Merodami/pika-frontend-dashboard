#!/usr/bin/env tsx
/**
 * Test Admin Users Endpoint
 * Tests the /api/v1/admin/users endpoint with proper authentication
 */

import axios from 'axios'

const API_BASE_URL = 'http://localhost:5500/api/v1'

// Admin credentials
const adminCredentials = {
  email: 'admin@thevoucherbook.com',
  password: 'AdminPassword123!',
}

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

async function testAdminUsers() {
  try {
    // Step 1: Login as admin
    log('\n🔐 Logging in as admin...', colors.cyan)

    const loginResponse = await axios.post(`${API_BASE_URL}/auth/token`, {
      grantType: 'password',
      username: adminCredentials.email,
      password: adminCredentials.password,
    })

    const accessToken = loginResponse.data.accessToken
    log('✅ Login successful!', colors.green)
    log(`Token received: ${accessToken ? 'Yes' : 'No'}`, colors.blue)

    // Step 2: First try /users endpoint (might be the correct one)
    log('\n📋 Testing /users endpoint...', colors.cyan)

    try {
      const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          limit: 20,
        },
      })

      log('✅ Users endpoint successful!', colors.green)
      log(`Status: ${usersResponse.status}`, colors.blue)
      log(
        `Users retrieved: ${usersResponse.data.data?.length || usersResponse.data.length || 0}`,
        colors.blue
      )
      log(
        `Total users: ${usersResponse.data.total || usersResponse.data.length || 0}`,
        colors.blue
      )

      // Display first few users
      const users = usersResponse.data.data || usersResponse.data
      if (Array.isArray(users) && users.length > 0) {
        log('\nFirst 3 users:', colors.cyan)
        users.slice(0, 3).forEach((user: any, index: number) => {
          log(
            `  ${index + 1}. ${user.email} (${user.role}) - ${user.status}`,
            colors.blue
          )
        })
      }

      return // Success, exit function
    } catch (error: any) {
      log('⚠️  /users endpoint failed, trying /admin/users...', colors.yellow)
    }

    // Step 3: Try /admin/users endpoint if /users failed
    const usersResponse = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: 1,
        limit: 20,
      },
    })

    log('✅ Admin users endpoint successful!', colors.green)
    log(`Status: ${usersResponse.status}`, colors.blue)
    log(`Users retrieved: ${usersResponse.data.data?.length || 0}`, colors.blue)
    log(`Total users: ${usersResponse.data.total || 0}`, colors.blue)

    // Display first few users
    if (usersResponse.data.data && usersResponse.data.data.length > 0) {
      log('\nFirst 3 users:', colors.cyan)
      usersResponse.data.data
        .slice(0, 3)
        .forEach((user: any, index: number) => {
          log(
            `  ${index + 1}. ${user.email} (${user.role}) - ${user.status}`,
            colors.blue
          )
        })
    }
  } catch (error: any) {
    log('\n❌ Test failed!', colors.red)

    if (error.response) {
      log(`Status: ${error.response.status}`, colors.red)
      log(`URL: ${error.config?.url}`, colors.yellow)
      log(`Method: ${error.config?.method?.toUpperCase()}`, colors.yellow)

      if (error.response.status === 404) {
        log('\n⚠️  404 Error Details:', colors.yellow)
        log(`Requested URL: ${error.config?.url}`, colors.yellow)
        log(`Response: ${JSON.stringify(error.response.data)}`, colors.red)
        log('\nPossible issues:', colors.cyan)
        log('1. The endpoint might not exist on the backend', colors.blue)
        log('2. The URL construction might be incorrect', colors.blue)
        log('3. The backend routing might be misconfigured', colors.blue)
      } else if (error.response.status === 401) {
        log('\n⚠️  Authentication failed', colors.yellow)
        log(
          'Make sure the admin user exists and credentials are correct',
          colors.blue
        )
      }

      log(`\nFull error response:`, colors.yellow)
      console.log(error.response.data)
    } else {
      log(`Error: ${error.message}`, colors.red)
    }

    process.exit(1)
  }
}

// Run the test
log(`${colors.bright}🚀 Testing Admin Users Endpoint${colors.reset}`)
log(`API URL: ${API_BASE_URL}`)
log(`Admin email: ${adminCredentials.email}`)

testAdminUsers().catch((error) => {
  log(`Unexpected error: ${error.message}`, colors.red)
  process.exit(1)
})
