import React from 'react'

export default function SectionTitleComponent({ title, subtitle }) {
  return (
    <div className="text-center lg:text-left mb-10">
      <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-3">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      <div className="mt-3 h-1 w-24 bg-green-600 rounded-full mx-auto lg:mx-0"></div>
    </div>
  )
}
