// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jubdhafllsljaxrfixqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YmRoYWZsbHNsamF4cmZpeHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTg5OTUsImV4cCI6MjA1MTA3NDk5NX0.qvBTRXrpZtlKFOoh-q0yS10D5xKL3Yk1hfhf6fj8pUA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);