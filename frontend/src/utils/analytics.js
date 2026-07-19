// Analytics logging helper to record page views to the local backend database
export const recordPageView = async (path) => {
  const currentPath = path || window.location.pathname;
  
  // Do not record page views for the admin dashboard or login pages
  if (currentPath.includes('/seva-trust/admin')) {
    return;
  }

  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${apiBaseUrl}/api/analytics/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: currentPath,
        referrer: document.referrer || 'Direct',
      }),
    });
  } catch (error) {
    console.warn('Analytics tracking offline or failed:', error.message);
  }
};
