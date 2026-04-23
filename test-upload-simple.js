// Test upload endpoint
const https = require('https');
const FormData = require('form-data');

async function testSimpleUpload() {
  console.log('🧪 Testing upload endpoint...\n');
  
  // Create a simple form data
  const form = new FormData();
  form.append('file', Buffer.from('test file content'), 'test.jpg');
  form.append('type', 'thumbnail');
  form.append('slug', 'test-project');

  const options = {
    hostname: 'nauhomes.vercel.app',
    port: 443,
    path: '/api/upload',
    method: 'POST',
    headers: form.getHeaders()
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    
    form.pipe(req);
  });
}

async function main() {
  const result = await testSimpleUpload();
  console.log('Upload test result:');
  console.log('Status:', result.status);
  console.log('Data:', result.data);
  console.log('Success:', result.status === 200 ? '✅' : '❌');
}

main();