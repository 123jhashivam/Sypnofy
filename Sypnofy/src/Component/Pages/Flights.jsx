import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Plane,
  ArrowLeftRight,
  Calendar,
  Users,
  Search,
  ChevronDown,
  Clock,
  SlidersHorizontal,
  X,
} from "lucide-react";

const CITIES = [
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "JAI", name: "Jaipur" },
  { code: "GOI", name: "Goa" },
  { code: "BLR", name: "Bengaluru" },
];

const AIRLINES = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];

const ALL_FLIGHTS = [
  { id: 1, airline: "IndiGo", code: "6E-204", depart: "06:15", arrive: "08:30", duration: 135, stops: 0, price: 4899 },
  { id: 2, airline: "Air India", code: "AI-887", depart: "09:40", arrive: "11:50", duration: 130, stops: 0, price: 5450 },
  { id: 3, airline: "Vistara", code: "UK-991", depart: "14:05", arrive: "16:55", duration: 170, stops: 1, price: 6120 },
  { id: 4, airline: "SpiceJet", code: "SG-441", depart: "18:30", arrive: "20:45", duration: 135, stops: 0, price: 4550 },
  { id: 5, airline: "Akasa Air", code: "QP-1102", depart: "21:00", arrive: "23:10", duration: 130, stops: 0, price: 5990 },
  { id: 6, airline: "Air India", code: "AI-556", depart: "11:20", arrive: "14:40", duration: 200, stops: 1, price: 4120 },
];

