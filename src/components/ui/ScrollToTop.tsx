// components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    handleScrollToTop();
  }, [pathname]); // Trigger the effect whenever the pathname changes

  return null; // This component does not render anything
};

export default ScrollToTop;
