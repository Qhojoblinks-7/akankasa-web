import { useEffect, useState } from 'react';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    ttfb: null, // Time to First Byte
    loadTime: null, // Total page load time
    memoryUsage: null, // Memory usage (if available)
    networkType: null, // Network connection type
    devicePixelRatio: null, // Device pixel ratio
    viewportSize: null, // Viewport dimensions
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const updateMetrics = () => {
      const newMetrics = { ...metrics };

      // Get viewport size
      newMetrics.viewportSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Get device pixel ratio
      newMetrics.devicePixelRatio = window.devicePixelRatio;

      // Get network information if available
      if ('connection' in navigator) {
        const connection = navigator.connection;
        newMetrics.networkType = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        };
      }

      // Get memory usage if available
      if ('memory' in performance) {
        newMetrics.memoryUsage = {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
        };
      }

      setMetrics(newMetrics);
    };

    // Update metrics on load and resize
    updateMetrics();
    window.addEventListener('load', updateMetrics);
    window.addEventListener('resize', updateMetrics);

    // Performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    }

    // Measure TTFB and load time
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        }));
      }
    }

    return () => {
      window.removeEventListener('load', updateMetrics);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  // Performance score calculator
  const getPerformanceScore = () => {
    let score = 100;
    
    // FCP scoring (0-100)
    if (metrics.fcp !== null) {
      if (metrics.fcp < 1800) score -= 0;
      else if (metrics.fcp < 3000) score -= 10;
      else score -= 30;
    }

    // LCP scoring (0-100)
    if (metrics.lcp !== null) {
      if (metrics.lcp < 2500) score -= 0;
      else if (metrics.lcp < 4000) score -= 10;
      else score -= 30;
    }

    // FID scoring (0-100)
    if (metrics.fid !== null) {
      if (metrics.fid < 100) score -= 0;
      else if (metrics.fid < 300) score -= 10;
      else score -= 30;
    }

    // CLS scoring (0-100)
    if (metrics.cls !== null) {
      if (metrics.cls < 0.1) score -= 0;
      else if (metrics.cls < 0.25) score -= 10;
      else score -= 30;
    }

    return Math.max(0, score);
  };

  // Get performance recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (metrics.fcp && metrics.fcp > 3000) {
      recommendations.push('First Contentful Paint is slow. Consider optimizing critical rendering path.');
    }

    if (metrics.lcp && metrics.lcp > 4000) {
      recommendations.push('Largest Contentful Paint is slow. Optimize images and reduce render-blocking resources.');
    }

    if (metrics.fid && metrics.fid > 300) {
      recommendations.push('First Input Delay is high. Reduce JavaScript execution time.');
    }

    if (metrics.cls && metrics.cls > 0.25) {
      recommendations.push('Cumulative Layout Shift is high. Avoid layout shifts during page load.');
    }

    if (metrics.memoryUsage && metrics.memoryUsage.used > 100) {
      recommendations.push('High memory usage detected. Consider optimizing memory-intensive operations.');
    }

    if (metrics.networkType && metrics.networkType.effectiveType === 'slow-2g') {
      recommendations.push('Slow network detected. Implement aggressive caching and compression.');
    }

    return recommendations;
  };

  return {
    metrics,
    performanceScore: getPerformanceScore(),
    recommendations: getRecommendations(),
    isMobile: metrics.viewportSize?.width < 768,
    isSlowNetwork: metrics.networkType?.effectiveType === 'slow-2g' || metrics.networkType?.effectiveType === '2g',
  };
};