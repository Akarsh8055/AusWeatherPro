import React from 'react'

export function Toaster() {
  return (
    <div 
      id="toast-container" 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
    />
  )
}

export function toast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toastElement = document.createElement('div')
  toastElement.className = `
    glass-card px-4 py-3 rounded-lg text-white text-sm font-medium
    transform transition-all duration-300 ease-in-out
    ${type === 'success' ? 'bg-green-500/20 border-green-400/30' : ''}
    ${type === 'error' ? 'bg-red-500/20 border-red-400/30' : ''}
    ${type === 'info' ? 'bg-blue-500/20 border-blue-400/30' : ''}
  `
  toastElement.textContent = message

  container.appendChild(toastElement)

  // Animate in
  setTimeout(() => {
    toastElement.style.transform = 'translateX(0) scale(1)'
    toastElement.style.opacity = '1'
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    toastElement.style.transform = 'translateX(100%) scale(0.8)'
    toastElement.style.opacity = '0'
    setTimeout(() => {
      if (container.contains(toastElement)) {
        container.removeChild(toastElement)
      }
    }, 300)
  }, 3000)
}