import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProgramStudiData from '../data/ProgramStudiData'

export default function BiayaKuliahAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ id: null, prodi_name: '', gelombang: '', nominal: '', keterangan: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase.from('biaya_kuliah').select('*').order('prodi_name', { ascending: true })
    if (error) setError(error)
    else setItems(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ id: null, prodi_name: '', gelombang: '', nominal: '', keterangan: '' })
  }

  async function handleSave(e) {
    e.preventDefault()
    setError(null)
    if (!form.prodi_name.trim() || !form.nominal) {
      setError({ message: 'Program studi dan nominal harus diisi' })
      return
    }
    const payload = { 
      prodi_name: form.prodi_name, 
      gelombang: form.gelombang, 
      nominal: Number(form.nominal), 
      keterangan: form.keterangan 
    }
    try {
      if (form.id) {
        const { error } = await supabase.from('biaya_kuliah').update(payload).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('biaya_kuliah').insert(payload)
        if (error) throw error
      }
      resetForm()
      fetchItems()
    } catch (err) {
      setError(err)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus biaya kuliah ini?')) return
    const { error } = await supabase.from('biaya_kuliah').delete().eq('id', id)
    if (error) setError(error)
    else fetchItems()
  }

  function handleEdit(item) {
    setForm({ 
      id: item.id, 
      prodi_name: item.prodi_name, 
      gelombang: item.gelombang, 
      nominal: item.nominal, 
      keterangan: item.keterangan 
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Tambah / Edit Biaya Kuliah</h3>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">{error.message || String(error)}</div>}
        <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
          <select 
            value={form.prodi_name} 
            onChange={(e) => setForm({ ...form, prodi_name: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Pilih Program Studi</option>
            {ProgramStudiData.map((prodi) => (
              <option key={prodi.id} value={prodi.nama}>{prodi.nama}</option>
            ))}
          </select>
          <input 
            placeholder="Gelombang (e.g., Reguler, Gelombang 1)" 
            value={form.gelombang} 
            onChange={(e) => setForm({ ...form, gelombang: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
          />
          <input 
            type="number" 
            placeholder="Nominal (angka saja)" 
            value={form.nominal} 
            onChange={(e) => setForm({ ...form, nominal: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          />
          <input 
            placeholder="Keterangan" 
            value={form.keterangan} 
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
          />
          <div className="flex gap-3 md:col-span-2">
            <button 
              type="submit" 
              className="px-6 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition"
            >
              Simpan
            </button>
            <button 
              type="button" 
              onClick={resetForm} 
              className="px-6 py-3 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-4">Daftar Biaya Kuliah</h3>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">Belum ada data biaya kuliah</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-2 text-left">Program Studi</th>
                  <th className="p-2 text-left">Gelombang</th>
                  <th className="p-2 text-right">Nominal</th>
                  <th className="p-2 text-left">Keterangan</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 font-semibold">{item.prodi_name}</td>
                    <td className="p-2">{item.gelombang || '-'}</td>
                    <td className="p-2 text-right">Rp {Number(item.nominal).toLocaleString('id-ID')}</td>
                    <td className="p-2 text-xs text-gray-600">{item.keterangan || '-'}</td>
                    <td className="p-2">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleEdit(item)} className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