function formatDuration(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

function SearchCard({ onSearch }) {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("DEL");
  const [to, setTo] = useState("JAI");
  const [travelers, setTravelers] = useState(1);
  const [travelersOpen, setTravelersOpen] = useState(false);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto -mt-12 max-w-4xl rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(10,17,40,0.18)] sm:p-6"
    >
      {/* Trip type */}
      <div className="mb-5 flex items-center gap-6">
        {[
          { id: "oneway", label: "One way" },
          { id: "roundtrip", label: "Round trip" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTripType(t.id)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                tripType === t.id ? "border-blue-600" : "border-slate-300"
              }`}
            >
              {tripType === t.id && (
                <span className="h-2 w-2 rounded-full bg-blue-600" />
              )}
            </span>
            <span
              className={
                tripType === t.id ? "text-slate-900" : "text-slate-500"
              }
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] sm:items-end">
        {/* From */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <button
          onClick={swap}
          className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-blue-300 hover:text-blue-600 sm:mb-1.5"
        >
          <ArrowLeftRight size={15} />
        </button>

        {/* To */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400"
          >
            {CITIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Depart */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <Calendar size={11} /> Departure
          </label>
          <input
            type="date"
            defaultValue="2026-09-25"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-400"
          />
        </div>

        {/* Travelers */}
        <div className="relative">
          <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <Users size={11} /> Travelers
          </label>
          <button
            onClick={() => setTravelersOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900"
          >
            {travelers} {travelers === 1 ? "Adult" : "Adults"}
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <AnimatePresence>
            {travelersOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute z-10 mt-2 w-full rounded-xl border border-slate-100 bg-white p-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Adults</span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setTravelers((t) => Math.max(1, t - 1))
                      }
                      className="h-7 w-7 rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
                    >
                      −
                    </button>

                    <span className="w-4 text-center text-sm font-semibold">
                      {travelers}
                    </span>

                    <button
                      onClick={() =>
                        setTravelers((t) => Math.min(6, t + 1))
                      }
                      className="h-7 w-7 rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </motion.div>
  );
}

function FlightCard({ flight, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Plane size={17} />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {flight.airline}
          </p>
          <p className="text-xs text-slate-400">{flight.code}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-3 sm:gap-6">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">
            {flight.depart}
          </p>
          <p className="text-xs text-slate-400">DEL</p>
        </div>

        <div className="flex flex-col items-center px-2">
          <span className="text-[11px] text-slate-400">
            {formatDuration(flight.duration)}
          </span>

          <div className="my-1 flex w-20 items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <span className="h-px flex-1 bg-slate-200" />
            <Plane size={11} className="text-slate-300" />
            <span className="h-px flex-1 bg-slate-200" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>

          <span className="text-[11px] font-medium text-slate-500">
            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
          </span>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">
            {flight.arrive}
          </p>
          <p className="text-xs text-slate-400">JAI</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
        <div className="text-right">
          <p className="text-xl font-bold text-slate-900">
            ₹{flight.price.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400">per traveler</p>
        </div>

        <button className="flex h-10 items-center justify-center rounded-lg bg-amber-400 px-5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300">
          Book
        </button>
      </div>
    </motion.div>
  );
}

function FiltersPanel({ filters, setFilters, onClose, mobile }) {
  const toggleAirline = (airline) => {
    setFilters((f) => ({
      ...f,
      airlines: f.airlines.includes(airline)
        ? f.airlines.filter((a) => a !== airline)
        : [...f.airlines, airline],
    }));
  };

  return (
    <div className={mobile ? "" : "sticky top-6"}>
      {mobile && (
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-slate-900">Filters</p>

          <button onClick={onClose} className="text-slate-400">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-semibold text-slate-900">Stops</p>

        <div className="space-y-2">
          {["Non-stop", "1 stop"].map((label, i) => (
            <label
              key={label}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.stops.includes(i)}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    stops: f.stops.includes(i)
                      ? f.stops.filter((s) => s !== i)
                      : [...f.stops, i],
                  }))
                }
                className="accent-blue-600"
              />
              {label}
            </label>
          ))}
        </div>

        <p className="mb-3 mt-6 text-sm font-semibold text-slate-900">
          Max price
        </p>

        <input
          type="range"
          min="4000"
          max="7000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-blue-600"
        />

        <p className="mt-1 text-xs text-slate-500">
          Up to ₹{filters.maxPrice.toLocaleString("en-IN")}
        </p>

        <p className="mb-3 mt-6 text-sm font-semibold text-slate-900">
          Airlines
        </p>

        <div className="space-y-2">
          {AIRLINES.map((a) => (
            <label
              key={a}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.airlines.includes(a)}
                onChange={() => toggleAirline(a)}
                className="accent-blue-600"
              />
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const SORTS = [
  { id: "cheapest", label: "Cheapest" },
  { id: "fastest", label: "Fastest" },
  { id: "early", label: "Earliest departure" },
];

function ResultsSection() {
  const [sort, setSort] = useState("cheapest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    stops: [],
    maxPrice: 7000,
    airlines: [],
  });

  const flights = useMemo(() => {
    let list = ALL_FLIGHTS.filter(
      (f) => f.price <= filters.maxPrice
    );

    if (filters.stops.length)
      list = list.filter((f) =>
        filters.stops.includes(f.stops)
      );

    if (filters.airlines.length)
      list = list.filter((f) =>
        filters.airlines.includes(f.airline)
      );

    if (sort === "cheapest")
      list = [...list].sort((a, b) => a.price - b.price);

    if (sort === "fastest")
      list = [...list].sort((a, b) => a.duration - b.duration);

    if (sort === "early")
      list = [...list].sort((a, b) =>
        a.depart.localeCompare(b.depart)
      );

    return list;
  }, [filters, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Delhi (DEL) → Jaipur (JAI) · 25 Sep 2026
          </p>

          <p className="text-lg font-semibold text-slate-900">
            {flights.length} flights found
          </p>
        </div>

        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 lg:hidden"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Sort chips */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto">
        {SORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSort(s.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              sort === s.id
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Desktop filters */}
        <div className="hidden lg:block">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Mobile filters overlay */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="ml-auto h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5"
              >
                <FiltersPanel
                  filters={filters}
                  setFilters={setFilters}
                  onClose={() => setShowMobileFilters(false)}
                  mobile
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flight list */}
        <div className="space-y-4">
          {flights.map((f, i) => (
            <FlightCard
              key={f.id}
              flight={f}
              index={i}
            />
          ))}

          {flights.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
              No flights match your filters. Try widening the price range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Flights() {
  const [searched, setSearched] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero + search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0D1B3A] to-[#0A1128] px-6 pb-28 pt-16 sm:px-10">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">
              S
            </div>

            <span className="text-lg font-semibold tracking-tight text-white">
              Sypnofy
            </span>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Book flights, verified at checkout.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mx-auto mt-3 max-w-lg text-[15px] text-slate-400"
          >
            Every booking on this demo runs through the Sypnofy Guest KYC API —
            identity confirmed the moment a seat is booked.
          </motion.p>
        </div>
      </section>

      {/* Search component */}
      <div className="relative z-10">
        <SearchCard onSearch={() => setSearched(true)} />
      </div>

      {/* Gap between SearchCard and ResultsSection */}
      <div className="h-6" />

      <AnimatePresence>
        {searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsSection />
          </motion.div>
        )}
      </AnimatePresence>

      {!searched && (
        <div className="py-24 text-center text-sm text-slate-400">
          Enter your route above and hit Search to see live flight results.
        </div>
      )}
    </div>
  );
}