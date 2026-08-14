import React from 'react'

const VARIANTS = {
  primary:
    'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-200',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  outline:
    'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50',
}

export default function ButtonComponent({
  label,
  variant = 'primary',
  color,
  icon,
  onClick,
  className = '',
  type = 'button',
}) {
  const variantClasses = VARIANTS[variant] || VARIANTS.primary

  const style = {}
  if (color && variant === 'primary') style.backgroundColor = color

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={
        `inline-flex items-center gap-2 font-medium rounded-lg px-4 py-2 transition-shadow shadow-sm focus:outline-none ${variantClasses} ${className}`
      }
    >
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
      <span>{label}</span>
    </button>
  )
}
