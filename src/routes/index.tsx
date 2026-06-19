import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shoeHero from "@/assets/shoe-hero.png";
import shoeSide from "@/assets/shoe-side.png";
import shoeGlow from "@/assets/shoe-glow.png";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import cinemaInnovation from "@/assets/cinema-innovation.jpg";
import cinemaCraft from "@/assets/cinema-craft.jpg";
import cinemaPerformance from "@/assets/cinema-performance.jpg";
import cinemaComfort from "@/assets/cinema-comfort.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLE/01 — Engineered Motion" },
      { name: "description", content: "An immersive cinematic experience for the next generation of performance footwear." },
      { property: "og:title", content: "SOLE/01 — Engineered Motion" },
      { property: "og:description", content: "An immersive cinematic experience for the next generation of performance footwear." },
    ],
  }),
  component: Index,
});

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // S1 — Hero parallax / shoe zoom
      gsap.to(".hero-headline", {
        yPercent: -40,
        opacity: 0,
        scrollTrigger: { trigger: ".s1", start: "top top", end: "bottom top", scrub: true },
      });
      // Premium Entrance
      gsap.fromTo(".hero-shoe",
        { scale: 0.85, rotationZ: -15, rotationX: 15, opacity: 0, filter: "blur(15px)" },
        { scale: 1, rotationZ: -8, rotationX: 0, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.out" }
      );

      // Upgraded 3D Cinematic Scroll Parallax
      gsap.to(".hero-shoe", {
        scale: 3, 
        rotationZ: 18, 
        rotationX: 25,
        rotationY: -20,
        yPercent: 45,
        xPercent: 15,
        filter: "drop-shadow(0px 100px 200px rgba(0, 255, 255, 0.8))",
        scrollTrigger: { 
          trigger: ".s1", 
          start: "top top", 
          end: "bottom top", 
          scrub: 1.5 
        },
      });
      gsap.to(".hero-aurora", {
        scale: 1.4, rotate: 30,
        scrollTrigger: { trigger: ".s1", start: "top top", end: "bottom top", scrub: true },
      });

      // S2 — Pinned storytelling
      const steps = gsap.utils.toArray<HTMLElement>(".s2-step");
      gsap.set(steps, { opacity: 0, y: 60 });
      gsap.set(steps[0], { opacity: 1, y: 0 });

      ScrollTrigger.create({
        trigger: ".s2",
        start: "top top",
        end: "bottom bottom",
        pin: ".s2-pin",
      });

      steps.forEach((step, i) => {
        if (i === 0) return;
        const startPct = (i / steps.length) * 100;
        const endPct = ((i + 0.5) / steps.length) * 100;
        gsap.to(steps[i - 1], {
          opacity: 0, y: -80, filter: "blur(8px)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".s2",
            start: `${startPct}% top`,
            end: `${endPct}% top`,
            scrub: 1.2,
          },
        });
        gsap.fromTo(step, { opacity: 0, y: 80, filter: "blur(8px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".s2",
            start: `${startPct}% top`,
            end: `${endPct}% top`,
            scrub: 1.2,
          },
        });
      });

      gsap.to(".s2-shoe", {
        rotate: 25, scale: 1.1,
        scrollTrigger: { trigger: ".s2", start: "top top", end: "bottom bottom", scrub: 1 },
      });

      // S3 — Horizontal scroll
      const track = document.querySelector(".s3-track") as HTMLElement;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".s3",
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // S5 — Product showcase, pin and transform
      ScrollTrigger.create({
        trigger: ".s5",
        start: "top top",
        end: "+=2500",
        pin: ".s5-pin",
      });
      gsap.to(".s5-shoe", {
        rotate: 360,
        scrollTrigger: { trigger: ".s5", start: "top top", end: "+=2500", scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>(".s5-stage").forEach((stage, i, arr) => {
        gsap.fromTo(stage, { opacity: i === 0 ? 1 : 0 }, {
          opacity: 1,
          scrollTrigger: {
            trigger: ".s5",
            start: `${(i / arr.length) * 100}% top`,
            end: `${((i + 0.3) / arr.length) * 100}% top`,
            scrub: true,
          },
        });
        if (i < arr.length - 1) {
          gsap.to(stage, {
            opacity: 0,
            scrollTrigger: {
              trigger: ".s5",
              start: `${((i + 0.7) / arr.length) * 100}% top`,
              end: `${((i + 1) / arr.length) * 100}% top`,
              scrub: true,
            },
          });
        }
      });

      // S6 — counters
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            el.textContent = target % 1 ? obj.v.toFixed(1) : Math.round(obj.v).toString();
          },
        });
      });

      // S7 — Parallax panels
      gsap.utils.toArray<HTMLElement>(".panel-img").forEach((img) => {
        gsap.fromTo(img, { yPercent: -15, scale: 1.2 }, {
          yPercent: 15,
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // S3 — Floating cinematic images parallax (inside horizontal pillars)
      gsap.utils.toArray<HTMLElement>(".s3-float").forEach((el, i) => {
        gsap.to(el, {
          y: () => (i % 2 === 0 ? -60 : 60),
          rotate: i % 2 === 0 ? 4 : -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".s3",
            start: "top top",
            end: () => `+=${(document.querySelector(".s3-track") as HTMLElement)?.scrollWidth ?? 2000}`,
            scrub: 1.5,
          },
        });
        gsap.to(el, {
          scale: 1.08,
          duration: 4 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });


      // Generic reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 80 }, {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // S9 — final shoe pulse
      gsap.to(".s9-shoe", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative bg-background text-foreground overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference">
        <div className="font-mono text-xs tracking-[0.3em] text-foreground">SOLE / 01</div>
        <ul className="hidden md:flex gap-10 font-mono text-xs tracking-[0.25em] text-foreground">
          <li>FILM</li><li>OBJECT</li><li>FIELD</li><li>INDEX</li>
        </ul>
        <div className="font-mono text-xs tracking-[0.3em] text-foreground">RESERVE →</div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="s1 relative h-screen w-full overflow-hidden grain">
        <div className="hero-aurora absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.65_0.28_265/0.35),transparent_60%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="hero-headline">
            <p className="font-mono text-xs tracking-[0.4em] text-cyan mb-6">CHAPTER 001 — WINTER ARCHIVE</p>
            <h1 className="font-display font-light text-[18vw] md:text-[14vw] leading-[0.85] tracking-tight">
              <span className="block text-stroke">ENGINEERED</span>
              <span className="block italic text-glow-cyan">motion</span>
            </h1>
            <p className="mt-8 font-mono text-xs tracking-[0.3em] text-muted-foreground">SCROLL TO ENTER</p>
          </div>
        </div>
        <img
          src={shoeHero}
          alt="SOLE/01 sneaker"
          className="hero-shoe absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[55vw] z-20 pointer-events-none drop-shadow-[0_40px_120px_rgba(255,0,200,0.45)]"
        />
        <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[10px] tracking-[0.3em] text-muted-foreground z-30">
          47.3°N / 8.5°E — ZÜRICH ATELIER
        </div>
        <div className="absolute bottom-8 right-6 md:right-12 font-mono text-[10px] tracking-[0.3em] text-muted-foreground z-30">
          REC ● 2026.01
        </div>
      </section>

      {/* SECTION 2 — Pinned storytelling 300vh */}
      <section className="s2 relative" style={{ height: "300vh" }}>
        <div className="s2-pin h-screen w-full flex items-center overflow-hidden grain">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full items-center">
            <div className="relative px-6 md:px-16 h-full flex items-center">
              <div className="relative w-full">
                {[
                  { n: "01", t: "Carbon Weave", d: "A continuous filament shell, woven on a six-axis loom. Lighter than air, harder than doubt." },
                  { n: "02", t: "Liquid Cushion", d: "Pressure-mapped foam that solidifies on impact. Soft when you land, rigid when you push." },
                  { n: "03", t: "Magnetic Lace", d: "No knots. No fuss. A field that snaps the upper into geometry — instantly." },
                  { n: "04", t: "Adaptive Sole", d: "Reads your gait at 800Hz and rebalances the platform between heel and toe." },
                ].map((s) => (
                  <div key={s.n} className="s2-step absolute inset-0 flex flex-col justify-center">
                    <p className="font-mono text-xs tracking-[0.4em] text-magenta mb-6">STEP {s.n} / 04</p>
                    <h2 className="font-display font-light text-6xl md:text-8xl leading-none tracking-tight">
                      {s.t}
                    </h2>
                    <p className="mt-8 max-w-md text-lg text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.88_0.18_200/0.2),transparent_70%)]" />
              <img src={shoeSide} alt="" loading="lazy" className="s2-shoe relative w-[90%] z-10 drop-shadow-[0_30px_80px_rgba(0,255,255,0.3)]" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Horizontal scroll with floating cinematic images */}
      <section className="s3 relative h-screen w-full overflow-hidden">
        <div className="s3-track h-screen flex" style={{ width: "max-content" }}>
          {[
            { l: "INNOVATION", img: cinemaInnovation, c: "text-cyan", bg: "from-cyan/20", cap: "Material — Carbon Filament" },
            { l: "CRAFTSMANSHIP", img: cinemaCraft, c: "text-yellow", bg: "from-yellow/20", cap: "Hand — Zürich Atelier" },
            { l: "PERFORMANCE", img: cinemaPerformance, c: "text-magenta", bg: "from-magenta/20", cap: "Field — Tokyo, 03:14" },
            { l: "COMFORT", img: cinemaComfort, c: "text-electric", bg: "from-electric/20", cap: "Cushion — Reactive Foam" },
          ].map((s, i) => (
            <div key={s.l} className={`relative w-screen h-screen flex items-center justify-center px-12 bg-gradient-to-br ${s.bg} to-transparent overflow-hidden`}>
              <div className="s3-float relative h-[78vh] w-[58vh] max-w-[80vw] overflow-hidden rounded-sm shadow-[0_40px_120px_rgba(0,0,0,0.6)] will-change-transform">
                <img src={s.img} alt={s.l} loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-foreground/80">
                  FRAME 00{i + 1} / 004
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className={`font-mono text-[10px] tracking-[0.3em] ${s.c}`}>● REC</span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/70">{s.cap}</span>
                </div>
              </div>
              <h3 className={`pointer-events-none absolute bottom-16 left-12 font-display font-light text-5xl md:text-8xl tracking-tight mix-blend-difference ${s.c}`}>
                {s.l}
              </h3>
              <div className="absolute top-12 right-12 font-mono text-xs tracking-[0.3em] text-muted-foreground">
                CHAPTER 00{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Cinematic video / image bg */}
      <section className="relative h-screen w-full overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${lifestyle1})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="reveal font-mono text-xs tracking-[0.4em] text-cyan mb-8">SHORT FILM — 01:47</p>
          <h2 className="reveal font-display font-extralight text-5xl md:text-9xl leading-[0.9] max-w-5xl">
            The city <span className="italic text-glow-magenta">moves</span><br/>because <span className="text-stroke">you do.</span>
          </h2>
        </div>
      </section>

      {/* SECTION 5 — Interactive product showcase */}
      <section className="s5 relative" style={{ height: "300vh" }}>
        <div className="s5-pin relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-aurora opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,#000_80%)]" />

          {/* stages */}
          <div className="s5-stage absolute top-12 left-12 font-mono text-xs tracking-[0.3em] z-20">
            <div className="text-cyan">// CHASSIS</div>
            <div className="text-muted-foreground mt-2">Carbon-laced midfoot</div>
          </div>
          <div className="s5-stage absolute top-12 left-12 font-mono text-xs tracking-[0.3em] z-20">
            <div className="text-magenta">// MATERIAL</div>
            <div className="text-muted-foreground mt-2">Reactive polymer shell</div>
          </div>
          <div className="s5-stage absolute top-12 left-12 font-mono text-xs tracking-[0.3em] z-20">
            <div className="text-yellow">// PLATFORM</div>
            <div className="text-muted-foreground mt-2">Quantum-foam stack — 38mm</div>
          </div>

          <img src={shoeHero} alt="" loading="lazy" className="s5-shoe relative w-[70vw] md:w-[55vw] z-10 drop-shadow-[0_40px_120px_rgba(0,200,255,0.6)]" />

          <div className="absolute bottom-12 right-12 text-right z-20">
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">OBJECT</p>
            <p className="font-display text-3xl md:text-5xl">SOLE / 01</p>
            <p className="font-mono text-xs text-cyan mt-2">€ 420</p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Performance stats */}
      <section className="relative min-h-screen w-full py-32 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_20%_30%,oklch(0.88_0.18_200/0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto">
          <p className="reveal font-mono text-xs tracking-[0.4em] text-cyan mb-8">FIELD DATA — 12 MONTH TRIAL</p>
          <h2 className="reveal font-display font-extralight text-5xl md:text-8xl leading-none mb-24 max-w-4xl">
            Numbers that <span className="italic text-glow-cyan">move</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { v: 247, suf: "g", label: "Per shoe — size 9" },
              { v: 38, suf: "%", label: "Return energy" },
              { v: 800, suf: "Hz", label: "Sensor refresh rate" },
            ].map((stat, i) => (
              <div key={i} className="reveal">
                <div className="flex items-baseline gap-2">
                  <span className="counter font-display font-extralight text-[16vw] md:text-[10vw] leading-none text-glow-magenta" data-value={stat.v}>0</span>
                  <span className="font-display text-3xl text-muted-foreground">{stat.suf}</span>
                </div>
                <p className="mt-6 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Lifestyle panels parallax */}
      <section className="relative">
        {[
          { src: lifestyle1, t: "After hours", s: "Shibuya, 03:14" },
          { src: lifestyle3, t: "Off duty", s: "Studio B, Berlin" },
          { src: lifestyle2, t: "Inside the weave", s: "Material study" },
        ].map((p, i) => (
          <div key={i} className="relative h-screen w-full overflow-hidden">
            <img src={p.src} alt={p.t} loading="lazy" className="panel-img absolute inset-0 w-full h-[130%] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute bottom-16 left-6 md:left-16 max-w-2xl">
              <p className="font-mono text-xs tracking-[0.4em] text-cyan mb-4">CAMPAIGN 0{i+1}</p>
              <h3 className="font-display font-extralight text-6xl md:text-9xl leading-none">{p.t}</h3>
              <p className="mt-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">{p.s}</p>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 8 — Editorial testimonials with neon blobs */}
      <section className="relative py-40 px-6 md:px-16 overflow-hidden">
        {/* Global neon blobs floating behind all quotes */}
        <div className="neon-blob w-[500px] h-[500px] bg-[oklch(0.88_0.18_200/0.45)] top-[-100px] left-[-120px]" />
        <div className="neon-blob neon-blob-alt w-[400px] h-[400px] bg-[oklch(0.7_0.32_340/0.4)] top-[30%] right-[-80px]" />
        <div className="neon-blob w-[600px] h-[600px] bg-[oklch(0.65_0.28_265/0.35)] bottom-[-150px] left-[20%]" />

        <div className="max-w-6xl mx-auto space-y-40 relative z-10">
          {[
            { q: "It's the first shoe that feels like it was waiting for me to put it on.", a: "Lena Voss", r: "Editor, Distance Magazine", blob: "bg-[oklch(0.88_0.18_200/0.25)]" },
            { q: "Quietly the most radical object in footwear this decade.", a: "Kojiro Tanaka", r: "Industrial Designer", blob: "bg-[oklch(0.7_0.32_340/0.25)]" },
            { q: "I stopped thinking about my feet. Which is, finally, the point.", a: "Amani Reyes", r: "Marathoner", blob: "bg-[oklch(0.95_0.22_105/0.25)]" },
          ].map((t, i) => (
            <div key={i} className={`reveal relative ${i % 2 === 0 ? "text-left" : "text-right ml-auto"}`}>
              {/* Per-quote neon blob */}
              <div className={`neon-blob ${i % 2 === 0 ? "neon-blob-alt" : ""} w-[350px] h-[350px] ${t.blob} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />

              <p className="font-mono text-xs tracking-[0.4em] text-magenta mb-8 relative z-10">— {String(i+1).padStart(2,"0")} —</p>
              <blockquote className="font-display font-extralight text-4xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl relative z-10">
                <span className="text-neon-pulse">"{t.q}"</span>
              </blockquote>
              <div className="mt-10 font-mono text-xs tracking-[0.3em] relative z-10">
                <span className="text-foreground">{t.a}</span>
                <span className="text-muted-foreground"> — {t.r}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — Final */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center grain">
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.7_0.32_340/0.4),transparent_50%)]" />
        <img src={shoeGlow} alt="" loading="lazy" className="s9-shoe absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] opacity-90 drop-shadow-[0_0_200px_rgba(255,0,200,0.8)]" />
        <div className="relative z-10 text-center px-6">
          <p className="reveal font-mono text-xs tracking-[0.4em] text-cyan mb-8">RESERVATIONS OPEN — 14.02.2026</p>
          <h2 className="reveal font-display font-extralight text-[20vw] md:text-[14vw] leading-[0.85] tracking-tight">
            <span className="block text-stroke">step</span>
            <span className="block italic text-glow-magenta">forward.</span>
          </h2>
          <a href="#" className="reveal inline-flex items-center gap-4 mt-12 px-10 py-5 border border-foreground/30 rounded-full font-mono text-xs tracking-[0.4em] hover:bg-foreground hover:text-background transition-colors">
            RESERVE A PAIR
            <span className="text-cyan">→</span>
          </a>
        </div>
        <footer className="absolute bottom-6 left-0 right-0 px-6 md:px-12 flex justify-between font-mono text-[10px] tracking-[0.3em] text-muted-foreground z-10">
          <span>© SOLE/01 — 2026</span>
          <span>END OF FILM</span>
        </footer>
      </section>
    </div>
  );
}
