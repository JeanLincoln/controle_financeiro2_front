import type { IRootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const { user } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    navigate("/");
  }, [user]);

  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  );
}
