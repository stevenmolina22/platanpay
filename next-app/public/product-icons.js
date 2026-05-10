/**
 * Product Image Generator v3 — Prioridad:
 * 1. imageUrl real (scrapeada por Firecrawl desde el sitio de la tienda)
 * 2. Pollinations AI con el nombre EXACTO del producto (genera una foto fiel)
 * 3. Placeholder de texto como último fallback
 */

window.iconForProduct = function(product) {
  const productName = product.name || 'Producto';
  const escapedName = productName.replace(/"/g, '&quot;');

  // ===== PRIORIDAD 1: Imagen real scrapeada del sitio =====
  if (product.imageUrl && product.imageUrl.startsWith('https://')) {
    const fallbackUrl = buildPollinationsUrl(productName);
    return `<img src="${product.imageUrl}" alt="${escapedName}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.onerror=null;this.src='${fallbackUrl}'" loading="lazy" crossorigin="anonymous" />`;
  }

  // ===== PRIORIDAD 2: Pollinations AI con nombre exacto del producto =====
  const pollinationsUrl = buildPollinationsUrl(productName);
  const placeholderUrl = `https://placehold.co/300x300/f8fafc/64748b?text=${encodeURIComponent(productName.substring(0,20))}`;

  return `<img src="${pollinationsUrl}" alt="${escapedName}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.onerror=null;this.src='${placeholderUrl}'" loading="lazy" />`;
};

function buildPollinationsUrl(productName) {
  const seed = Math.abs(hashCode(productName));
  const prompt = encodeURIComponent(productName + ', product photo, white background, studio lighting, no text, no watermark');
  return 'https://image.pollinations.ai/prompt/' + prompt + '?width=300&height=300&nologo=true&seed=' + seed;
}

// Helper: deterministic hash from string for consistent seeds
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}
