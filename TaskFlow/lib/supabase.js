import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wimwzegtryazofxrocsw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_X6AZMbieD-8PDr_SPUD3IQ_c0EQKwlC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
