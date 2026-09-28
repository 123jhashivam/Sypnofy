import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";
import { startSelfKyc, checkSelfKycStatus, guestLogout } from "../../lib/guestAuth"; // apna actual relative path check kar lena
import { useNavigate } from "react-router-dom";

export default function GuestVerifyIdentity() {
  const navigate = useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [pendingKycId, setPendingKycId] = useState(null);
  const [result, setResult] = useState(null); // { verificationCode, verifiedName, maskedIdNumber }
  const [copied, setCopied] = useState(false);

  const pollRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const aadhaarValid = /^\d{12}$/.test(aadhaarNumber);

  async function handleStart(e) {
    e.preventDefault();
    if (!aadhaarValid || starting) return;

    setStarting(true);
    setError("");
    setResult(null);

    try {
      const data = await startSelfKyc(aadhaarNumber);

      if (data.status === "VERIFIED") {
        setResult({
          verificationCode: data.verificationCode,
          verifiedName: data.verifiedName,
          maskedIdNumber: data.maskedIdNumber,
        });
        return;
      }

      // status === "PENDING" — open DigiLocker consent in a new tab.
      // Open it synchronously first (blank) to avoid popup blockers,
      // then navigate once we have the real URL.
      const newTab = window.open("", "_blank", "noopener,noreferrer");
      if (data.authorizationUrl && newTab) {
        newTab.location.href = data.authorizationUrl;
      } else if (data.authorizationUrl) {
        window.open(data.authorizationUrl, "_blank", "noopener,noreferrer");
      }

      setPendingKycId(data.kycId);
      pollRef.current = setInterval(async () => {
        try {
          const status = await checkSelfKycStatus(data.kycId);
          if (status.found) {
            clearInterval(pollRef.current);
            setPendingKycId(null);
            setResult({
              verificationCode: status.verificationCode,
              verifiedName: status.verifiedName,
              maskedIdNumber: status.maskedIdNumber,
            });
          }
        } catch (err) {
          clearInterval(pollRef.current);
          setPendingKycId(null);
          setError(err.message);
        }
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setStarting(false);
    }
  }

  function handleCopy() {
    if (!result?.verificationCode) return;
    navigator.clipboard.writeText(result.verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
          Identity Verification
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Verify your Aadhaar
        </h2>
        <p className="mt-2 text-[15px] text-slate-500">
          Do this once — every hotel on Sypnofy can confirm you're verified
          using your code, no DigiLocker needed again.
        </p>

        {result ? (
          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <p className="mt-3 text-sm font-medium text-emerald-700">
                {result.verifiedName ? `Verified as ${result.verifiedName}` : "Verification complete"}
              </p>
              {result.maskedIdNumber && (
                <p className="mt-1 text-xs text-emerald-600">Aadhaar {result.maskedIdNumber}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Your verification code
              </label>
              <div className="flex items-center gap-3">
                <div className="flex h-[52px] flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-lg font-bold tracking-wide text-slate-900">
                  {result.verificationCode}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Show this code at check-in — front desk staff can confirm your
                identity instantly, without any paperwork.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/guest/dashboard")}
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-slate-900 text-[15px] font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
            >
              Continue
            </button>
          </div>
        ) : (
          <form className="mt-10 space-y-5" onSubmit={handleStart}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Aadhaar number
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                disabled={Boolean(pendingKycId)}
                className="h-[52px] w-full rounded-xl border border-transparent bg-slate-50 px-4 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600/40 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:opacity-60"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                We never store your Aadhaar number — only a one-way hash, so
                we can recognize you next time without keeping the number itself.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {pendingKycId && (
              <div className="flex items-center gap-2.5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
                <Loader2 size={16} className="animate-spin shrink-0" />
                <span>Waiting for you to complete consent in the DigiLocker tab…</span>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={!aadhaarValid || starting || Boolean(pendingKycId)}
              whileHover={aadhaarValid && !starting && !pendingKycId ? { scale: 1.01 } : {}}
              whileTap={aadhaarValid && !starting && !pendingKycId ? { scale: 0.98 } : {}}
              className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-lg transition ${
                aadhaarValid && !starting && !pendingKycId
                  ? "bg-slate-900 shadow-slate-900/10 hover:bg-slate-800"
                  : "cursor-not-allowed bg-slate-300 shadow-none"
              }`}
            >
              {starting && <Loader2 size={18} className="animate-spin" />}
              {starting ? "Starting…" : pendingKycId ? "Waiting for consent…" : "Verify with DigiLocker"}
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={13} className="text-blue-500" />
              Verified directly through DigiLocker — Sypnofy never sees your raw Aadhaar data.
            </div>
          </form>
        )}

        <button
          type="button"
          onClick={() => { guestLogout(); navigate("/guest/login"); }}
          className="mt-8 block w-full text-center text-sm text-slate-400 hover:text-slate-600"
        >
          Sign out
        </button>
      </motion.div>
    </section>
  );
}
