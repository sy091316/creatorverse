import { createClient } from '@supabase/supabase-js';
const URL = 'https://nlbbicexjqvtiterusgr.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYmJpY2V4anF2dGl0ZXJ1c2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NTM3NzksImV4cCI6MjAzNDIyOTc3OX0.h9E2viz1aN5yVn6mi5w4dl2aXAd7tAdIgs07dCtbrF8';
export const supabase = createClient(URL, API_KEY);