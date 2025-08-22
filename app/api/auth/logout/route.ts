import { NextRequest, NextResponse } from 'next/server'
import { clearTokens } from '@/app/services/tokenService'

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') || 'en'
  
  // Clear the authentication tokens
  await clearTokens()
  
  // Redirect to the login page
  return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
}