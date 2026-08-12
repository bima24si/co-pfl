import React from 'react'

export default function ProgramStudiCardComponent({ nama, deskripsi }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{nama}</h3>
      <p className="text-gray-600 leading-relaxed">{deskripsi}</p>
    </div>
  )
}
