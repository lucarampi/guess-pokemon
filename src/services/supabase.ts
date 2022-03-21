import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.exit(1)
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.exit(1)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

