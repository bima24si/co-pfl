import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function MitraAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ id: null, name: '', logo_url: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase.from('mitra').select('*').order('created_at', { ascending: true })
    if (error) setError(error)
    else setItems(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ id: null, name: '', logo_url: '' })
  }

  async function handleSave(e) {
    e.preventDefault()
    setError(null)
    if (!form.name.trim()) {
      setError({ message: 'Nama mitra harus diisi' })
      return
    }
    const payload = { name: form.name, logo_url: form.logo_url }
    try {
      if (form.id) {
        const { error } = await supabase.from('mitra').update(payload).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('mitra').insert(payload)
        if (error) throw error
      }
      resetForm()
      fetchItems()
    } catch (err) {
      setError(err)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus mitra ini?')) return
    const { error } = await supabase.from('mitra').delete().eq('id', id)
    if (error) setError(error)
    else fetchItems()
  }

  function handleEdit(item) {
    setForm({ id: item.id, name: item.name, logo_url: item.logo_url })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Tambah / Edit Mitra</h3>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">{error.message || String(error)}</div>}
        <form onSubmit={handleSave} className="grid gap-4">
          <input 
            placeholder="Nama Mitra" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
            required
          />
          <input 
            placeholder="Logo URL" 
            value={form.logo_url} 
            onChange={(e) => setForm({ ...form, logo_url: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
          />
          <div className="flex gap-3">
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
        <h3 className="font-semibold mb-4">Daftar Mitra</h3>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">Belum ada mitra</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3 flex-1">
                  {item.logo_url && (
                    <img 
                      src={item.logo_url} 
                      alt={item.name} 
                      className="h-12 w-auto object-contain"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  )}
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.logo_url}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
