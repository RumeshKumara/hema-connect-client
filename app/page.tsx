import Link from "next/link";

export default function Home() {
  // Highlight numbers shown in the quick stats section.
  const stats = [
    { value: "10k+", label: "Active Donors" },
    { value: "500+", label: "Campaigns" },
    { value: "25k+", label: "Lives Saved" },
  ];

  // Feature cards that explain key capabilities.
  const features = [
    {
      title: "Real-time Tracking",
      description: "Monitor blood stock levels and campaign progress in real-time.",
      iconColor: "text-blue-600",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Location Based",
      description: "Find donation campaigns and centers near your current location.",
      iconColor: "text-lime-500",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3 5 6v6c0 4.6 3 7.9 7 9 4-1.1 7-4.4 7-9V6z" />
          <path d="m9.5 12.2 1.6 1.6 3.4-3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Easy Registration",
      description: "Quick and simple registration process for donors and organizations.",
      iconColor: "text-red-500",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#ededee]">
      {/* Hero section with image overlay, headline, and primary actions. */}
      <section className="relative top-0 min-h-screen overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-image.png')" }}
        />
        <div className="absolute inset-0 bg-black/58" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center md:py-24">
          <div className="rounded-full border border-red-500/80 bg-black/35 px-5 py-2 text-sm font-medium text-red-500 backdrop-blur-sm">
        ♡ Save Lives Today
          </div>
          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        Your Blood Can <span className="text-red-500">Save a Life</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200">
        HemaFlow is a comprehensive blood donation management system
        connecting donors, organizations, and hospitals in real-time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          className="rounded-full bg-red-500 px-10 py-4 text-xl font-semibold text-white transition hover:bg-red-600"
        >
          Become a Donor
        </button>
        <Link
          href="/about"
          className="rounded-full border border-red-500/65 bg-black/40 px-10 py-4 text-xl font-semibold text-white transition hover:border-red-400 hover:bg-black/60"
        >
          Learn More
        </Link>
          </div>
        </div>
      </section>

      {/* Quick impact stats displayed in a responsive 3-column layout. */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 px-6 py-14 text-center sm:grid-cols-3 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-3 ${index > 0 ? "border-t border-zinc-300 sm:border-t-0 sm:border-l" : ""}`}
          >
            <p className="text-5xl font-bold text-red-500">{stat.value}</p>
            <p className="mt-2 text-2xl font-medium text-zinc-700">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Feature highlights explaining why users should choose the platform. */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-8 text-center">
        <h2 className="text-6xl font-bold tracking-tight text-black">Why Choose HemaFlow?</h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-zinc-500">
          We provide a seamless experience for donors and organizations to manage
          blood donation activities.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-4xl bg-[#f8f8f8] px-8 py-10 text-center shadow-[0_5px_18px_rgba(0,0,0,0.04)]"
            >
              <div className={`mx-auto mb-4 flex w-fit items-center justify-center ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-3xl font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mx-auto mt-4 max-w-xs text-lg leading-7 text-zinc-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Call-to-action banner encouraging user conversion. */}
      <section className="px-6 pb-28">
        <div className="mx-auto w-full max-w-6xl rounded-[3rem] bg-red-500 px-8 py-16 text-center text-white sm:px-14 sm:py-20">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Ready to make a difference?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-2xl leading-9 text-red-50">
            HemaFlow is a comprehensive blood donation management system
            connecting donors, organizations, and hospitals in real-time.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-white px-10 py-4 text-2xl font-semibold text-red-500 transition hover:bg-red-50"
            >
              Get Started Now
            </button>
            <Link
              href="/contact"
              className="rounded-full bg-[#cf0000] px-10 py-4 text-2xl font-semibold text-white transition hover:bg-[#bb0000]"
            >
              Contac Us
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer to provide breathing room before the footer. */}
      <section className="h-14" />
    </div>
  );
}
