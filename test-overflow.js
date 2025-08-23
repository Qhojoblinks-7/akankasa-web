#!/usr/bin/env node

/**
 * AkanKasa Overflow Protection Test Script
 * 
 * This script tests for common overflow issues in the codebase.
 * Run with: node test-overflow.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results
let results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  total: 0
};

// Helper function to log with colors
function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

// Helper function to check if file contains required patterns
function checkFile(filePath, requiredPatterns, optionalPatterns = []) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check required patterns
    requiredPatterns.forEach(pattern => {
      if (!content.includes(pattern)) {
        issues.push(`Missing required: ${pattern}`);
      }
    });
    
    // Check optional patterns
    optionalPatterns.forEach(pattern => {
      if (!content.includes(pattern)) {
        issues.push(`Missing optional: ${pattern}`);
      }
    });
    
    return {
      path: filePath,
      issues,
      hasIssues: issues.length > 0
    };
  } catch (error) {
    return {
      path: filePath,
      issues: [`File read error: ${error.message}`],
      hasIssues: true
    };
  }
}

// Test specific files for overflow protection
function testSpecificFiles() {
  log(colors.blue, '\n🔍 Testing specific files for overflow protection...\n');
  
  const testFiles = [
    {
      path: 'src/App.jsx',
      required: ['overflow-x-hidden'],
      description: 'Main App component'
    },
    {
      path: 'src/components/layout/Navbar.jsx',
      required: ['overflow-hidden', 'break-words'],
      description: 'Navigation component'
    },
    {
      path: 'src/pages/Homepage.jsx',
      required: ['overflow-x-hidden', 'overflow-hidden', 'break-words'],
      description: 'Homepage component'
    },
    {
      path: 'src/pages/CultureHighlights.jsx',
      required: ['overflow-hidden'],
      description: 'Culture highlights component'
    },
    {
      path: 'src/index.css',
      required: ['overflow-x: hidden', 'box-sizing: border-box'],
      description: 'Global CSS'
    }
  ];
  
  testFiles.forEach(test => {
    const result = checkFile(test.path, test.required);
    results.total++;
    
    if (result.hasIssues) {
      log(colors.red, `❌ ${test.description} (${test.path})`);
      result.issues.forEach(issue => {
        log(colors.red, `   ${issue}`);
      });
      results.failed++;
    } else {
      log(colors.green, `✅ ${test.description} (${test.path})`);
      results.passed++;
    }
  });
}

// Test for common overflow issues in JSX files
function testJSXFiles() {
  log(colors.blue, '\n🔍 Scanning JSX files for potential overflow issues...\n');
  
  const jsxFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
        jsxFiles.push(fullPath);
      }
    });
  }
  
  try {
    scanDirectory('src');
  } catch (error) {
    log(colors.yellow, `⚠️  Could not scan src directory: ${error.message}`);
    return;
  }
  
  const overflowIssues = [];
  
  jsxFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for potential overflow issues
      const issues = [];
      
      // Check for fixed widths that might cause overflow
      if (content.includes('width:') || content.includes('min-width:') || content.includes('max-width:')) {
        if (!content.includes('overflow') && !content.includes('max-w-')) {
          issues.push('Fixed width without overflow protection');
        }
      }
      
      // Check for long text without break-words
      if (content.includes('className=') && !content.includes('break-words')) {
        if (content.includes('text-') && content.includes('font-')) {
          issues.push('Text styling without break-words protection');
        }
      }
      
      // Check for grid layouts without overflow protection
      if (content.includes('grid-cols-') && !content.includes('overflow-hidden')) {
        issues.push('Grid layout without overflow protection');
      }
      
      if (issues.length > 0) {
        overflowIssues.push({
          file: filePath,
          issues
        });
      }
    } catch (error) {
      // Skip files that can't be read
    }
  });
  
  if (overflowIssues.length > 0) {
    log(colors.yellow, `⚠️  Found ${overflowIssues.length} files with potential overflow issues:`);
    overflowIssues.forEach(file => {
      log(colors.yellow, `\n   ${file.file}:`);
      file.issues.forEach(issue => {
        log(colors.yellow, `     - ${issue}`);
      });
    });
    results.warnings += overflowIssues.length;
  } else {
    log(colors.green, '✅ No obvious overflow issues found in JSX files');
  }
}

// Test CSS files for overflow protection
function testCSSFiles() {
  log(colors.blue, '\n🔍 Testing CSS files for overflow protection...\n');
  
  const cssFiles = [
    'src/index.css',
    'tailwind.config.js'
  ];
  
  cssFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const result = checkFile(filePath, ['overflow'], ['box-sizing']);
      results.total++;
      
      if (result.hasIssues) {
        log(colors.red, `❌ CSS file (${filePath})`);
        result.issues.forEach(issue => {
          log(colors.red, `   ${issue}`);
        });
        results.failed++;
      } else {
        log(colors.green, `✅ CSS file (${filePath})`);
        results.passed++;
      }
    }
  });
}

// Check for documentation
function checkDocumentation() {
  log(colors.blue, '\n🔍 Checking overflow protection documentation...\n');
  
  const docs = [
    'OVERFLOW_PROTECTION.md',
    'README.md'
  ];
  
  docs.forEach(doc => {
    if (fs.existsSync(doc)) {
      const content = fs.readFileSync(doc, 'utf8');
      if (content.includes('overflow') || content.includes('Overflow')) {
        log(colors.green, `✅ Documentation found: ${doc}`);
        results.passed++;
      } else {
        log(colors.yellow, `⚠️  Documentation may need overflow protection content: ${doc}`);
        results.warnings++;
      }
    } else {
      log(colors.red, `❌ Documentation missing: ${doc}`);
      results.failed++;
    }
    results.total++;
  });
}

// Main test function
function runTests() {
  log(colors.cyan, '🚀 AkanKasa Overflow Protection Test Suite');
  log(colors.cyan, '==========================================\n');
  
  testSpecificFiles();
  testJSXFiles();
  testCSSFiles();
  checkDocumentation();
  
  // Summary
  log(colors.cyan, '\n📊 Test Summary');
  log(colors.cyan, '================');
  log(colors.green, `✅ Passed: ${results.passed}`);
  log(colors.red, `❌ Failed: ${results.failed}`);
  log(colors.yellow, `⚠️  Warnings: ${results.warnings}`);
  log(colors.blue, `📊 Total: ${results.total}`);
  
  if (results.failed > 0) {
    log(colors.red, '\n🚨 Some tests failed! Please fix overflow protection issues.');
    process.exit(1);
  } else if (results.warnings > 0) {
    log(colors.yellow, '\n⚠️  Tests passed with warnings. Review potential issues.');
    process.exit(0);
  } else {
    log(colors.green, '\n🎉 All tests passed! Overflow protection is properly implemented.');
    process.exit(0);
  }
}

// Run tests
runTests();