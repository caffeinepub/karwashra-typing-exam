import type { TypingResult } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, LogOut, Trophy, User } from "lucide-react";
import { useEffect } from "react";

function formatDate(ts: bigint) {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ResultRow({ r, index }: { r: TypingResult; index: number }) {
  return (
    <TableRow data-ocid={`results.item.${index + 1}`}>
      <TableCell className="font-mono font-semibold">{r.username}</TableCell>
      <TableCell className="font-medium text-navy">{r.examName}</TableCell>
      <TableCell className="text-center font-bold text-blue-brand">
        {Number(r.wpm)}
      </TableCell>
      <TableCell className="text-center">{Number(r.accuracy)}%</TableCell>
      <TableCell className="text-center">{Number(r.errors)}</TableCell>
      <TableCell className="text-center">
        {r.passed ? (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            PASS
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-700 border-red-300">FAIL</Badge>
        )}
      </TableCell>
      <TableCell className="text-xs text-muted-foreground text-right">
        {formatDate(r.timestamp)}
      </TableCell>
    </TableRow>
  );
}

export function Dashboard() {
  const { auth, isLoggedIn, logout } = useAuth();
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, navigate]);

  const myResultsQuery = useQuery<TypingResult[]>({
    queryKey: ["myResults", auth?.token],
    queryFn: async () => {
      if (!actor || !auth?.token) return [];
      return actor.getMyResults(auth.token);
    },
    enabled: !!actor && !isFetching && !!auth?.token,
  });

  const leaderboardQuery = useQuery<TypingResult[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching && isLoggedIn,
  });

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-light-gray">
      <div className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest">
                Welcome back
              </p>
              <p className="text-white font-poppins font-bold text-lg">
                {auth?.username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/live">
              <Button
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold tracking-wider"
                data-ocid="dashboard.link"
              >
                🔴 Live Test
              </Button>
            </Link>
            <Link to="/exams">
              <Button
                size="sm"
                className="bg-blue-brand hover:bg-blue-brand-light text-white text-xs font-semibold tracking-wider"
                data-ocid="dashboard.link"
              >
                New Test
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
              data-ocid="dashboard.button"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="my-results">
          <TabsList className="mb-6 bg-white border border-border shadow-xs">
            <TabsTrigger
              value="my-results"
              className="gap-2"
              data-ocid="dashboard.tab"
            >
              <BarChart3 className="w-4 h-4" /> Mere Results
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="gap-2"
              data-ocid="dashboard.tab"
            >
              <Trophy className="w-4 h-4" /> Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-results">
            <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h2 className="font-poppins font-bold text-navy">
                  Aapke Saare Results
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All your typing test history
                </p>
              </div>
              {myResultsQuery.isLoading ? (
                <div
                  className="p-6 space-y-3"
                  data-ocid="results.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : myResultsQuery.data && myResultsQuery.data.length > 0 ? (
                <Table data-ocid="results.table">
                  <TableHeader>
                    <TableRow className="bg-muted/20">
                      <TableHead>Username</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead className="text-center">WPM</TableHead>
                      <TableHead className="text-center">Accuracy</TableHead>
                      <TableHead className="text-center">Errors</TableHead>
                      <TableHead className="text-center">Result</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myResultsQuery.data.map((r, i) => (
                      <ResultRow key={r.sessionId} r={r} index={i} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="results.empty_state"
                >
                  <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Abhi koi result nahi hai</p>
                  <p className="text-sm mt-1">
                    Koi exam dein aur apna score yahan dekhein
                  </p>
                  <Link to="/exams" className="mt-4 inline-block">
                    <Button size="sm" className="mt-2 bg-navy text-white">
                      Exam Shuru Karein
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <div>
                  <h2 className="font-poppins font-bold text-navy">
                    Top Performers
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    All users sorted by WPM
                  </p>
                </div>
              </div>
              {leaderboardQuery.isLoading ? (
                <div
                  className="p-6 space-y-3"
                  data-ocid="leaderboard.loading_state"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : leaderboardQuery.data && leaderboardQuery.data.length > 0 ? (
                <Table data-ocid="leaderboard.table">
                  <TableHeader>
                    <TableRow className="bg-muted/20">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead className="text-center">WPM</TableHead>
                      <TableHead className="text-center">Accuracy</TableHead>
                      <TableHead className="text-center">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardQuery.data.map((r, i) => (
                      <TableRow
                        key={`${r.sessionId}-${i}`}
                        data-ocid={`leaderboard.item.${i + 1}`}
                        className={
                          r.username === auth?.username ? "bg-blue-50" : ""
                        }
                      >
                        <TableCell className="font-bold text-muted-foreground">
                          {i === 0
                            ? "🥇"
                            : i === 1
                              ? "🥈"
                              : i === 2
                                ? "🥉"
                                : i + 1}
                        </TableCell>
                        <TableCell className="font-mono font-semibold">
                          {r.username}
                          {r.username === auth?.username && (
                            <span className="ml-2 text-xs text-blue-brand">
                              (You)
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-navy font-medium">
                          {r.examName}
                        </TableCell>
                        <TableCell className="text-center font-bold text-blue-brand">
                          {Number(r.wpm)}
                        </TableCell>
                        <TableCell className="text-center">
                          {Number(r.accuracy)}%
                        </TableCell>
                        <TableCell className="text-center">
                          {r.passed ? (
                            <Badge className="bg-green-100 text-green-700 border-green-300">
                              PASS
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 border-red-300">
                              FAIL
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="leaderboard.empty_state"
                >
                  <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Koi result abhi nahi hai</p>
                  <p className="text-sm mt-1">
                    Pehle exam dein leaderboard mein aane ke liye
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
