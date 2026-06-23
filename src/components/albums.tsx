"use client"

import { useInView } from "@/hooks/use-in-view"

const ALBUMS = [
  {
    title: "Grand Opening Night",
    date: "2025",
    href: "https://myalbum.com/album/hSgb2AwKRNNZHk/?invite=0a3e3281-ea85-4ae5-a5b3-07d182804f75",
    cover: "/images/albums/album-1.jpg",
    gradient:
      "radial-gradient(ellipse at 30% 40%, rgba(0,200,212,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 65%, rgba(123,47,190,0.09) 0%, transparent 55%), linear-gradient(155deg, #0c0a1e, #160e2a, #0a0c18)",
  },
  {
    title: "Neon Nights Vol. 1",
    date: "2025",
    href: "https://myalbum.com/album/Kpp3E7jukNTLMU/?invite=9b2110ed-845e-42fd-aa3a-0c7abaf2252c",
    cover: "/images/albums/album-2.jpg",
    gradient:
      "radial-gradient(ellipse at 55% 35%, rgba(201,168,76,0.1) 0%, transparent 55%), radial-gradient(ellipse at 35% 70%, rgba(0,200,212,0.08) 0%, transparent 55%), linear-gradient(155deg, #10101e, #0e0a1c, #0c1020)",
  },
  {
    title: "Weekend Sessions",
    date: "2025",
    href: "https://myalbum.com/album/oRUura8dxr5czv/?invite=a1e9de27-05ea-4308-ae91-cf17baa91f0c",
    cover: "/images/albums/album-3.jpg",
    gradient:
      "radial-gradient(ellipse at 60% 50%, rgba(176,72,136,0.1) 0%, transparent 55%), radial-gradient(ellipse at 30% 30%, rgba(0,200,212,0.07) 0%, transparent 55%), linear-gradient(155deg, #0a0a16, #14102a, #0c0e1a)",
  },
]

export default function Albums() {
  const [ref, inView] = useInView()

  return (
    <section
      id="albums"
      ref={ref}
      className="relative bg-bg py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Header ---- */}
        <div className="mb-[56px]">
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; Captured Moments
          </p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-5">
            Photo
            <br />
            Albums
          </h2>
          <p className="text-[15px] font-light text-text-dim leading-[1.85] max-w-[480px]">
            Relive the energy. Browse our event galleries and find yourself in
            the moments that made each night unforgettable.
          </p>
        </div>

        {/* ---- Album grid ---- */}
        <div
          className="
            grid grid-cols-3 gap-[6px]
            max-[1024px]:grid-cols-2
            max-[640px]:grid-cols-1
          "
        >
          {ALBUMS.map((album, i) => (
            <a
              key={album.title}
              href={album.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative aspect-[4/5] overflow-hidden
                animate-card-in cursor-pointer
                focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
              "
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Cover image with gradient fallback */}
              <div
                className="absolute inset-0 transition-transform duration-[0.8s] ease-[--ease-out-expo] group-hover:scale-[1.06]"
                style={{ background: album.gradient }}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,6,10,0.15)] via-transparent via-[40%] to-[rgba(6,6,10,0.85)]" />

              {/* Accent glow on hover */}
              <div
                className="
                  absolute inset-0 opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, rgba(0,200,212,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 z-[3] p-7">
                <span className="block text-[9px] tracking-[0.22em] uppercase text-accent mb-2">
                  {album.date}
                </span>
                <h3 className="font-label text-[clamp(22px,3vw,30px)] tracking-[0.08em] text-text-main leading-[1.05] mb-4">
                  {album.title}
                </h3>

                {/* View button */}
                <span
                  className="
                    inline-flex items-center gap-2.5
                    text-[10px] font-medium tracking-[0.2em] uppercase text-accent
                    py-[8px] px-[18px]
                    border border-border-accent
                    transition-[background,transform,box-shadow] duration-200
                    group-hover:bg-accent-glow group-hover:-translate-y-0.5 group-hover:shadow-[0_0_18px_rgba(0,200,212,0.18)]
                  "
                >
                  View Album
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
