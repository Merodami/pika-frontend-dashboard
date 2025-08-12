import { Card, Tag, Button, Divider } from 'antd'
import { 
  User, Mail, Phone, Calendar, Shield, Clock, 
  CheckCircle, XCircle, Edit, Camera 
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

import { requireAuth } from '@/app/services/authService'
import { getUserProfile } from '@/lib/api/orval-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'profile' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'profile' })
  
  // Get current user and full profile
  await requireAuth()
  const profile = await getUserProfile()

  // Format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return t('notProvided')
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return t('never')
    return new Date(dateString).toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'green'
      case 'INACTIVE': return 'orange'
      case 'SUSPENDED': return 'red'
      default: return 'default'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'purple'
      case 'BUSINESS': return 'blue'
      case 'USER': return 'default'
      default: return 'default'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Link href={`/${locale}/profile/edit`}>
          <Button type="primary" icon={<Edit className="w-4 h-4" />}>
            {t('editProfile')}
          </Button>
        </Link>
      </div>

      {/* Profile Header Card */}
      <Card className="mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.firstName}
                width={120}
                height={120}
                className="rounded-full"
              />
            ) : (
              <div className="w-30 h-30 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
            )}
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold">
                {profile.firstName} {profile.lastName}
              </h2>
              <Tag color={getRoleColor(profile.role)}>{t(`role.${profile.role.toLowerCase()}`)}</Tag>
              <Tag color={getStatusColor(profile.status)}>{t(`status.${profile.status.toLowerCase()}`)}</Tag>
            </div>
            
            <div className="text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profile.email}
                {profile.emailVerified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </p>
              {profile.phoneNumber && (
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {profile.phoneNumber}
                  {profile.phoneVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          {t('personalInfo.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">{t('personalInfo.firstName')}</label>
            <p className="font-medium">{profile.firstName}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('personalInfo.lastName')}</label>
            <p className="font-medium">{profile.lastName}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('personalInfo.dateOfBirth')}</label>
            <p className="font-medium">{formatDate(profile.dateOfBirth)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('personalInfo.preferredLanguage')}</label>
            <p className="font-medium">
              {profile.preferredLanguage ? 
                t(`languages.${profile.preferredLanguage}`) : 
                t('notProvided')
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {t('contactInfo.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">{t('contactInfo.email')}</label>
            <p className="font-medium flex items-center gap-2">
              {profile.email}
              {profile.emailVerified ? (
                <Tag color="green" className="text-xs">
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  {t('verified')}
                </Tag>
              ) : (
                <Tag color="orange" className="text-xs">
                  <XCircle className="w-3 h-3 inline mr-1" />
                  {t('unverified')}
                </Tag>
              )}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('contactInfo.phone')}</label>
            <p className="font-medium flex items-center gap-2">
              {profile.phoneNumber || t('notProvided')}
              {profile.phoneNumber && (
                profile.phoneVerified ? (
                  <Tag color="green" className="text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    {t('verified')}
                  </Tag>
                ) : (
                  <Tag color="orange" className="text-xs">
                    <XCircle className="w-3 h-3 inline mr-1" />
                    {t('unverified')}
                  </Tag>
                )
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Security & Account */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          {t('security.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">{t('security.accountStatus')}</label>
            <p className="font-medium">
              <Tag color={getStatusColor(profile.status)}>
                {t(`status.${profile.status.toLowerCase()}`)}
              </Tag>
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('security.role')}</label>
            <p className="font-medium">
              <Tag color={getRoleColor(profile.role)}>
                {t(`role.${profile.role.toLowerCase()}`)}
              </Tag>
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('security.memberSince')}</label>
            <p className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(profile.createdAt)}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('security.lastLogin')}</label>
            <p className="font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatDateTime(profile.lastLoginAt)}
            </p>
          </div>
        </div>

        <Divider />

        <div className="flex gap-4">
          <Button type="default">{t('security.changePassword')}</Button>
          <Button type="default">{t('security.twoFactor')}</Button>
          {!profile.emailVerified && (
            <Button type="default">{t('security.verifyEmail')}</Button>
          )}
        </div>
      </Card>
    </div>
  )
}