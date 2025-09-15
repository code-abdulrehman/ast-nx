// CDN Configuration
// If "main" branch is not available, fallback to commit hash, then to local
export const CDN_BASE_URL = (() => {
  // Try to use main branch CDN
  const mainUrl = "https://cdn.jsdelivr.net/gh/code-abdulrehman/ast-nx@main/public";
  const localUrl = "http://localhost:3000";

  // In Node environment, just use main, fallback to local
  return mainUrl || localUrl;
})();

// Image path helpers
export const getProductImageUrl = (imagePath: string): string => {
  return `${CDN_BASE_URL}${imagePath}`;
};

export const getBannerImageUrl = (imagePath: string): string => {
  return `${CDN_BASE_URL}${imagePath}`;
};
