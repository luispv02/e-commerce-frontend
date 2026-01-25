import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);

  return null;
}

