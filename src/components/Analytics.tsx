import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, GA_TRACKING_ID, PIXEL_ID } from '@/lib/analytics';

/**
 * Analytics Component
 * Renders the required scripts and tracks route changes
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Inject Google Ads Tag
    if (GA_TRACKING_ID && !document.getElementById('gtag-js')) {
      const script = document.createElement('script');
      script.id = 'gtag-js';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(inlineScript);
    }

    // Inject Meta Pixel
    if (PIXEL_ID && !document.getElementById('meta-pixel')) {
      const script = document.createElement('script');
      script.id = 'meta-pixel';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" />
      `;
      document.body.appendChild(noscript);
    }
  }, []);

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default Analytics;
