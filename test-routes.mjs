// Simple test to verify routes are properly configured
// This is a basic verification script since the project doesn't have a testing framework

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if App.jsx contains all the required imports and routes
const appJsxPath = path.join(__dirname, 'src', 'App.jsx');
const appContent = fs.readFileSync(appJsxPath, 'utf8');

// List of pages that should be imported
const expectedImports = [
  'UserProfile',
  'Contribute',
  'ResearchNewDiscussion',
  'ResearchProposeProject',
  'CommunityNewPost',
  'CommunityJoin',
  'CommunityEvents',
  'CommunityRegisterEvent',
  'Privacy',
  'Terms',
  'FestivalGallery'
];

// List of routes that should be defined
const expectedRoutes = [
  '/profile/:id',
  '/contribute',
  '/community/join',
  '/community/new-post',
  '/community/events/list',
  '/community/events/register/:eventId',
  '/research/new-discussion',
  '/research/propose-project',
  '/festival-gallery',
  '/privacy-alt',
  '/terms-alt'
];

console.log('🔍 Testing route configuration...\n');

// Test imports
console.log('📦 Checking imports:');
let importPass = true;
expectedImports.forEach(importName => {
  if (appContent.includes(`import ${importName} from`)) {
    console.log(`✅ ${importName} import found`);
  } else {
    console.log(`❌ ${importName} import NOT found`);
    importPass = false;
  }
});

console.log('\n🛣️  Checking routes:');
let routePass = true;
expectedRoutes.forEach(route => {
  if (appContent.includes(`path="${route}"`)) {
    console.log(`✅ Route ${route} found`);
  } else {
    console.log(`❌ Route ${route} NOT found`);
    routePass = false;
  }
});

// Check feature flag
console.log('\n🚩 Checking feature flag:');
if (appContent.includes('showResearch: true')) {
  console.log('✅ Research feature flag enabled');
} else {
  console.log('❌ Research feature flag not properly set');
  routePass = false;
}

console.log('\n📊 Results:');
if (importPass && routePass) {
  console.log('🎉 All routes and imports are properly configured!');
  console.log('The application should build and run successfully with all routes accessible.');
} else {
  console.log('⚠️  Some issues were found with the routing configuration.');
  console.log('Please check the App.jsx file for missing imports or routes.');
}

console.log('\nTo test the routes manually:');
console.log('1. Run: npm run dev');
console.log('2. Navigate to http://localhost:5173');
console.log('3. Try accessing the new routes directly in the browser');
