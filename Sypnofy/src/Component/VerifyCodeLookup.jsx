import { useState } from "react";
import { Search, ShieldCheck, XCircle, Loader2 } from "lucide-react";
import { lookupVerificationCode } from "../lib/guestAuth"; // apna actual relative path check kar lena

export default function VerifyCodeLookup() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { found, verifiedName, maskedIdNumber, verifiedAt }
  const [error, setError] = useState("");

  async function handleLookup(e) {
    e.preventDefault();
    if (!code.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await lookupVerificationCode(code.trim());
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
      <h3 className="text-sm font-semibold text-slate-800 mb-1">Check a verification code</h3>
      <p className="text-xs text-slate-400 mb-4">
        Ask the guest for their Sypnofy verification code — instant result, no DigiLocker needed.
      </p>

      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            type="text"
            placeholder="e.g. SYNV-4F82K9"
            className="outline-none text-sm w-full placeholder:text-slate-400 uppercase"
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim() || loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      {result && (
        <div
          className={`mt-4 rounded-lg p-4 flex items-start gap-3 ${
            result.found ? "bg-accent-light" : "bg-danger-light"
          }`}
        >
          {result.found ? (
            <>
              <ShieldCheck size={20} className="text-accent-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-accent-dark">Verified</p>
                <p className="text-sm text-slate-700 mt-0.5">
                  {result.verifiedName || "Name not available"} &middot; {result.maskedIdNumber || "—"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified on {new Date(result.verifiedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle size={20} className="text-danger shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-danger">
                No verified identity found for this code. Check for typos, or ask the guest to verify.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
