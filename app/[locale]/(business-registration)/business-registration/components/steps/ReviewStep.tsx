'use client'

import { useState } from 'react'
import { Card, Button, Checkbox, Descriptions, Tag, Alert, Space } from 'antd'
import { CheckCircle, Edit2, Building2, MapPin, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRegistrationStore } from '../../store/registrationStore'
import { useCategoryTree } from '@/hooks/api/categories/useCategories'
import { isEmpty } from 'lodash'

interface ReviewStepProps {
  onSubmit: () => void
}

export function ReviewStep({ onSubmit }: ReviewStepProps) {
  const t = useTranslations('businessRegistration.steps.review')
  const tBusiness = useTranslations('businessRegistration.steps')
  const [confirmed, setConfirmed] = useState(false)

  const { step1Data, step2Data, step3Data, setCurrentStep } =
    useRegistrationStore()

  // Get category name for display
  const { data: categoryData } = useCategoryTree()
  const findCategoryName = (categoryId: string): string => {
    if (!categoryData?.data) return categoryId

    const findInTree = (nodes: any[]): string | null => {
      for (const node of nodes) {
        if (node.id === categoryId) return node.name
        if (node.children) {
          const found = findInTree(node.children)
          if (found) return found
        }
      }
      return null
    }

    return findInTree(categoryData.data) || categoryId
  }

  const handleEdit = (step: number) => {
    setCurrentStep(step)
  }

  const getBusinessTypeLabel = (type: string) => {
    return tBusiness(`businessInfo.fields.businessType.options.${type}`)
  }

  const getLanguageLabel = (lang: string) => {
    const languages: Record<string, string> = {
      en: 'English',
      es: 'Español',
      gn: 'Guaraní',
    }
    return languages[lang] || lang
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
          <p className="text-gray-500">{t('description')}</p>
        </div>
      </div>

      <Alert type="info" message={t('checkInfo')} showIcon />

      {/* Business Information Review */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>{t('sections.businessInfo')}</span>
            </div>
            <Button
              type="link"
              icon={<Edit2 className="w-4 h-4" />}
              onClick={() => handleEdit(1)}
            >
              {t('editSection', { section: '1' })}
            </Button>
          </div>
        }
      >
        <Descriptions column={1} styles={{ label: { fontWeight: 500 } }}>
          <Descriptions.Item
            label={tBusiness('businessInfo.fields.businessName.label')}
          >
            {step1Data?.businessName || '-'}
          </Descriptions.Item>
          <Descriptions.Item
            label={tBusiness('businessInfo.fields.businessType.label')}
          >
            {step1Data?.businessType
              ? getBusinessTypeLabel(step1Data.businessType)
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item
            label={tBusiness('businessInfo.fields.category.label')}
          >
            {step1Data?.categoryId
              ? findCategoryName(step1Data.categoryId)
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item
            label={tBusiness('businessInfo.fields.primaryLanguage.label')}
          >
            {step1Data?.primaryLanguage
              ? getLanguageLabel(step1Data.primaryLanguage)
              : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Contact & Location Review */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{t('sections.contactDetails')}</span>
            </div>
            <Button
              type="link"
              icon={<Edit2 className="w-4 h-4" />}
              onClick={() => handleEdit(2)}
            >
              {t('editSection', { section: '2' })}
            </Button>
          </div>
        }
      >
        <Descriptions column={1} styles={{ label: { fontWeight: 500 } }}>
          <Descriptions.Item
            label={tBusiness('contactDetails.fields.description.label')}
          >
            <div className="whitespace-pre-wrap">
              {step2Data?.description || '-'}
            </div>
          </Descriptions.Item>
          <Descriptions.Item
            label={tBusiness('contactDetails.fields.address.label')}
          >
            {step2Data?.address ? (
              <div>
                {step2Data.address.street}
                <br />
                {step2Data.address.city}, {step2Data.address.state}{' '}
                {step2Data.address.postalCode}
                <br />
                {step2Data.address.country}
              </div>
            ) : (
              '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item
            label={tBusiness('contactDetails.fields.phone.label')}
          >
            {step2Data?.phone || '-'}
          </Descriptions.Item>
          {step2Data?.email && (
            <Descriptions.Item
              label={tBusiness('contactDetails.fields.email.label')}
            >
              {step2Data.email}
            </Descriptions.Item>
          )}
          {step2Data?.website && (
            <Descriptions.Item
              label={tBusiness('contactDetails.fields.website.label')}
            >
              <a
                href={step2Data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {step2Data.website}
              </a>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      {/* Additional Information Review */}
      {(!isEmpty(step3Data?.operatingHours) ||
        !isEmpty(step3Data?.socialMedia) ||
        step3Data?.additionalInfo) && (
        <Card
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>{t('sections.additionalInfo')}</span>
              </div>
              <Button
                type="link"
                icon={<Edit2 className="w-4 h-4" />}
                onClick={() => handleEdit(3)}
              >
                {t('editSection', { section: '3' })}
              </Button>
            </div>
          }
        >
          <Descriptions column={1} styles={{ label: { fontWeight: 500 } }}>
            {!isEmpty(step3Data?.operatingHours) && (
              <Descriptions.Item
                label={tBusiness('additionalInfo.fields.operatingHours.label')}
              >
                <div className="space-y-1">
                  {step3Data &&
                    Object.entries(step3Data.operatingHours || {}).map(
                      ([day, hours]: [string, any]) => (
                        <div key={day} className="text-sm">
                          <span className="font-medium capitalize">{day}:</span>{' '}
                          {hours?.closed
                            ? 'Closed'
                            : hours?.['24hours']
                              ? 'Open 24 hours'
                              : `${hours?.open || 'N/A'} - ${hours?.close || 'N/A'}`}
                        </div>
                      )
                    )}
                </div>
              </Descriptions.Item>
            )}
            {!isEmpty(step3Data?.socialMedia) && (
              <Descriptions.Item
                label={tBusiness('additionalInfo.fields.socialMedia.label')}
              >
                <Space wrap>
                  {Object.entries(step3Data.socialMedia).map(
                    ([platform, url]: [string, any]) => (
                      <Tag key={platform}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {platform}
                        </a>
                      </Tag>
                    )
                  )}
                </Space>
              </Descriptions.Item>
            )}
            {step3Data?.additionalInfo?.notes && (
              <Descriptions.Item
                label={tBusiness('additionalInfo.fields.additionalInfo.label')}
              >
                <div className="whitespace-pre-wrap">
                  {step3Data.additionalInfo.notes}
                </div>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}

      {/* Confirmation */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t('confirmation.title')}</h3>
          <p className="text-gray-600">{t('confirmation.message')}</p>
          <Checkbox
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          >
            {t('confirmation.checkbox')}
          </Checkbox>
        </div>
      </Card>

      <div className="pt-4">
        <Button
          type="primary"
          size="large"
          className="w-full"
          disabled={!confirmed}
          onClick={onSubmit}
        >
          Submit Registration
        </Button>
      </div>
    </div>
  )
}
