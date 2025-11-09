/**
 * Simple script to test Gemini API
 * Run with: node scripts/test-gemini.js
 */

const testGemini = async () => {
  try {
    console.log('🧪 Testing Gemini API...\n');
    
    // Check if running in Next.js dev server context
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const testUrl = `${baseUrl}/api/test-gemini`;
    
    console.log(`📡 Calling: ${testUrl}\n`);
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ SUCCESS! Gemini API is working correctly!\n');
      console.log('📊 Test Results:');
      console.log(`   - API Key Set: ${data.tests.apiKeySet}`);
      console.log(`   - API Key Length: ${data.tests.apiKeyLength} characters`);
      console.log(`   - Text Generation: ${data.tests.textGeneration.success ? '✅' : '❌'}`);
      console.log(`   - JSON Generation: ${data.tests.jsonGeneration.success ? '✅' : '❌'}`);
      console.log(`\n📝 Text Response: "${data.tests.textGeneration.response}"`);
      console.log(`📦 JSON Response:`, JSON.stringify(data.tests.jsonGeneration.response, null, 2));
    } else {
      console.log('❌ FAILED! Gemini API test failed.\n');
      console.log('Error:', data.error);
      console.log('Details:', data.details || data.message);
    }
  } catch (error) {
    console.error('❌ Error running test:', error.message);
    console.log('\n💡 Make sure your Next.js dev server is running:');
    console.log('   npm run dev');
  }
};

testGemini();

