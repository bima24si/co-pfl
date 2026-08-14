import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProgramStudiData from '../data/ProgramStudiData'

export default function TestimoniAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ id: null, name: '', role: '', content: '', avatar_url: '', rating: 5 })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase.from('testimoni').select('*').order('created_at', { ascending: false })
    if (error) setError(error)
    else setItems(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ id: null, name: '', role: '', content: '', avatar_url: '', rating: 5 })
  }

  async function handleSave(e) {
    e.preventDefault()
    setError(null)
    const payload = { name: form.name, role: form.role, content: form.content, avatar_url: form.avatar_url, rating: Number(form.rating) }
    try {
      if (form.id) {
        const { error } = await supabase.from('testimoni').update(payload).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('testimoni').insert(payload)
        if (error) throw error
      }
      resetForm()
      fetchItems()
    } catch (err) {
      setError(err)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus testimoni ini?')) return
    const { error } = await supabase.from('testimoni').delete().eq('id', id)
    if (error) setError(error)
    else fetchItems()
  }

  function handleEdit(item) {
    setForm({ id: item.id, name: item.name, role: item.role, content: item.content, avatar_url: item.avatar_url, rating: item.rating })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Tambah / Edit Testimoni</h3>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">{error.message || String(error)}</div>}
        <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
          <input 
            placeholder="Nama" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
            required
          />
          <select 
            value={form.role} 
            onChange={(e) => setForm({ ...form, role: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Pilih Program Studi</option>
            {ProgramStudiData.map((prodi) => (
              <option key={prodi.id} value={prodi.nama}>{prodi.nama}</option>
            ))}
          </select>
          <input 
            placeholder="Avatar URL" 
            value={form.avatar_url} 
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 md:col-span-2" 
          />
          <textarea 
            placeholder="Content" 
            value={form.content} 
            onChange={(e) => setForm({ ...form, content: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 md:col-span-2" 
            rows="4"
            required
          />
          <input 
            type="number" 
            min={1} 
            max={5} 
            placeholder="Rating (1-5)" 
            value={form.rating} 
            onChange={(e) => setForm({ ...form, rating: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
          />
          <div className="flex items-center gap-2 md:col-span-2">
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

      <div className="p-6 bg-white rounded shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Daftar Testimoni</h3>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">Belum ada testimoni</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-800">Nama</th>
                  <th className="p-3 text-left font-semibold text-gray-800">Program Studi</th>
                  <th className="p-3 text-left font-semibold text-gray-800">Konten</th>
                  <th className="p-3 text-center font-semibold text-gray-800">Rating</th>
                  <th className="p-3 text-center font-semibold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {it.avatar_url && (
                          <img 
                            src={it.avatar_url} 
                            alt={it.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                          />
                        )}
                        <span className="font-semibold text-gray-800">{it.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{it.role}</td>
                    <td className="p-3 text-gray-700 max-w-xs truncate">{it.content}</td>
                    <td className="p-3 text-center">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold">
                        {it.rating} ⭐
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => handleEdit(it)} 
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition font-semibold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(it.id)} 
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition font-semibold"
                        >
                          Hapus
                        </button>
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
