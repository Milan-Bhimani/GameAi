// Safe base64 encoding that handles Unicode characters
const safeBase64Encode = (str) => {
  try {
    // Use TextEncoder to handle Unicode properly
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return btoa(String.fromCharCode(...data));
  } catch (error) {
    // Fallback: remove problematic characters and try again
    const cleanStr = str.replace(/[^\x00-\x7F]/g, "");
    return btoa(cleanStr);
  }
};

// Generate SVG placeholder images
export const generatePlaceholderImage = (width, height, text, bgColor = '#e8eaed', textColor = '#5f6368') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="45%" text-anchor="middle" dy=".3em" fill="${textColor}" font-family="Arial, sans-serif" font-size="14" font-weight="500">${text}</text>
    <circle cx="50%" cy="60%" r="8" fill="${textColor}" opacity="0.3"/>
  </svg>`;
  
  // Use URL encoding instead of base64 to avoid Unicode issues
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

export const generateGradientPlaceholder = (width, height, text) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${Math.random().toString(36).substr(2, 9)}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a73e8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4285f4;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad${Math.random().toString(36).substr(2, 9)})"/>
    <circle cx="50%" cy="45%" r="12" fill="white" opacity="0.9"/>
    <text x="50%" y="55%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="500">${text}</text>
  </svg>`;
  
  // Use URL encoding instead of base64 to avoid Unicode issues
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
};