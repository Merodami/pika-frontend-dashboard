/**
 * Comprehensive type definitions for analytics and dashboard components
 * Includes charts, metrics, reports, and data visualization types
 */

// ============================================
// Base Types
// ============================================

export type TremorColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

export type SimplifiedColor =
  | 'primary'
  | 'secondary'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'cyan'
  | 'emerald'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'

export type ChartSize = 'sm' | 'md' | 'lg' | 'xl'

export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'donut'
  | 'sparkline'
  | 'heatmap'
  | 'scatter'
  | 'funnel'
  | 'radial'

export type DeltaType = 'increase' | 'decrease' | 'unchanged'

export type CurveType = 'linear' | 'natural' | 'monotone' | 'step'

export type ExportFormat = 'png' | 'svg' | 'csv' | 'json' | 'pdf'

// ============================================
// Data Types
// ============================================

export interface BaseChartData {
  [key: string]: string | number | Date | boolean | null | undefined
}

export interface TimeSeriesDataPoint {
  date: string | Date
  [category: string]: string | number | Date
}

export interface CategoryDataPoint {
  name: string
  value: number
  growth?: number
  color?: TremorColor
  metadata?: Record<string, any>
}

export interface DonutDataPoint {
  name: string
  value: number
  color?: TremorColor
  percentage?: number
}

export interface HeatmapDataPoint {
  x: string | number
  y: string | number
  value: number
  label?: string
}

export interface ScatterDataPoint {
  x: number
  y: number
  size?: number
  category?: string
  label?: string
  color?: TremorColor
}

export interface FunnelDataPoint {
  stage: string
  value: number
  color?: TremorColor
  conversionRate?: number
}

// ============================================
// Chart Configuration Types
// ============================================

export interface BaseChartConfig {
  height?: string | number
  className?: string
  showAnimation?: boolean
  animationDuration?: number
  showLegend?: boolean
  showTooltip?: boolean
  responsive?: boolean
}

export interface AxisConfig {
  showXAxis?: boolean
  showYAxis?: boolean
  xAxisLabel?: string
  yAxisLabel?: string
  yAxisWidth?: number
  xAxisRotation?: number
  showGridLines?: boolean
  showGrid?: boolean // Alias for showGridLines
}

export interface LineChartConfig extends BaseChartConfig, AxisConfig {
  type: 'line'
  data: TimeSeriesDataPoint[]
  index: string
  categories: string[]
  colors?: TremorColor[]
  curveType?: CurveType
  strokeWidth?: number
  showDots?: boolean
}

export interface AreaChartConfig extends BaseChartConfig, AxisConfig {
  type: 'area'
  data: TimeSeriesDataPoint[]
  index: string
  categories: string[]
  colors?: TremorColor[]
  curveType?: CurveType
  showGradient?: boolean
  stackedArea?: boolean
}

export interface BarChartConfig extends BaseChartConfig, AxisConfig {
  type: 'bar'
  data: CategoryDataPoint[] | TimeSeriesDataPoint[]
  index: string
  categories: string[]
  colors?: TremorColor[]
  stacked?: boolean
  horizontal?: boolean
  showValues?: boolean
}

export interface DonutChartConfig extends BaseChartConfig {
  type: 'donut'
  data: DonutDataPoint[]
  label?: string
  showLabel?: boolean
  variant?: 'simple' | 'detailed'
}

export interface SparklineChartConfig extends BaseChartConfig {
  type: 'sparkline'
  data: Array<{ value: number; date?: string }>
  sparkType?: 'area' | 'line' | 'bar'
  color?: TremorColor
  showGradient?: boolean
}

export interface HeatmapChartConfig extends BaseChartConfig {
  type: 'heatmap'
  data: HeatmapDataPoint[]
  colorScale?: string[]
  showValues?: boolean
  cellSize?: number
}

export interface ScatterChartConfig extends BaseChartConfig, AxisConfig {
  type: 'scatter'
  data: ScatterDataPoint[]
  xLabel: string
  yLabel: string
  sizeLabel?: string
  colors?: TremorColor[]
}

export interface FunnelChartConfig extends BaseChartConfig {
  type: 'funnel'
  data: FunnelDataPoint[]
  showPercentage?: boolean
  showConversionRate?: boolean
}

export interface RadialChartConfig extends BaseChartConfig {
  type: 'radial'
  data: [] // Radial charts don't need data array
  value: number
  maxValue?: number
  label?: string
  color?: SimplifiedColor
  size?: ChartSize
}

export type ChartConfig =
  | LineChartConfig
  | AreaChartConfig
  | BarChartConfig
  | DonutChartConfig
  | SparklineChartConfig
  | HeatmapChartConfig
  | ScatterChartConfig
  | FunnelChartConfig
  | RadialChartConfig

// ============================================
// Chart Options & Controls
// ============================================

