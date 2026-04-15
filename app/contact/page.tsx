export default function ContactPage() {
  return (
    <section className="bg-[#ededee] px-6 pb-24 pt-30 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
          Have a question, partnership idea, or support request? Send us a
          message and our team will respond as quickly as possible.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_1fr]">
          <article className="rounded-4xl bg-[#f8f8f8] p-7 shadow-[0_6px_22px_rgba(0,0,0,0.05)] sm:p-9">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Get in touch form
            </h2>
            <form className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold uppercase tracking-wide text-zinc-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold uppercase tracking-wide text-zinc-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold uppercase tracking-wide text-zinc-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold uppercase tracking-wide text-zinc-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  className="mt-2 w-full resize-y rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-red-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-600"
              >
                Send Message
              </button>
            </form>
          </article>

          <div className="space-y-6">
            <article className="rounded-4xl bg-white p-7 shadow-[0_6px_22px_rgba(0,0,0,0.05)] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                Contact Information
              </h2>

              <div className="mt-6 space-y-4 text-zinc-700">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                    Email
                  </p>
                  <p className="mt-1 text-base">support@hemaflow.com</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                    Phone
                  </p>
                  <p className="mt-1 text-base">+1 (555) 010-2345</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                    Address
                  </p>
                  <p className="mt-1 text-base">241 Community Lane, Colombo</p>
                </div>
              </div>
            </article>

            <article className="rounded-4xl bg-red-500 p-7 text-white shadow-[0_10px_25px_rgba(239,68,68,0.35)] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Support Hours</h2>
              <p className="mt-3 text-red-50">
                Our support team is available during the following hours.
              </p>

              <div className="mt-6 space-y-3 text-sm sm:text-base">
                <div className="flex items-center justify-between border-b border-white/30 pb-2">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/30 pb-2">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
