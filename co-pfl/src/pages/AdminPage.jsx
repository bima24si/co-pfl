import React, { useState } from 'react'
import SectionTitleComponent from '../components/SectionTitleComponent'
import TestimoniAdmin from '../components/TestimoniAdmin'
import MitraAdmin from '../components/MitraAdmin'
import BiayaKuliahAdmin from '../components/BiayaKuliahAdmin'
import SlideshowAdmin from '../components/SlideshowAdmin'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('testimoni')

  const tabs = [
    { id: 'testimoni', label: 'Testimoni', component: <TestimoniAdmin /> },
    { id: 'mitra', label: 'Mitra', component: <MitraAdmin /> },
    { id: 'biaya', label: 'Biaya Kuliah', component: <BiayaKuliahAdmin /> },
    { id: 'slideshow', label: 'Slideshow', component: <SlideshowAdmin /> },
  ]

  return (
    <div className="py-10">
      <SectionTitleComponent title="Admin" subtitle="Kelola Data" />
      <div className="max-w-6xl mx-auto">
        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 border-b flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50 p-6 rounded-lg">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  )
}
