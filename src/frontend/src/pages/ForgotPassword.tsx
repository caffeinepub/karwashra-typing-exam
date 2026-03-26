import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { hashPassword } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Keyboard, Loader2, Lock, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Step = "username" | "reset";

export function ForgotPassword() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username darrein.");
      return;
    }
    setError("");
    setStep("reset");
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!securityAnswer.trim()) {
      setError("Security answer darrein.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords match nahi kar rahe.");
      return;
    }
    if (!actor) {
      setError("Backend connect ho raha hai, thodi der mein try karein.");
      return;
    }

    setLoading(true);
    try {
      const success = await actor.resetPassword(
        username.trim(),
        securityAnswer.trim().toLowerCase(),
        hashPassword(newPassword),
      );
      if (!success) {
        setError("Security answer galat hai ya username exist nahi karta.");
        return;
      }
      toast.success("Password reset successful! Ab login karein.");
      navigate({ to: "/login" });
    } catch {
      setError("Password reset failed. Dobara try karein.");
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
            Password Reset
          </h1>
          <p className="text-white/60 text-xs mt-1">
            Karwashra Typing Exam Portal
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-card border border-border px-8 py-8">
          {step === "username" ? (
            <form onSubmit={handleUsernameSubmit} className="space-y-5">
              <h2 className="text-navy font-poppins font-bold text-lg mb-4 text-center">
                Apna Username Darrein
              </h2>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                  Username / Login ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-9 font-mono"
                    autoFocus
                    data-ocid="forgot.input"
                  />
                </div>
              </div>
              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg"
                  data-ocid="forgot.error_state"
                >
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-navy hover:bg-navy-light text-white font-poppins font-semibold uppercase tracking-wider"
                data-ocid="forgot.submit_button"
              >
                Aage Badhein
              </Button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <h2 className="text-navy font-poppins font-bold text-lg mb-4 text-center">
                New Password Set Karein
              </h2>
              <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-2.5 rounded-lg">
                Username:{" "}
                <span className="font-mono font-bold">{username}</span>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                  Security Answer
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Security question ka jawab"
                    className="pl-9"
                    data-ocid="forgot.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="pl-9"
                    data-ocid="forgot.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="pl-9"
                    data-ocid="forgot.input"
                  />
                </div>
              </div>
              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg"
                  data-ocid="forgot.error_state"
                >
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={loading || !actor}
                className="w-full bg-navy hover:bg-navy-light text-white font-poppins font-semibold uppercase tracking-wider"
                data-ocid="forgot.submit_button"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {loading ? "Resetting..." : "Password Reset Karein"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("username")}
                className="w-full text-xs text-muted-foreground hover:underline text-center mt-1"
              >
                Wapas jaayein
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-blue-brand hover:underline"
              data-ocid="forgot.link"
            >
              Login page par jaayein
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
