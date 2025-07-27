// Check if favicon files are accessible
const faviconPaths = [
  '/favicon.png',
  '/favicon-fallback.svg',
  '/manifest.json'
];

async function checkFavicons() {
  console.log('🔍 Checking favicon accessibility...');
  
  for (const path of faviconPaths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        console.log(`✅ ${path} - OK (${response.status})`);
      } else {
        console.log(`❌ ${path} - Failed (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ ${path} - Error: ${error.message}`);
    }
  }
  
  // Check if favicon is actually displayed
  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    console.log(`🔗 Current favicon link: ${faviconLink.href}`);
  } else {
    console.log('❌ No favicon link found in DOM');
  }
}

// Run the check
checkFavicons();