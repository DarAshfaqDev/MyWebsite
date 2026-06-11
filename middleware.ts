import { auth as middleware } from "@/lib/auth";

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*"],
};
