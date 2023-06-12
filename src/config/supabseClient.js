import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_URL;
const supabaseAPIKey = process.env.REACT_APP_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAPIKey);

export default supabase;