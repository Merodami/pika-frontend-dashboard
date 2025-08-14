import { cva } from 'class-variance-authority'

export const sidebarVariants = cva(
  'flex flex-col bg-background border-r transition-all duration-300 ease-in-out',
  {
    variants: {
      position: {
        left: 'left-0',
        right: 'right-0',
      },
      state: {
        open: 'translate-x-0',
        closed: '-translate-x-full',
        collapsed: 'w-16',
        expanded: 'w-64',
      },
      variant: {
        default: 'bg-white border-gray-200',
        dark: 'bg-gray-900 border-gray-800',
        transparent: 'bg-white/80 backdrop-blur-lg border-gray-200/50',
      },
      size: {
        sm: 'w-56',
        md: 'w-64',
        lg: 'w-72',
        xl: 'w-80',
      },
    },
    compoundVariants: [
      {
        position: 'right',
        state: 'closed',
        className: 'translate-x-full',
      },
    ],
    defaultVariants: {
      position: 'left',
      state: 'open',
      variant: 'default',
      size: 'md',
    },
  }
)

export const sidebarItemVariants = cva(
  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group',
  {
    variants: {
      state: {
        active: 'bg-gray-100 text-gray-900 font-medium hover:bg-gray-200',
        inactive: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
        disabled: 'opacity-50 cursor-not-allowed',
      },
      size: {
        sm: 'text-sm py-1.5',
        md: 'text-base py-2',
        lg: 'text-lg py-2.5',
      },
      variant: {
        default: '',
        ghost: 'hover:bg-transparent hover:text-primary',
        subtle: 'hover:bg-gray-100/50',
      },
    },
    defaultVariants: {
      state: 'inactive',
      size: 'md',
      variant: 'default',
    },
  }
)

export const sidebarOverlayVariants = cva(
  'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
)
