import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function makeNoopClient() {
	const noop = () => ({ data: null, error: new Error('Supabase not configured') })
	return {
		from: () => ({
			select: async () => ({ data: [], error: null }),
			insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
			update: async () => ({ data: null, error: new Error('Supabase not configured') }),
			delete: async () => ({ data: null, error: new Error('Supabase not configured') }),
		}),
		auth: { signIn: noop, signOut: noop },
	}
}

let supabase
if (!supabaseUrl || !supabaseAnonKey) {
	console.warn('[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Create .env with these values or copy from .env.example')
	supabase = makeNoopClient()
} else {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
export default supabase
