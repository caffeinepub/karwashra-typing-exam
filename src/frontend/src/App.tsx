import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { About } from "@/pages/About";
import { ExamCategories } from "@/pages/ExamCategories";
import { ExamRules } from "@/pages/ExamRules";
import { Home } from "@/pages/Home";
import { Results } from "@/pages/Results";
import { TypingTest } from "@/pages/TypingTest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col font-poppins">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
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
  }),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  examsRoute,
  rulesRoute,
  testRoute,
  resultRoute,
  aboutRoute,
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
