import React from 'react'
import { Link } from 'react-router-dom'
import SectionTitleComponent from '../components/SectionTitleComponent'
import ProgramStudiCardComponent from '../components/ProgramStudiCardComponent'
import ProgramStudiData from '../data/ProgramStudiData'

export default function HomePage() {
  return (
    <div className="space-y-16 py-10">
      <section className="rounded-[2rem] bg-green-600/10 p-10 md:p-14 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-green-600 font-semibold mb-4">Selamat datang</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Politeknik Caltex Riau</h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Temukan program studi unggulan kami dan mulai perjalanan kariermu di dunia teknologi, industri, dan ilmu terapan.
          </p>
          <Link
            to="/prodi"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-white font-semibold shadow-lg hover:bg-green-700 transition"
          >
            Lihat Program Studi
          </Link>
        </div>
      </section>

      <section>
        <SectionTitleComponent title="Program Studi" subtitle="Pilihan Prodi" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {ProgramStudiData.map((prodi) => (
            <ProgramStudiCardComponent
              key={prodi.id}
              nama={prodi.nama}
              deskripsi={prodi.deskripsi}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
