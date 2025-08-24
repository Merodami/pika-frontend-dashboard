'use client'

export function EmptySlot() {
  return (
    <div
      className="h-full min-h-[200px] opacity-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Invisible placeholder to maintain grid layout */}
      <div className="h-full border-2 border-transparent" />
    </div>
  )
}
