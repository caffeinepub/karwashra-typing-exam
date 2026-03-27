import type { LiveSessionPublic } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ALLOWED_EXAMS as EXAMS } from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus, Radio, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TIME_PRESETS = [5, 10, 15, 20];

export function LiveHub() {
  const { auth, isLoggedIn } = useAuth();
  const { actor, isFetching } = useActor();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [createExam, setCreateExam] = useState("");
  const [createTime, setCreateTime] = useState(10);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/login" });
  }, [isLoggedIn, navigate]);

  const sessionsQuery = useQuery<LiveSessionPublic[]>({
    queryKey: ["activeSessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveLiveSessions();
    },
    refetchInterval: 5000,
    enabled: !!actor && !isFetching && isLoggedIn,
  });

  const handleCreate = async () => {
    if (!createExam) {
      toast.error("Exam select karein.");
      return;
    }
    if (!auth || !actor) return;
    const exam = EXAMS.find((e) => e.id === createExam);
    if (!exam) return;
    setCreating(true);
    try {
      const roomId = await actor.createLiveSession(
        auth.token,
        createExam,
        exam.name,
        BigInt(createTime),
      );
      toast.success(`Room created! Code: ${roomId}`);
      navigate({ to: "/live/$roomId", params: { roomId } });
    } catch {
      toast.error("Room create karne mein error. Dobara try karein.");
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) {
      toast.error("Room code darrein.");
      return;
    }
    if (!auth || !actor) return;
    setJoining(true);
    try {
      const ok = await actor.joinLiveSession(
        auth.token,
        joinCode.trim(),
        auth.username,
      );
      if (!ok) {
        toast.error("Invalid room code ya room full hai.");
        return;
      }
      navigate({ to: "/live/$roomId", params: { roomId: joinCode.trim() } });
    } catch {
      toast.error("Join karne mein error. Dobara try karein.");
    } finally {
      setJoining(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-light-gray">
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <Radio className="w-6 h-6 text-red-400" />
            <div>
              <h1 className="text-white font-poppins font-bold text-xl">
                Live Test Centre
              </h1>
              <p className="text-white/60 text-xs">
                Multiple users ke saath real-time typing competition
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
        {/* Create Room */}
        <div className="bg-white rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Plus className="w-5 h-5 text-blue-brand" />
            <h2 className="font-poppins font-bold text-navy">
              Naya Room Banayein
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                Exam Select Karein
              </Label>
              <Select value={createExam} onValueChange={setCreateExam}>
                <SelectTrigger data-ocid="live.select">
                  <SelectValue placeholder="Choose exam" />
                </SelectTrigger>
                <SelectContent>
                  {EXAMS.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                Time Limit
              </Label>
              <div className="flex flex-wrap gap-2">
                {TIME_PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setCreateTime(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                      createTime === t
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-navy border-navy/30 hover:bg-navy/5"
                    }`}
                  >
                    {t} min
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleCreate}
              disabled={creating || !actor}
              className="w-full bg-blue-brand hover:bg-blue-brand-light text-white font-semibold"
              data-ocid="live.primary_button"
            >
              {creating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {creating ? "Room ban raha hai..." : "Room Create Karein"}
            </Button>
          </div>
        </div>

        {/* Join Room */}
        <div className="bg-white rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-green-600" />
            <h2 className="font-poppins font-bold text-navy">
              Room Join Karein
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                Room Code
              </Label>
              <Input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter room code"
                className="font-mono text-lg tracking-widest text-center"
                data-ocid="live.input"
              />
            </div>
            <Button
              onClick={handleJoin}
              disabled={joining || !actor}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              data-ocid="live.secondary_button"
            >
              {joining ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Users className="w-4 h-4 mr-2" />
              )}
              {joining ? "Join ho raha hai..." : "Join Room"}
            </Button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="md:col-span-2 bg-white rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Radio className="w-5 h-5 text-red-500" />
            <h2 className="font-poppins font-bold text-navy">
              Active Live Sessions
            </h2>
          </div>
          {sessionsQuery.isLoading ? (
            <div className="space-y-3" data-ocid="live.loading_state">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : sessionsQuery.data && sessionsQuery.data.length > 0 ? (
            <div className="space-y-3" data-ocid="live.list">
              {sessionsQuery.data.map((s, i) => (
                <div
                  key={s.roomId}
                  data-ocid={`live.item.${i + 1}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div>
                      <p className="font-semibold text-navy">{s.examName}</p>
                      <p className="text-xs text-muted-foreground">
                        Room:{" "}
                        <span className="font-mono font-bold">{s.roomId}</span>{" "}
                        • {s.participants.length} participants •{" "}
                        {Number(s.timeLimit)} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        s.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    >
                      {s.isActive ? "LIVE" : "Ended"}
                    </Badge>
                    {s.isActive && actor && auth && (
                      <Button
                        size="sm"
                        onClick={async () => {
                          await actor.joinLiveSession(
                            auth.token,
                            s.roomId,
                            auth.username,
                          );
                          navigate({
                            to: "/live/$roomId",
                            params: { roomId: s.roomId },
                          });
                        }}
                        className="bg-navy text-white text-xs"
                        data-ocid="live.secondary_button"
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="live.empty_state"
            >
              <Radio className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Koi active session nahi hai. Naya room banayein!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
