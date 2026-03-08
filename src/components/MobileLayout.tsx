import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

const MobileLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background">
      <div className="pb-20">{children}</div>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
