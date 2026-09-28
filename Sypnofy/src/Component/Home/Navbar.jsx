import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Building2,
  Users,
  DoorOpen,
  FileCheck2,
  ClipboardList,
  KeyRound,
  ArrowRight,
  Plane,
  Code2,
  BedDouble,
} from "lucide-react";

// -----------------------------------------------------------------------
// Data — edit these to change menu content without touching markup.
// `to` values are react-router-dom paths. The order of NAV_LINKS is the
// order items render in — Home is first, so it appears before Products.
//
// This list only includes what Sypnofy actually offers right now — no
// placeholder/future products. Update it as real features ship.
// -----------------------------------------------------------------------
const PRODUCTS_MEGA = {
  columns: [
    [
      {
        icon: ShieldCheck,
        title: "Guest KYC (DigiLocker)",
        desc: "Aadhaar verification via a real DigiLocker consent flow.",
        
      },
      {
        icon: KeyRound,
        title: "Verification Code Lookup",
        desc: "Type a guest's code, confirm identity instantly — no DigiLocker needed again.",
        
      },
    ],
    [
      {
        icon: DoorOpen,
        title: "Check-in / Check-out",
        desc: "Digital arrivals, departures, and room status tracking.",
        
      },
      {
        icon: Building2,
        title: "Property & Booking Management",
        desc: "Manage properties, rooms, and bookings in one place.",
        
      },
    ],
    [
      {
        icon: FileCheck2,
        title: "GST Verification",
        desc: "Your GSTIN is auto-verified against the GST portal at signup.",
        
      },
      {
        icon: ClipboardList,
        title: "Compliance & Audit Reports",
        desc: "Audit logs and compliance-ready reporting for your property.",
        
      },
    ],
  ],
  panel: {
    icon: Users,
    title: "One-time Guest Verification",
    desc: "Guests verify once — every hotel on Sypnofy confirms them instantly",
    cta: "Learn more",
    
  },
};

const INDUSTRIES_DROPDOWN = [
  { title: "Flight", to: "/industries/flights", icon: Plane },
  { title: "API", to: "/industries/api", icon: Code2 },
];

// "For Hotels" dropdown — hotel-vendor login/signup, tucked away here so
// it doesn't compete with the primary guest CTAs on the right.
// "For Hotels" dropdown — hotel-vendor login/signup, tucked away here so
// it doesn't compete with the primary guest CTAs on the right.
const FOR_HOTELS_DROPDOWN = [
  { title: "Hotel Login", desc: "Sign in to your property dashboard", to: "/login" },
  { title: "List your property", desc: "Create a hotel-vendor account", to: "/signup" },
];

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Hotel", to: "/industries/hotels", icon: BedDouble },
  { label: "Flight", to: "/industries/flights", icon: Plane },
  { label: "API", to: "/industries/api", icon: Code2 },
  { label: "Products", mega: PRODUCTS_MEGA },
  { label: "Pricing", to: "/pricing" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/ContactUs" },
  
];

// -----------------------------------------------------------------------
// Logo
// -----------------------------------------------------------------------
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="3" width="12" height="18" rx="2" stroke="white" strokeWidth="2" />
          <path d="M8 8H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-slate-900">Sypnofy</span>
      </span>
    </Link>
  );
}

