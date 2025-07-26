import { type PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  //   const user = useAuth();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (user === null) {
  //       navigate("/signin", { replace: true });
  //     }
  //   }, [navigate, user]);

  return children;
}
