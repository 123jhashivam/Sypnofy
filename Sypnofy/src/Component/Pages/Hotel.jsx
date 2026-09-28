import { motion, AnimatePresence } from "framer-motion";
import {
  Hotel as HotelIcon,
  MapPin,
  CalendarDays,
  Users,
  Search,
  Star,
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Car,
  ShieldCheck,
  ChevronDown,
  SlidersHorizontal,
  Heart,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import { useState } from "react";

/* =========================
   DATA
========================= */

const destinations = [
  {
    city: "Goa",
    subtitle: "Beach stays & resorts",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Mumbai",
    subtitle: "Hotels in the city",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Delhi",
    subtitle: "Business & luxury stays",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Jaipur",
    subtitle: "Royal stays",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
  },
];

const hotels = [
  {
    name: "The Sypnofy Grand",
    location: "New Delhi, India",
    rating: "4.8",
    reviews: "1,248",
    price: "₹4,999",
    oldPrice: "₹7,499",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
    tags: ["Free WiFi", "Breakfast", "Pool"],
    type: "Luxury Hotel",
  },
  {
    name: "Azure Bay Resort",
    location: "North Goa, India",
    rating: "4.7",
    reviews: "892",
    price: "₹6,499",
    oldPrice: "₹9,999",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
    tags: ["Beach Access", "Pool", "Restaurant"],
    type: "Resort",
  },
  {
    name: "Urban Heights",
    location: "Mumbai, India",
    rating: "4.6",
    reviews: "734",
    price: "₹3,799",
    oldPrice: "₹5,499",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
    tags: ["Free WiFi", "Gym", "Parking"],
    type: "Business Hotel",
  },
  {
    name: "Royal Heritage Palace",
    location: "Jaipur, India",
    rating: "4.9",
    reviews: "1,560",
    price: "₹7,299",
    oldPrice: "₹10,999",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    tags: ["Breakfast", "Spa", "Restaurant"],
    type: "Heritage Hotel",
  },
  {
    name: "The Blue Horizon",
    location: "Bengaluru, India",
    rating: "4.5",
    reviews: "621",
    price: "₹3,499",
    oldPrice: "₹4,999",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    tags: ["Free WiFi", "Gym", "Parking"],
    type: "Hotel",
  },
  {
    name: "Ocean Pearl",
    location: "Goa, India",
    rating: "4.8",
    reviews: "982",
    price: "₹5,899",
    oldPrice: "₹8,499",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
    tags: ["Beach Access", "Pool", "Breakfast"],
    type: "Resort",
  },
];

const filters = [
  "Free Cancellation",
  "Breakfast Included",
  "Swimming Pool",
  "Free WiFi",
  "Parking",
  "Gym",
];

/* =========================
   SEARCH CARD
========================= */

function SearchCard() {
  const [destination, setDestination] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6"
    >
      <div className="rounded-[28px] border border-white/70 bg-white/95 p-4 shadow-[0_25px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <HotelIcon size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Search hotels
            </h2>
            <p className="text-sm text-slate-500">
              Find your perfect stay
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1.15fr_auto]">
          {/* Destination */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-blue-500 focus-within:bg-white">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Where to
            </label>

            <div className="flex items-center gap-2">
              <MapPin size={19} className="shrink-0 text-blue-600" />

              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City, area or hotel"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Check in */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Check-in
            </label>

            <div className="flex items-center gap-2">
              <CalendarDays size={19} className="shrink-0 text-blue-600" />

              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Check out */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Check-out
            </label>

            <div className="flex items-center gap-2">
              <CalendarDays size={19} className="shrink-0 text-blue-600" />

              <input
                type="date"
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <button
              onClick={() => setShowGuests(!showGuests)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-300 hover:bg-white"
            >
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Guests & Rooms
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <Users size={19} className="text-blue-600" />
                {guests} Guests · {rooms} Room
                <ChevronDown
                  size={16}
                  className={`ml-auto transition ${
                    showGuests ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <AnimatePresence>
              {showGuests && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  className="absolute right-0 top-full z-50 mt-2 w-full min-w-[260px] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="font-semibold text-slate-800">Guests</p>
                      <p className="text-xs text-slate-400">
                        Adults and children
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600"
                      >
                        −
                      </button>

                      <span className="w-5 text-center font-semibold">
                        {guests}
                      </span>

                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="h-8 w-8 rounded-full bg-blue-600 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="font-semibold text-slate-800">Rooms</p>
                      <p className="text-xs text-slate-400">
                        Number of rooms
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="h-8 w-8 rounded-full border border-slate-200 text-slate-600"
                      >
                        −
                      </button>

                      <span className="w-5 text-center font-semibold">
                        {rooms}
                      </span>

                      <button
                        onClick={() => setRooms(rooms + 1)}
                        className="h-8 w-8 rounded-full bg-blue-600 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <button className="flex min-h-[68px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   HOTEL CARD
========================= */

function HotelCard({ hotel, index }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.07)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(37,99,235,0.14)]"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-lg">
          {hotel.type}
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-slate-600"
            }
          />
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-lg">
          <Star size={15} className="fill-amber-400 text-amber-400" />

          <span className="text-sm font-bold text-slate-800">
            {hotel.rating}
          </span>

          <span className="text-xs text-slate-500">
            ({hotel.reviews})
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="truncate text-xl font-bold text-slate-900">
          {hotel.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={15} className="shrink-0 text-blue-600" />
          <span className="truncate">{hotel.location}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="my-5 h-px bg-slate-100" />

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">
                {hotel.oldPrice}
              </span>

              <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
                SAVE
              </span>
            </div>

            <div className="mt-1">
              <span className="text-2xl font-extrabold text-slate-900">
                {hotel.price}
              </span>

              <span className="ml-1 text-xs text-slate-400">
                / night
              </span>
            </div>
          </div>

          <button className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            View
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================
   DESTINATIONS
========================= */

function PopularDestinations() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700">
              EXPLORE DESTINATIONS
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular places to stay
            </h2>

            <p className="mt-3 max-w-2xl text-slate-500">
              Discover comfortable stays in some of the most loved
              destinations.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-72 overflow-hidden rounded-3xl"
            >
              <img
                src={destination.image}
                alt={destination.city}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">
                  {destination.city}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {destination.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   WHY Sypnofy
========================= */

function WhySypnofy() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified stays",
      text: "Discover trusted properties with reliable information.",
    },
    {
      icon: Search,
      title: "Easy discovery",
      text: "Find hotels based on location, price and preferences.",
    },
    {
      icon: Wifi,
      title: "Connected experience",
      text: "A smooth digital experience from search to stay.",
    },
    {
      icon: HotelIcon,
      title: "Built for hospitality",
      text: "Designed with modern hotel operations in mind.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-xs font-bold tracking-wider text-blue-300"
          >
            WHY Sypnofy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-extrabold sm:text-5xl"
          >
            A smarter way to discover your stay
          </motion.h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            From discovery to verification, Sypnofy brings a modern
            hospitality experience together in one place.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -7 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-900/30">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================
   HOTEL PAGE
========================= */

export default function Hotel() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (filter) => {
    setSelectedFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter]
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7FAFF] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700">
        {/* Glow */}
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/30 blur-[130px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold tracking-wider text-blue-100 backdrop-blur-md"
            >
              <HotelIcon size={15} />
              SMART HOTEL DISCOVERY
            </motion.div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Find a stay that
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                feels right.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg">
              Discover hotels, resorts and stays with a seamless experience
              built for modern travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEARCH */}
      <SearchCard />

      {/* FEATURED HOTELS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700">
                FEATURED STAYS
              </span>

              <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Stay somewhere
                <span className="text-blue-600"> exceptional</span>
              </h2>

              <p className="mt-3 max-w-2xl text-slate-500">
                Hand-picked stays with great locations, amenities and guest
                ratings.
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </motion.div>

          {/* FILTERS */}
          <div className="mt-10 hidden items-center gap-3 overflow-x-auto pb-2 lg:flex">
            <span className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-700">
              <SlidersHorizontal size={17} />
              Popular filters:
            </span>

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedFilters.includes(filter)
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {selectedFilters.includes(filter) && (
                  <Check size={14} />
                )}
                {filter}
              </button>
            ))}
          </div>

          {/* MOBILE FILTERS */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden lg:hidden"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold">Filters</h3>

                    <button
                      onClick={() => setShowFilters(false)}
                      className="rounded-full bg-slate-100 p-2"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`rounded-full border px-3 py-2 text-xs font-medium ${
                          selectedFilters.includes(filter)
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HOTEL GRID */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel, index) => (
              <HotelCard
                key={hotel.name}
                hotel={hotel}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 font-bold text-blue-600 shadow-sm transition hover:bg-blue-50">
              Explore more hotels
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <PopularDestinations />

      {/* WHY Sypnofy */}
      <WhySypnofy />

      {/* FINAL CTA */}
      <section className="bg-white px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 to-cyan-500 px-7 py-14 text-center shadow-2xl shadow-blue-200 sm:px-12"
        >
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-blue-950/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Ready to find your next stay?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-50">
              Search comfortable stays and discover a better way to travel
              with Sypnofy.
            </p>

            <button className="mt-8 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-xl transition hover:-translate-y-1">
              Search Hotels
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}