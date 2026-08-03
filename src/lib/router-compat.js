'use client';

import { useEffect, forwardRef } from 'react';
import { usePathname, useRouter, useParams as useNextParams } from 'next/navigation';
import NextLink from 'next/link';

export function Link({ to, replace, children, ...rest }) {
  const href = typeof to === 'string' ? to : to?.pathname || '';
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} replace={replace} {...rest}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, className, style, end, children, ...rest }) {
  const href = typeof to === 'string' ? to : to?.pathname || '';
  const pathname = usePathname();
  const isActive = end ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const cn = typeof className === 'function' ? className({ isActive }) : className;
  const st = typeof style === 'function' ? style({ isActive }) : style;
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(href)) {
    return (
      <a href={href} className={cn} style={st} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cn} style={st} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === 'number') {
      window.history.go(to);
      return;
    }
    if (options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useParams() {
  return useNextParams() || {};
}

export function useLocation() {
  const pathname = usePathname();
  let search = '';
  let hash = '';
  if (typeof window !== 'undefined') {
    search = window.location.search;
    hash = window.location.hash;
  }
  return { pathname, search, hash, state: null };
}

export function useSearchParams() {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function Navigate({ to, replace = false }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
}

export function Outlet({ children }) {
  return children || null;
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}

export const MemoryRouter = BrowserRouter;
export const HashRouter = BrowserRouter;

export { NextLink };
