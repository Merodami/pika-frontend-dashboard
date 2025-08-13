import { Spin } from 'antd'

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  )
}
