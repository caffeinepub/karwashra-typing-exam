import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { hashPassword, useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Keyboard, Loader2, Lock, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const { storeAuth } = useAuth();
  const { actor } = useActor();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Username aur password dono darrein.");
      return;
    }
    if (!actor) {
      setError("Backend connect ho raha hai, thodi der mein try karein.");
      return;
    }
    setLoading(true);
    try {
      const token = await actor.login(username.trim(), hashPassword(password));
      if (!token) {
        setError("Invalid username ya password.");
        return;
      }
      storeAuth({ username: username.trim(), token });
      toast.success("Login successful!");
      navigate({ to: "/dashboard" });
    } catch {
      setError("Login failed. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-navy rounded-t-2xl px-8 py-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
              <Keyboard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-white font-poppins font-bold text-lg tracking-widest uppercase">
            Karwashra Typing Exam
          </h1>
          <p className="text-white/60 text-xs mt-1 tracking-wider">
            Official Typing Test Portal
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-card border border-border px-8 py-8">
          <h2 className="text-navy font-poppins font-bold text-xl mb-6 text-center">
            Candidate Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-xs font-semibold text-navy uppercase tracking-wider"
              >
                Login ID / Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-9 font-mono"
                  autoFocus
                  data-ocid="login.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-navy uppercase tracking-wider"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9"
                  data-ocid="login.input"
                />
              </div>
            </div>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg"
                data-ocid="login.error_state"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !actor}
              className="w-full bg-navy hover:bg-navy-light text-white font-poppins font-semibold uppercase tracking-wider rounded-lg py-2.5"
              data-ocid="login.submit_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Naya account?{" "}
              <Link
                to="/signup"
                className="text-blue-brand font-semibold hover:underline"
                data-ocid="login.link"
              >
                Register karein
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground hover:text-navy hover:underline"
              data-ocid="login.link"
            >
              Password bhool gaye?
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Karwashra Typing Exam Portal
        </p>
      </div>
    </main>
  );
}
