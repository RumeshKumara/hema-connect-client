export default function ContactPage() {
  return (
    // Centered contact intro section with gradient background.
    <section className="flex flex-1 items-center justify-center bg-linear-to-tr from-emerald-50 via-teal-50 to-cyan-50 px-6 py-16">
      {/* Main contact card with intro and contact details. */}
      <div className="w-full max-w-4xl rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-lg shadow-emerald-100 backdrop-blur sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Contact
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
          Reach out to the Hema Connect team for questions, collaboration, or
          support. Replace the details below with your preferred contact points.
        </p>

        {/* Contact information grid for direct communication channels. */}
        <div className="mt-8 grid gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 text-slate-800 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Email
            </h2>
            <p className="mt-2">hello@hemaconnect.com</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Phone
            </h2>
            <p className="mt-2">+1 (000) 000-0000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
