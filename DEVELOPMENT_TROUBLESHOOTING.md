# Development Troubleshooting Guide

## Chrome DevTools Timeout Issues

If you're experiencing `Network.enable timed out` errors with Chrome DevTools, follow these steps:

### Quick Fixes

1. **Use the optimized dev script:**
   ```bash
   npm run dev:timeout
   ```

2. **Or use the clean dev script:**
   ```bash
   npm run dev:clean
   ```

3. **Clear browser cache and restart:**
   - Close Chrome completely
   - Clear browser cache
   - Restart Chrome
   - Try again

### Advanced Solutions

#### Option 1: Increase Chrome Timeout
1. Close Chrome completely
2. Start Chrome with increased timeout:
   ```bash
   google-chrome --disable-web-security --disable-features=VizDisplayCompositor --remote-debugging-port=9222 --user-data-dir=/tmp/chrome_dev_session
   ```

#### Option 2: Use Different Port
```bash
npm run dev -- --port 3001
```

#### Option 3: Disable DevTools Temporarily
In `nuxt.config.ts`, set:
```typescript
devtools: { enabled: false }
```

### Configuration Changes Made

The following optimizations have been added to fix timeout issues:

1. **Increased timeouts** to 60 seconds
2. **Optimized HMR settings** for better performance
3. **Added proper server configuration** with timeout settings
4. **Created alternative dev scripts** with better error handling

### Environment Variables

Set these environment variables for better performance:
```bash
export NUXT_DEVTOOLS_TIMEOUT=60000
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| DevTools timeout | Use `npm run dev:timeout` |
| Port already in use | Use `npm run dev:clean` |
| HMR not working | Restart server and clear browser cache |
| Slow performance | Increase Node.js memory with `NODE_OPTIONS` |

### Performance Tips

1. **Close unnecessary browser tabs**
2. **Disable browser extensions** during development
3. **Use incognito mode** for testing
4. **Clear browser cache** regularly
5. **Restart development server** if issues persist

### If All Else Fails

1. **Kill all Node processes:**
   ```bash
   pkill -f node
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Start fresh:**
   ```bash
   npm run dev:clean
   ```
