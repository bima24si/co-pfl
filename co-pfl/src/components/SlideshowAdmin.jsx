import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SlideshowAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ id: null, title: '', subtitle: '', image_url: '', order_index: 0 })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase.from('slideshow').select('*').order('order_index', { ascending: true })
    if (error) setError(error)
    else setItems(data || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ id: null, title: '', subtitle: '', image_url: '', order_index: 0 })
  }

  async function handleSave(e) {
    e.preventDefault()
    setError(null)
    if (!form.title.trim()) {
      setError({ message: 'Judul slide harus diisi' })
      return
    }
    const payload = { 
      title: form.title, 
      subtitle: form.subtitle, 
      image_url: form.image_url, 
      order_index: Number(form.order_index) 
    }
    try {
      if (form.id) {
        const { error } = await supabase.from('slideshow').update(payload).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('slideshow').insert(payload)
        if (error) throw error
      }
      resetForm()
      fetchItems()
    } catch (err) {
      setError(err)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Hapus slide ini?')) return
    const { error } = await supabase.from('slideshow').delete().eq('id', id)
    if (error) setError(error)
    else fetchItems()
  }

  function handleEdit(item) {
    setForm({ 
      id: item.id, 
      title: item.title, 
      subtitle: item.subtitle || '', 
      image_url: item.image_url || '', 
      order_index: item.order_index 
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Tambah / Edit Slideshow</h3>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">{error.message || String(error)}</div>}
        <form onSubmit={handleSave} className="grid gap-4">
          <input 
            placeholder="Judul Slide" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
            required
          />
          <input 
            placeholder="Subtitle" 
            value={form.subtitle} 
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
          />
          <textarea 
            placeholder="Image URL" 
            value={form.image_url} 
            onChange={(e) => setForm({ ...form, image_url: e.target.value })} 
            className="p-3 border-2 border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" 
            rows="3"
          />
          <input 
            type="number" 
            placeholder="Urutan (0, 1, 2, ...)" 
            value={form.order_index} 
            onChange={(e) => setForm({ ...form, order_index: e.target.value })} 
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
        <h3 className="font-semibold mb-4">Daftar Slideshow</h3>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">Belum ada slide</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="p-3 border rounded">
                <div className="flex gap-3">
                  {item.image_url && (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="h-24 w-32 object-cover rounded"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    {item.subtitle && <div className="text-sm text-gray-600">{item.subtitle}</div>}
                    <div className="text-xs text-gray-500 mt-1">Urutan: {item.order_index}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
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
