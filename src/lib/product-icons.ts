import type { Offer } from "@/lib/platanpay-state";

export function productImageUrl(productName: string) {
  const seed = Math.abs(hashCode(productName));
  const prompt = encodeURIComponent(`${productName}, product photo, white background, studio lighting, no text, no watermark`);
  return `https://image.pollinations.ai/prompt/${prompt}?width=300&height=300&nologo=true&seed=${seed}`;
}

export function productFallbackUrl(productName: string) {
  return `https://placehold.co/300x300/f8fafc/64748b?text=${encodeURIComponent(productName.substring(0, 20))}`;
}

export function getOfferImageSource(offer: Offer) {
  if (offer.imageUrl?.startsWith("https://")) return offer.imageUrl;
  return productImageUrl(offer.product);
}

function hashCode(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}
