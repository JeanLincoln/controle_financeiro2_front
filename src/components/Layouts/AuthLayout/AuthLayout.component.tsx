import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";

import type { IRootState } from "@/store";

export default function AuthLayout() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    navigate("/");
  }, [user]);

  return (
    <div className="bg-background min-h-screen">
      <div
        key={location.pathname}
        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <Outlet />
      </div>
    </div>
  );
}
