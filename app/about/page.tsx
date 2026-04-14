import Image from "next/image";

const impactStats = [
  {
    title: "2024",
    label: "Founded",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M8 3.5V7" strokeLinecap="round" />
        <path d="M16 3.5V7" strokeLinecap="round" />
        <path d="M3.5 10h17" />
      </svg>
    ),
    iconColor: "text-blue-600",
  },
  {
    title: "25,000+",
    label: "Lives Impacted",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M12 20s-7.5-4.9-7.5-10.1A4.4 4.4 0 0 1 12 6.8a4.4 4.4 0 0 1 7.5 3.1C19.5 15.1 12 20 12 20Z" />
      </svg>
    ),
    iconColor: "text-red-500",
  },
  {
    title: "150+",
    label: "Partner Organizations",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M8 12.4a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z" />
        <path d="M16.1 10.8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M2.8 19c.6-3.2 2.8-4.6 5.2-4.6s4.6 1.4 5.2 4.6" strokeLinecap="round" />
        <path d="M14 18.8c.3-2.2 1.8-3.4 3.8-3.4 1.7 0 3.1 1 3.5 2.8" strokeLinecap="round" />
      </svg>
    ),
    iconColor: "text-lime-500",
  },
];

const highlights = [
  {
    title: "Transparency",
    text: "Real-time tracking of blood stock and donations.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    text: "Verified donors and organizations for safe donations.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M12 20s6.8-4.2 6.8-9.8V5.6L12 3 5.2 5.6v4.6C5.2 15.8 12 20 12 20Z" />
      </svg>
    ),
  },
  {
    title: "Community",
    text: "Building a strong network of life-savers.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M7.7 11.4a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" />
        <path d="M16.3 11.4a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" />
        <path d="M3.8 19c.6-2.9 2.6-4.5 4.9-4.5s4.3 1.6 4.9 4.5" strokeLinecap="round" />
        <path d="M10.4 19c.6-2.9 2.6-4.5 4.9-4.5s4.3 1.6 4.9 4.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#ececec] px-6 pb-24 pt-30 text-slate-900 sm:px-10 lg:px-16">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#1b1b1d] sm:text-5xl lg:text-6xl">
            Our Mission to <span className="text-red-500">Save Lives</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
            HemaFlow is dedicated to bridging the gap between blood donors and
            those in need. We believe that technology can play a vital role in
            making blood donation more accessible and efficient.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["AL", "MK", "RP", "JN"].map((initials) => (
                <span
                  key={initials}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ececec] bg-zinc-300 text-[10px] font-bold text-zinc-700"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-600 sm:text-base">
              Joined by 10,000+ donors worldwide
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.6rem] bg-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <Image
            src="/assets/hero-image.jpg"
            alt="Community of blood donors"
            width={1100}
            height={760}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-7">
        {impactStats.map((item) => (
          <article
            key={item.label}
            className="rounded-3xl bg-[#f7f7f7] px-6 py-9 text-center shadow-[0_3px_12px_rgba(0,0,0,0.04)]"
          >
            <div className={`mx-auto flex w-fit items-center justify-center ${item.iconColor}`}>
              {item.icon}
            </div>
            <h3 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 sm:text-base">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-18 grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.02fr]">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
            Why Choose HemaFlow?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
            We provide a seamless experience for donors and organizations to
            manage blood donation activities.
          </p>

          <div className="mt-8 space-y-6">
            {highlights.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="mt-1 text-red-500">{item.icon}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base leading-7 text-zinc-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[170px_170px]">
          <article className="relative overflow-hidden rounded-[1.8rem] bg-zinc-200">
            <Image
              src="/assets/hero-image.jpg"
              alt="Preparing blood donation equipment"
              fill
              className="object-cover object-left"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </article>

          <article className="rounded-[1.8rem] bg-[#f1f1f1] px-6 py-7 shadow-[0_3px_12px_rgba(0,0,0,0.04)]">
            <div className="mb-4 text-lime-500">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
                <circle cx="12" cy="12" r="8" />
                <path d="m8.8 12 2.1 2.2 4.3-4.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              Award Winning
            </h3>
            <p className="mt-2 text-base leading-6 text-zinc-600">
              Recognized for innovation in healthcare technology.
            </p>
          </article>

          <article className="rounded-[1.8rem] bg-red-500 px-6 py-7 text-white shadow-[0_6px_18px_rgba(239,68,68,0.4)]">
            <div className="mb-4">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M12 3 5 6.2v5.2c0 4.7 2.9 8.3 7 9.6 4.1-1.3 7-4.9 7-9.6V6.2Z" />
                <circle cx="12" cy="11" r="2.1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Award Winning</h3>
            <p className="mt-2 text-base leading-6 text-red-50">
              Recognized for innovation in healthcare technology.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[1.8rem] bg-zinc-200">
            <Image
              src="/assets/hero-image.jpg"
              alt="Healthcare team during a blood drive"
              fill
              className="object-cover object-right"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </article>
        </div>
      </section>
    </div>
  );
}
