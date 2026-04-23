// Check current deployment state
const https = require('https');

async function checkEndpoint(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'nauhomes.vercel.app',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Check/1.0'
      }
    };

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
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking current deployment state...\n');
  
  // Check projects API
  const projectsResult = await checkEndpoint('/api/projects');
  console.log('GET /api/projects:');
  console.log('Status:', projectsResult.status);
  console.log('Data:', projectsResult.data);
  console.log('Count:', Array.isArray(projectsResult.data) ? projectsResult.data.length : 'Not array');
  
  console.log('\n🧪 Deployment appears to be:', 
              projectsResult.status === 200 ? '✅ ACTIVE' : '❌ FAILED');
}

main();