// Test fallback data loading
const fs = require('fs');
const path = require('path');

// Simulate the fallback data loading
function testFallbackData() {
  console.log('🧪 Testing fallback data loading...\n');
  
  try {
    // Read the fallback data file
    const fallbackPath = path.join(__dirname, 'src/lib/fallback-data.ts');
    const content = fs.readFileSync(fallbackPath, 'utf-8');
    
    console.log('✅ Fallback data file exists');
    console.log('Content preview:');
    console.log(content.substring(0, 500) + '...\n');
    
    // Check if it contains expected data
    const hasLuxuryVilla = content.includes('Luxury Villa GK-1');
    const hasEcoVilla = content.includes('Eco Villa Bali');
    
    console.log('Content validation:');
    console.log('Has Luxury Villa:', hasLuxuryVilla ? '✅' : '❌');
    console.log('Has Eco Villa:', hasEcoVilla ? '✅' : '❌');
    
    if (hasLuxuryVilla && hasEcoVilla) {
      console.log('\n🎉 Fallback data looks correct!');
    } else {
      console.log('\n⚠️ Fallback data may be incomplete');
    }
    
  } catch (error) {
    console.log('❌ Error reading fallback data:', error.message);
  }
}

// Check if the projects-db file exists and looks correct
function testProjectsDb() {
  console.log('\n🔍 Testing projects-db.ts...\n');
  
  try {
    const dbPath = path.join(__dirname, 'src/lib/projects-db.ts');
    const content = fs.readFileSync(dbPath, 'utf-8');
    
    console.log('✅ Projects-db file exists');
    
    const hasImport = content.includes('from \'@/lib/fallback-data\'');
    const hasGetProjects = content.includes('export async function getProjects');
    const hasFallback = content.includes('fallbackProjects');
    
    console.log('Function validation:');
    console.log('Has fallback import:', hasImport ? '✅' : '❌');
    console.log('Has getProjects function:', hasGetProjects ? '✅' : '❌');
    console.log('Uses fallbackProjects:', hasFallback ? '✅' : '❌');
    
    if (hasImport && hasGetProjects && hasFallback) {
      console.log('\n🎉 Projects-db looks correct!');
    } else {
      console.log('\n⚠️ Projects-db may have issues');
    }
    
  } catch (error) {
    console.log('❌ Error reading projects-db:', error.message);
  }
}

testFallbackData();
testProjectsDb();

console.log('\n📊 Summary:');
console.log('If both files look correct but API returns empty array,');
console.log('the issue may be in the deployment or import resolution.');