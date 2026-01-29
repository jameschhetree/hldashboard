// Test if Tailwind CSS can compile
const fs = require('fs');
const path = require('path');

console.log('Testing CSS compilation...');

const globalsPath = path.join(__dirname, 'app', 'globals.css');
if (fs.existsSync(globalsPath)) {
  const content = fs.readFileSync(globalsPath, 'utf8');
  console.log('✅ globals.css exists');
  console.log('First 100 chars:', content.substring(0, 100));
  
  if (content.includes('@tailwind')) {
    console.log('✅ Contains @tailwind directives');
  } else {
    console.log('❌ Missing @tailwind directives');
  }
} else {
  console.log('❌ globals.css not found');
}
