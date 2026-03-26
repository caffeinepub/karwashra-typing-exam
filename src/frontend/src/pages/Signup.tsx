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
import { useActor } from "@/hooks/useActor";
import { hashPassword } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Keyboard, Loader2, Lock, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SECURITY_QUESTIONS = [
  "Aapke mata ji ka naam kya hai?",
  "Aapka pehla school kaun sa tha?",
  "Aapka favourite colour kya hai?",
  "Aapke pita ji ka naam kya hai?",
  "Aap kahan paida hue the?",
];

export function Signup() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Username darrein.");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username kam se kam 3 characters ka hona chahiye.");
      return;
    }
    if (!password) {
      setError("Password darrein.");
      return;
    }
    if (password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords match nahi kar rahe.");
      return;
    }
    if (!securityQuestion) {
      setError("Security question select karein.");
      return;
    }
    if (!securityAnswer.trim()) {
      setError("Security answer darrein.");
      return;
    }
    if (!actor) {
      setError("Backend connect ho raha hai, thodi der mein try karein.");
      return;
    }

    setLoading(true);
    try {
      const success = await actor.registerUser(
        username.trim(),
        hashPassword(password),
        securityQuestion,
        securityAnswer.trim().toLowerCase(),
      );
      if (!success) {
        setError(
          "Yeh username pehle se registered hai. Alag username try karein.",
        );
        return;
      }
      toast.success("Registration successful! Ab login karein.");
      navigate({ to: "/login" });
    } catch {
      setError("Registration failed. Dobara try karein.");
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
            New Candidate Registration
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-card border border-border px-8 py-8">
          <h2 className="text-navy font-poppins font-bold text-xl mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-xs font-semibold text-navy uppercase tracking-wider"
              >
                Username / Login ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="pl-9 font-mono"
                  autoFocus
                  data-ocid="signup.input"
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
                  placeholder="Min 6 characters"
                  className="pl-9"
                  data-ocid="signup.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="confirm"
                className="text-xs font-semibold text-navy uppercase tracking-wider"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="pl-9"
                  data-ocid="signup.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-navy uppercase tracking-wider">
                Security Question
              </Label>
              <Select
                value={securityQuestion}
                onValueChange={setSecurityQuestion}
              >
                <SelectTrigger className="w-full" data-ocid="signup.select">
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  {SECURITY_QUESTIONS.map((q) => (
                    <SelectItem key={q} value={q}>
                      {q}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="answer"
                className="text-xs font-semibold text-navy uppercase tracking-wider"
              >
                Security Answer
              </Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Your answer"
                  className="pl-9"
                  data-ocid="signup.input"
                />
              </div>
            </div>

            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg"
                data-ocid="signup.error_state"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !actor}
              className="w-full bg-navy hover:bg-navy-light text-white font-poppins font-semibold uppercase tracking-wider rounded-lg py-2.5"
              data-ocid="signup.submit_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-blue-brand font-semibold hover:underline"
                data-ocid="signup.link"
              >
                Login karein
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
