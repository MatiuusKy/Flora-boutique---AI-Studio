/**
 * Analytics and Tracking Utility for Flora Boutique
 * Supports Google Ads (gtag) and Meta Pixel (fbq)
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GOOGLE_ADS_ID || '';
export const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

// Initialize GTM and Meta Pixel events
export const trackPageView = (url: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const utm_term = searchParams.get('utm_term');
  const utm_source = searchParams.get('utm_source');

  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      utm_term: utm_term,
      utm_source: utm_source
    });
  }
  if (window.fbq) {
    window.fbq('track', 'PageView', {
      utm_term: utm_term
    });
  }
};

export const trackEvent = (name: string, options: any = {}) => {
  // Google Ads / Analytics
  if (window.gtag) {
    window.gtag('event', name, options);
  }
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', name, options);
  }
};

// Ecommerce specific events
export const analytics = {
  // Track search terms
  search: (searchTerm: string) => {
    trackEvent('Search', { search_term: searchTerm });
  },

  // Track product view
  viewContent: (id: string, name: string, price: number, category?: string) => {
    trackEvent('ViewContent', {
      content_ids: [id],
      content_name: name,
      content_type: 'product',
      value: price,
      currency: 'CLP',
      content_category: category
    });
  },

  // Track add to cart
  addToCart: (id: string, name: string, price: number) => {
    trackEvent('AddToCart', {
      content_ids: [id],
      content_name: name,
      content_type: 'product',
      value: price,
      currency: 'CLP'
    });
  },

  // Track start checkout
  initiateCheckout: (value: number, numItems: number) => {
    trackEvent('InitiateCheckout', {
      value: value,
      currency: 'CLP',
      num_items: numItems
    });
  },

  // Track purchase (Sale)
  purchase: (transactionId: string, value: number, items: any[]) => {
    trackEvent('Purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'CLP',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      // For Google Ads conversion tracking
      send_to: `${GA_TRACKING_ID}/YOUR_CONVERSION_LABEL` 
    });
  }
};
