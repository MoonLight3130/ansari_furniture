import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta description dynamically
 */
export const usePageSeo = (title, description) => {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} | Ansari Furniture`;
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    if (description && metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [title, description]);
};
