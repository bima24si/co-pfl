import React from 'react'

export default function FooterComponent() {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <div className="text-xl font-bold text-green-600">PCR</div>
            <p className="text-sm text-gray-600 mt-2">Politeknik Caltex Riau — Membentuk profesional masa depan.</p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-2 text-sm space-y-1">
                <li><a href="#" className="hover:text-green-600">Beranda</a></li>
                <li><a href="#" className="hover:text-green-600">Program Studi</a></li>
                <li><a href="#" className="hover:text-green-600">Kursus</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Contact</h4>
              <ul className="mt-2 text-sm space-y-1">
                <li>Email: info@pcr.ac.id</li>
                <li>Tel: (0761) 000-000</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Politeknik Caltex Riau. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