export interface DateRange {
  from: Date
  to: Date
  label?: string
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface ChartFilter {
  key: string
  label: string
  type?: 'select' | 'multiselect' | 'range' | 'date'
  options?: FilterOption[]
  defaultValue?: string | string[] | DateRange
}

export interface ChartOptions {
  title?: string
  subtitle?: string
  description?: string
  label?: string // For radial/donut center labels
  showExport?: boolean
  exportFormats?: ExportFormat[]
  showRefresh?: boolean
  refreshInterval?: number
  showFullscreen?: boolean
  showFilters?: boolean
  filters?: ChartFilter[]
  dateRange?: DateRange
  onRefresh?: () => void | Promise<void>
  onExport?: (format: ExportFormat, data?: any) => void
  onFilterChange?: (filters: Record<string, any>) => void
  onDateRangeChange?: (range: DateRange) => void
}

// ============================================
// Metric Card Types
// ============================================

export interface TrendData {
  value: number
  date: string
}

export interface MetricCardData {
  id?: string
  title: string
  metric: string | number
  metricFormatter?: (value: number) => string
  progress?: number
  progressLabel?: string
  delta?: number
  deltaType?: DeltaType
  icon?: React.ReactNode
  color?: SimplifiedColor
  trend?: TrendData[]
  sparkline?: number[]
  onClick?: () => void
  href?: string
  badge?: {
    label: string
    color?: TremorColor
  }
  footer?: React.ReactNode
}

// ============================================
// Dashboard Section Types
// ============================================

export interface DashboardChart {
  id?: string
  config: ChartConfig
  options?: ChartOptions
  width?: 'full' | 'half' | 'third' | 'quarter'
}

export interface DashboardTable {
  id?: string
  title: string
  description?: string
  data: any[]
  columns: TableColumn[]
  pageSize?: number
  searchable?: boolean
  exportable?: boolean
}

export interface DashboardSection {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  metrics?: MetricCardData[]
  charts?: DashboardChart[]
  tables?: DashboardTable[]
  customContent?: React.ReactNode
  layout?: 'grid' | 'flex' | 'masonry'
  columns?: 1 | 2 | 3 | 4
}

// ============================================
// Table Types
// ============================================

export interface TableColumn<T = any> {
  key: keyof T | string
  header: string
  accessor?: (item: T) => any
  sortable?: boolean
  searchable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, item: T, index?: number) => React.ReactNode
  headerRender?: () => React.ReactNode
  cellClassName?: string | ((value: any, item: T) => string)
  headerClassName?: string
}

export interface TableAction<T = any> {
  label: string
  icon?: React.ReactNode
  onClick: (item: T, index?: number) => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: (item: T) => boolean
  hidden?: (item: T) => boolean
  tooltip?: string
}

export interface TableFilter<T = any> {
  key: keyof T | string
  label: string
  type: 'select' | 'multiselect' | 'text' | 'number' | 'date' | 'daterange'
  options: FilterOption[] // Made required to avoid undefined checks
  placeholder?: string
}

export interface TableProps<T = any> {
  title?: string
  description?: string
  data: T[]
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
  searchable?: boolean
  searchKeys?: (keyof T)[]
  searchPlaceholder?: string
  filterable?: boolean
  filters?: Array<{
    key: keyof T | string
    label: string
    options: Array<{ value: string; label: string }>
  }>
  sortable?: boolean
  defaultSort?: {
    key: keyof T
    direction: 'asc' | 'desc'
  }
  selectable?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  onRowClick?: (item: T, index?: number) => void
  rowClassName?: string | ((item: T, index: number) => string)
  emptyMessage?: string
  loading?: boolean
  className?: string
  stickyHeader?: boolean
  maxHeight?: string
  exportable?: boolean
  onExport?: (data: T[], format: ExportFormat) => void
}

// ============================================
// Report Builder Types
// ============================================

export interface ReportTemplate {
  id: string
  name: string
  description?: string
  icon?: React.ReactNode
  sections: DashboardSection[]
  defaultFilters?: Record<string, any>
  defaultDateRange?: DateRange
}

export interface ReportBuilderProps {
  sections?: DashboardSection[]
  templates?: ReportTemplate[]
  editable?: boolean
  saveable?: boolean
  onSave?: (sections: DashboardSection[], metadata?: ReportMetadata) => void
  onLoad?: (templateId: string) => void
  className?: string
}

export interface ReportMetadata {
  name: string
  description?: string
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
  author?: string
  visibility?: 'private' | 'public' | 'team'
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    time?: string
    recipients?: string[]
  }
}

// ============================================
// Container Props Types
// ============================================

export interface ChartContainerProps {
  children: React.ReactNode
  options?: ChartOptions
  className?: string
  glassmorphism?: boolean
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
}

// ============================================
// Hook Return Types
// ============================================

export interface UseRealtimeMetricsReturn {
  metrics: Record<string, MetricUpdate>
  isConnected: boolean
  lastUpdate: Date | null
  refetch: () => Promise<any>
  error?: Error
}

export interface MetricUpdate {
  id: string
  value: number | string
  delta?: number
  timestamp: Date
  metadata?: Record<string, any>
}

export interface UseChartDataReturn<T = any> {
  data: T[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  updateData: (newData: T[]) => void
}

// ============================================
// Utility Types
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type ValueFormatter = (value: number | string) => string

export type DateFormatter = (date: Date | string) => string

export type ColorGetter = (value: number, min: number, max: number) => string

// ============================================
// Component Props Types (for better IDE support)
// ============================================

export interface ModernMetricCardProps extends MetricCardData {
  className?: string
  animate?: boolean
  glassmorphism?: boolean
}

export interface ModernDataTableProps<T = any> extends TableProps<T> {
  glassmorphism?: boolean
}

export interface ModernDashboardProps {
  sections?: DashboardSection[]
  className?: string
  editable?: boolean
  realtimeEnabled?: boolean
  defaultDateRange?: DateRange
}

// Re-export for backwards compatibility
export type {
  ChartConfig as ChartConfiguration,
  ChartOptions as ChartSettings,
  MetricCardData as MetricData,
  DashboardSection as DashboardConfig,
}
