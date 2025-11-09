# Testing Gemini API

## Method 1: Browser/API Test (Easiest)

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/api/test-gemini
   ```

3. You should see a JSON response with test results.

## Method 2: Using curl

```bash
curl http://localhost:3000/api/test-gemini
```

## Method 3: Using the test script

```bash
node scripts/test-gemini.js
```

## What the test checks:

✅ API key is set in environment variables
✅ API key has valid length
✅ Text generation works (simple prompt)
✅ JSON generation works (used for grading)

## Expected Success Response:

```json
{
  "success": true,
  "message": "Gemini API is working correctly!",
  "tests": {
    "apiKeySet": true,
    "apiKeyLength": 39,
    "textGeneration": {
      "prompt": "Say \"Hello, Gemini API is working!\" in exactly 10 words or less.",
      "response": "Hello, Gemini API is working!",
      "success": true
    },
    "jsonGeneration": {
      "prompt": "Return a JSON object...",
      "response": {
        "status": "success",
        "message": "API is working",
        "test": true
      },
      "success": true
    }
  }
}
```

## Common Issues:

❌ **"GOOGLE_GENERATIVE_AI_API_KEY is not set"**
   - Check your `.env.local` file exists
   - Make sure it contains: `GOOGLE_GENERATIVE_AI_API_KEY=your_key_here`
   - Restart your dev server after adding the key

❌ **"API key appears to be invalid"**
   - Verify your API key is correct
   - Get a new key from: https://aistudio.google.com/app/apikey

❌ **Network/Connection errors**
   - Check your internet connection
   - Verify the API key has proper permissions
