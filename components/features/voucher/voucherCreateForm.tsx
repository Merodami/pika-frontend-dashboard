'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Steps, Card, Button, Space, notification } from 'antd'
import { Currency } from '@merodami/pika-types'
import { VoucherDiscountType, UserRole } from '@/lib/api/orval-client'
import { VoucherDesignForm } from './voucherDesignForm'
import { VoucherPreview } from './voucherPreview'
import { useVoucherMutations } from '@/hooks/api/vouchers/useVoucherMutations'
import type { VoucherDesign, CreateVoucherData } from '@/types/voucher'

interface VoucherCreateFormProps {
  userRole: UserRole
  businessId?: string
}

const STEPS = [
  { title: 'Design', key: 'design' },
  { title: 'Review', key: 'review' },
]

export function VoucherCreateForm({
  userRole,
  businessId,
}: VoucherCreateFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [voucherDesign, setVoucherDesign] = useState<VoucherDesign>({
    title: '',
    description: '',
    category: '',
    discountType: VoucherDiscountType.percentage,
    discountValue: 0,
    originalPrice: 0,
    minimumPurchase: 0,
    validFrom: '',
    validUntil: '',
    maxRedemptions: 100,
    maxRedemptionsPerUser: 1,
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessWebsite: '',
    primaryColor: '#1890ff',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    secondaryColor: '#f0f0f0',
    colors: {
      background: '#ffffff',
      text: '#000000',
      accent: '#1890ff',
    },
    template: 'modern',
    terms: [],
  })

  const router = useRouter()
  const { createVoucher } = useVoucherMutations()

  // Note: Form validation is handled by the VoucherDesignForm component

  const handleVoucherDesignChange = (
    field: keyof VoucherDesign,
    value: VoucherDesign[keyof VoucherDesign]
  ) => {
    setVoucherDesign((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Transform design to API format
      const voucherData: CreateVoucherData = {
        businessId: businessId || voucherDesign.businessName, // Use businessId for business users
        categoryId: voucherDesign.category,
        title: {
          es: voucherDesign.title,
          en: voucherDesign.title,
          gn: voucherDesign.title,
        },
        description: {
          es: voucherDesign.description,
          en: voucherDesign.description,
          gn: voucherDesign.description,
        },
        termsAndConditions: {
          es: voucherDesign.terms.join(', '),
          en: voucherDesign.terms.join(', '),
          gn: voucherDesign.terms.join(', '),
        },
        discountType: voucherDesign.discountType,
        discountValue: voucherDesign.discountValue,
        currency: Currency.PYG,
        validFrom:
          typeof voucherDesign.validFrom === 'string'
            ? voucherDesign.validFrom
            : voucherDesign.validFrom.toISOString(),
        expiresAt:
          typeof voucherDesign.validUntil === 'string'
            ? voucherDesign.validUntil
            : voucherDesign.validUntil.toISOString(),
        maxRedemptions: voucherDesign.maxRedemptions,
        maxRedemptionsPerUser: voucherDesign.maxRedemptionsPerUser,
        metadata: {
          minimumPurchase: voucherDesign.minimumPurchase,
          originalPrice: voucherDesign.originalPrice,
          businessPhone: voucherDesign.businessPhone,
          businessWebsite: voucherDesign.businessWebsite,
          colors: {
            primary: voucherDesign.primaryColor,
            background: voucherDesign.backgroundColor,
            text: voucherDesign.textColor,
          },
          template: voucherDesign.template,
        },
      }

      const result = await createVoucher.mutateAsync(voucherData)

      notification.success({
        message: 'Success',
        description: 'Voucher created successfully!',
      })

      // Navigate based on user role
      const redirectPath =
        userRole === UserRole.admin
          ? `/admin/vouchers/${result.id}`
          : `/business/vouchers/${result.id}`

      router.push(redirectPath)
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to create voucher',
      })
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <VoucherDesignForm
            voucherDesign={voucherDesign}
            onChange={handleVoucherDesignChange}
          />
        )
      case 1:
        return (
          <div className="space-y-6">
            <VoucherPreview
              voucherDesign={voucherDesign}
              showQRCode={true}
              fullScreen={true}
            />
            <Card>
              <h3 className="text-lg font-medium mb-4">Voucher Summary</h3>
              <div className="space-y-2">
                <p>
                  <strong>Title:</strong> {voucherDesign.title}
                </p>
                <p>
                  <strong>Category:</strong> {voucherDesign.category}
                </p>
                <p>
                  <strong>Discount:</strong> {voucherDesign.discountValue}
                  {voucherDesign.discountType === VoucherDiscountType.percentage
                    ? '%'
                    : ' Gs.'}
                </p>
                <p>
                  <strong>Valid From:</strong>{' '}
                  {typeof voucherDesign.validFrom === 'string'
                    ? voucherDesign.validFrom
                    : voucherDesign.validFrom?.toString()}
                </p>
                <p>
                  <strong>Valid Until:</strong>{' '}
                  {typeof voucherDesign.validUntil === 'string'
                    ? voucherDesign.validUntil
                    : voucherDesign.validUntil?.toString()}
                </p>
                <p>
                  <strong>Max Redemptions:</strong>{' '}
                  {voucherDesign.maxRedemptions}
                </p>
              </div>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="voucher-create-form">
      {/* Progress Steps */}
      <Card className="mb-6">
        <Steps current={currentStep} items={STEPS} size="small" />
      </Card>

      {/* Current Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className={currentStep === 0 ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <Card title={STEPS[currentStep].title}>{renderCurrentStep()}</Card>
        </div>

        {/* Preview Section - Only show on design step */}
        {currentStep === 0 && (
          <div className="lg:col-span-1">
            <Card title="Preview" className="sticky top-4">
              <VoucherPreview
                voucherDesign={voucherDesign}
                showQRCode={false}
              />
            </Card>
          </div>
        )}
      </div>

      {/* Navigation */}
      <Card className="mt-6">
        <div className="flex justify-between">
          <Button disabled={currentStep === 0} onClick={handlePrevious}>
            Previous
          </Button>

          <Space>
            {currentStep < STEPS.length - 1 ? (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                loading={createVoucher.isPending}
                onClick={handleSubmit}
              >
                Create Voucher
              </Button>
            )}
          </Space>
        </div>
      </Card>
    </div>
  )
}
