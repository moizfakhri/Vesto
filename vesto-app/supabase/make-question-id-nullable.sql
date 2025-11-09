-- Make question_id nullable in user_answers table
-- This allows saving answers for hardcoded questions that don't exist in ai_generated_questions table

-- Drop the foreign key constraint first
ALTER TABLE user_answers 
  DROP CONSTRAINT IF EXISTS user_answers_question_id_fkey;

-- Make question_id nullable
ALTER TABLE user_answers 
  ALTER COLUMN question_id DROP NOT NULL;

-- Re-add the foreign key constraint but allow NULL values
ALTER TABLE user_answers 
  ADD CONSTRAINT user_answers_question_id_fkey 
  FOREIGN KEY (question_id) 
  REFERENCES ai_generated_questions(id) 
  ON DELETE CASCADE;

