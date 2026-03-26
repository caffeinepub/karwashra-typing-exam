import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { About } from "@/pages/About";
import { Dashboard } from "@/pages/Dashboard";
import { ExamCategories } from "@/pages/ExamCategories";
import { ExamRules } from "@/pages/ExamRules";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { Home } from "@/pages/Home";
import { LearnTyping } from "@/pages/LearnTyping";
import { LiveHub } from "@/pages/LiveHub";
import { LiveTestRoom } from "@/pages/LiveTestRoom";
import { Login } from "@/pages/Login";
import { Results } from "@/pages/Results";
import { Signup } from "@/pages/Signup";
import { TypingTest } from "@/pages/TypingTest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <>
        <Outlet />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn",
  component: LearnTyping,
});
const examsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exams",
  component: ExamCategories,
});
const rulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam/$id/rules",
  component: ExamRules,
});
const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam/$id/test",
  component: TypingTest,
});
const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam/$id/result",
  component: Results,
  validateSearch: (search: Record<string, unknown>) => ({
    wpm: search.wpm as string | undefined,
    accuracy: search.accuracy as string | undefined,
    errors: search.errors as string | undefined,
    timeTaken: search.timeTaken as string | undefined,
    correctWords: search.correctWords as string | undefined,
    wrongWords: search.wrongWords as string | undefined,
  }),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});
const forgotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPassword,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});
const liveHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live",
  component: LiveHub,
});
const liveRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$roomId",
  component: LiveTestRoom,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  learnRoute,
  examsRoute,
  rulesRoute,
  testRoute,
  resultRoute,
  aboutRoute,
  loginRoute,
  signupRoute,
  forgotRoute,
  dashboardRoute,
  liveHubRoute,
  liveRoomRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
