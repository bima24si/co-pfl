import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="rounded-[2rem] bg-white p-10 shadow-lg text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Halaman tidak ditemukan</h1>
      <p className="text-gray-600 mb-8">Maaf, halaman yang kamu cari tidak ada.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-white font-semibold shadow hover:bg-green-700 transition"
      >
        Kembali ke Home
      </Link>
    </div>
  )
}
