// Debug API endpoints
const https = require('https');

async function testAPI(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'nauhomes.vercel.app',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Debug/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData, headers: res.headers });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function debugAPIs() {
  console.log('🔍 Debugging Nirvana Homes APIs...\n');

  // Test projects API
  console.log('1. Testing GET /api/projects');
  try {
    const response = await testAPI('/api/projects');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, response.data);
    console.log(`Projects count: ${Array.isArray(response.data) ? response.data.length : 'Not an array'}\n`);
  } catch (error) {
    console.log(`Error: ${error.message}\n`);
  }

  // Test upload API with fake data
  console.log('2. Testing POST /api/upload (simulation)');
  try {
    // This will test the endpoint without actual file
    const response = await testAPI('/api/upload', 'POST', {});
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, response.data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  
  console.log('\n3. Testing project creation');
  try {
    const testProject = {
      title: 'Debug Test Project',
      subtitle: 'API Debugging',
      location: 'delhi',
      status: 'ongoing',
      description: 'Testing API functionality'
    };
    
    const response = await testAPI('/api/projects', 'POST', testProject);
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, response.data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

debugAPIs();