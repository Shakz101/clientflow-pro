import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jubdhafllsljaxrfixqs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YmRoYWZsbHNsamF4cmZpeHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTg5OTUsImV4cCI6MjA1MTA3NDk5NX0.qvBTRXrpZtlKFOoh-q0yS10D5xKL3Yk1hfhf6fj8pUA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);