// -----------------------------------------------------------------------
// Full-width Products mega menu
// -----------------------------------------------------------------------
function ProductsMega({ open, data }) {
  const PanelIcon = data.panel.icon;

  return (
    <div
      className={`absolute inset-x-0 top-16 z-50 transition-all duration-250 ease-out ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="border-t border-slate-100 bg-white shadow-xl shadow-slate-200/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-8 px-6 py-9 lg:grid-cols-[1fr_1fr_1fr_300px] lg:px-8">
          {data.columns.map((col, i) => (
            <div key={i} className="flex flex-col gap-6">
              {col.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group flex items-start gap-2.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-100">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
                        {item.title}
                      </span>
                      <span className="mt-0.5 text-[12.5px] leading-snug text-slate-500">
                        {item.desc}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Highlight panel */}
          <Link
            to={data.panel.to}
            className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
            <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white">
              <PanelIcon size={20} />
            </span>
            <span className="text-base font-bold text-white">{data.panel.title}</span>
            <span className="mt-1 text-sm text-blue-100">{data.panel.desc}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              {data.panel.cta}
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Small dropdown (Industries, For Hotels)
// -----------------------------------------------------------------------
function SimpleDropdown({ open, items }) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60 ring-1 ring-black/5">
        {items.map((item) => {
          const Icon = item.icon;
          if (Icon) {
            return (
              <Link
                key={item.title}
                to={item.to}
                className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-blue-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-100">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                  {item.title}
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={item.title}
              to={item.to}
              className="group flex flex-col rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-blue-50"
            >
              <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                {item.title}
              </span>
              <span className="text-xs text-slate-500">{item.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Desktop nav item — plain link or small anchored dropdown (Industries,
// For Hotels)
// -----------------------------------------------------------------------
function NavItem({ link }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);

  const handleEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  };

  if (!link.dropdown) {
    const Icon = link.icon;
    return (
      <Link
  to={link.to}
  className="flex items-center gap-1.5 whitespace-nowrap text-[14px] font-medium text-slate-700 transition-colors duration-200 hover:text-blue-600"
>
        {Icon && <Icon size={16} strokeWidth={2} />}
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={`flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${
          open ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
        }`}
        aria-expanded={open}
      >
        {link.label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <SimpleDropdown open={open} items={link.dropdown} />
    </div>
  );
}
// -----------------------------------------------------------------------
// Mobile accordion item
// -----------------------------------------------------------------------
function MobileAccordionItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false);
  const items = link.mega
    ? link.mega.columns.flat()
    : link.dropdown
    ? link.dropdown
    : null;

  if (!items) {
    const Icon = link.icon;
    return (
      <Link
        to={link.to}
        onClick={onNavigate}
        className="flex items-center gap-2 py-3 text-[15px] font-medium text-slate-700 border-b border-slate-100 last:border-0"
      >
        {Icon && <Icon size={16} strokeWidth={2} className="text-slate-500" />}
        {link.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-slate-700"
      >
        {link.label}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pb-3 pl-3">
            {items.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                onClick={onNavigate}
                className="rounded-lg px-2 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// -----------------------------------------------------------------------
// Main Navbar
// -----------------------------------------------------------------------
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Products mega menu is controlled here so the panel can render
  // full-width against the header instead of being constrained to the
  // width of the "Products" trigger button.
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef(null);
  const openMega = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMegaDelayed = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Frosted nav bar. backdrop-blur lives on THIS inner wrapper, not on
          <header> itself — filter/backdrop-filter creates a new containing
          block for position:fixed descendants, and the mobile slide-over
          menu below is fixed. If backdrop-blur were on <header>, the fixed
          panel would size itself against header's ~64px height instead of
          the viewport, making it collapse to an invisible sliver. */}
      <div
        className={`bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left cluster: logo + nav links, hugging the left side */}
          <div className="flex items-center gap-8 xl:gap-10">
            <Logo />

            <div className="hidden lg:flex lg:items-center lg:gap-8 whitespace-nowrap">
              {NAV_LINKS.map((link) => {
                if (link.mega) {
                  return (
                    <div
                      key={link.label}
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaDelayed}
                    >
                      <button
                        className={`flex items-center gap-1 text-[15px] font-medium transition-colors duration-200 ${
                          megaOpen ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                        }`}
                        aria-expanded={megaOpen}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  );
                }
                return <NavItem key={link.label} link={link} />;
              })}
            </div>
          </div>

          {/* Right side (desktop) — guest sign-in / sign-up are the
              primary CTAs here; hotel login lives in the "For Hotels"
              dropdown on the left instead, so the two audiences don't
              collide on the same two buttons. */}
          <div className="hidden lg:flex lg:items-center lg:gap-5 shrink-0">
  <NavItem link={{ label: "For Hotels", dropdown: FOR_HOTELS_DROPDOWN }} />

  <div className="h-5 w-px bg-slate-200" />

  <Link
    to="/guest/login"
    className="whitespace-nowrap text-[14px] font-medium text-slate-700 transition-colors duration-200 hover:text-blue-600"
  >
    Sign in
  </Link>
  <Link
    to="/guest/signup"
    className="whitespace-nowrap rounded-full bg-blue-600 px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
  >
    Sign up
  </Link>
</div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Products mega menu — inside the blurred wrapper (same width as
            nav), so it still anchors correctly via top-16/inset-x-0. */}
        <div onMouseEnter={openMega} onMouseLeave={closeMegaDelayed}>
          <ProductsMega open={megaOpen} data={PRODUCTS_MEGA} />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Mobile slide-over menu — direct children of <header>, which has
          NO backdrop-blur, so these fixed elements correctly size/position
          against the viewport. */}
      {/* ------------------------------------------------------------- */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Logo />
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-4 py-2">
          <div className="flex-1">
            {NAV_LINKS.map((link) => (
              <MobileAccordionItem
                key={link.label}
                link={link}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </div>
          <div className="my-4 flex flex-col gap-3">
  <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
    For Hotels
  </p>
  <Link
  to="/login"
  onClick={() => setMobileOpen(false)}
  className="block rounded-full border border-slate-200 px-5 py-3 text-center text-[15px] font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
>
  Hotel Login
</Link>
<Link
  to="/signup"
  onClick={() => setMobileOpen(false)}
  className="block rounded-full border border-slate-200 px-5 py-3 text-center text-[15px] font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
>
  List your property
</Link>

  <p className="mt-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
    For Guests
  </p>
  <Link
    to="/guest/login"
    onClick={() => setMobileOpen(false)}
    className="block rounded-full border border-blue-600 px-5 py-3 text-center text-[15px] font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
  >
    Sign in
  </Link>
  <Link
    to="/guest/signup"
    onClick={() => setMobileOpen(false)}
    className="block rounded-full bg-blue-600 px-5 py-3 text-center text-[15px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
  >
    Sign up
  </Link>
</div>

          <div className="my-4 flex flex-col gap-3">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              For Guests
            </p>
            <Link
              to="/guest/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-full border border-blue-600 px-5 py-3 text-center text-[15px] font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
            >
              Sign in
            </Link>
            <Link
              to="/guest/signup"
              onClick={() => setMobileOpen(false)}
              className="block rounded-full bg-blue-600 px-5 py-3 text-center text-[15px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}