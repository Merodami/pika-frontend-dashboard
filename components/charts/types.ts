/**
 * Chart component types - re-exported from analytics types
 * This file maintains backwards compatibility
 */

export type {
  // Base Types
  TremorColor as Color,
  SimplifiedColor,
  ChartSize,
  ChartType,
  DeltaType,
  CurveType,
  ExportFormat,

  // Data Types
  BaseChartData as ChartData,
  TimeSeriesDataPoint as TimeSeriesData,
  CategoryDataPoint as CategoryData,
  DonutDataPoint as DonutData,
  HeatmapDataPoint,
  ScatterDataPoint,
  FunnelDataPoint,

  // Chart Configurations
  ChartConfig,
  LineChartConfig,
  AreaChartConfig,
  BarChartConfig,
  DonutChartConfig,
  SparklineChartConfig,
  HeatmapChartConfig,
  ScatterChartConfig,
  FunnelChartConfig,
  RadialChartConfig,

  // Options and Controls
  ChartOptions,
  ChartFilter,
  DateRange,
  FilterOption,

  // Metric and Dashboard Types
  MetricCardData,
  TrendData,
  DashboardSection,
  DashboardChart,
  DashboardTable,

  // Table Types
  TableColumn,
  TableAction,
  TableFilter,
  TableProps,

  // Report Types
  ReportTemplate,
  ReportBuilderProps,
  ReportMetadata,

  // Container Props
  ChartContainerProps,

  // Component Props
  ModernMetricCardProps,
  ModernDataTableProps,
  ModernDashboardProps,
} from '@/types/analytics'
