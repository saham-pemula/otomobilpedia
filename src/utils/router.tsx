import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RouteState {
  path: string;
  search: string;
  params: Record<string, string>;
}

interface RouterContextType {
  route: RouteState;
  navigate: (to: string, replace?: boolean) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function parsePath(fullPath: string): RouteState {
  const [pathname, searchStr] = fullPath.split('?');
  const path = pathname || '/';
  const search = searchStr ? `?${searchStr}` : '';
  const params: Record<string, string> = {};

  // Route pattern matching
  if (path.startsWith('/bandingkan/')) {
    const slug = path.replace('/bandingkan/', '').replace(/\/+$/, '');
    if (slug) params.comparisonSlug = slug;
  } else if (path.startsWith('/mobil/')) {
    const slug = path.replace('/mobil/', '').replace(/\/+$/, '');
    if (slug) params.carSlug = slug;
  } else if (path.startsWith('/kategori/')) {
    const slug = path.replace('/kategori/', '').replace(/\/+$/, '');
    if (slug) params.categorySlug = slug;
  }

  return { path, search, params };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => {
    return parsePath(window.location.pathname + window.location.search);
  });

  const navigate = (to: string, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setRoute(parsePath(to));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname + window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global click interception for <a href="..."> to provide instant SPA transitions while maintaining standard HTML href anchors
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or modifier keys
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        target.getAttribute('target') === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
