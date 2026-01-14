import { createClient } from '@supabase/supabase-js';

// Safely access environment variables
const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || '';
  }
  return '';
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://ouverjherohazwadfgud.supabase.co';
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);