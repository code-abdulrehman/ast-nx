#!/usr/bin/env node

/**
 * Development Server Helper
 * This script helps manage the development server with proper timeout settings
 */

const { spawn } = require('child_process')
const path = require('path')

// Kill any existing processes on port 3000
function killPort(port) {
  return new Promise((resolve) => {
    const { exec } = require('child_process')
    exec(`lsof -ti:${port}`, (err, stdout) => {
      if (stdout) {
        exec(`kill -9 ${stdout}`, () => {
          console.log(`Killed processes on port ${port}`)
          resolve()
        })
      } else {
        resolve()
      }
    })
  })
}

// Start development server with proper settings
async function startDevServer() {
  console.log('🚀 Starting development server...')
  
  // Kill any existing processes
  await killPort(3000)
  await killPort(24678) // HMR port
  
  // Set environment variables for better performance
  process.env.NODE_ENV = 'development'
  process.env.NUXT_DEVTOOLS_ENABLED = 'true'
  process.env.NUXT_DEVTOOLS_TIMEOUT = '60000'
  
  // Start the server
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  })
  
  server.on('error', (err) => {
    console.error('Failed to start server:', err)
  })
  
  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`)
  })
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...')
    server.kill('SIGINT')
    process.exit(0)
  })
}

// Run the server
startDevServer().catch(console.error)
