import { Title, MImg } from "~/components/parts";
import { PROGRAMS } from "~/constants";
import { onMount, onCleanup } from "solid-js";

export const Program = () => {
  let viewport!: HTMLDivElement;
  let track!: HTMLDivElement;
  let setA!: HTMLDivElement;

  const items: HTMLDivElement[] = [];

  let ro: ResizeObserver | undefined;
  let rafId = 0;

  const isSP = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1023px)").matches;

  const setItemRef = (index: number) => (el: HTMLDivElement) => {
    items[index] = el;
  };

  /** 1セット幅(px)を測って、アニメの移動量にする（SPのみ） */
  const applySizes = () => {
    if (!isSP()) return;
    const w = setA.getBoundingClientRect().width;
    track.style.setProperty("--shift", `${-w}px`);
    track.style.setProperty("--duration", "5s"); // 好みで
  };

  /** 湾曲（∪）＋中央拡大（SPのみ） */
  const updateCurve = () => {
    if (!isSP()) {
      for (const el of items) {
        if (!el) continue;
        el.style.transform = "none";
      }
      return;
    }

    const rect = viewport.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    for (const el of items) {
      if (!el) continue;

      const r = el.getBoundingClientRect();
      const itemCenter = r.left + r.width / 2;

      const dist = Math.abs(centerX - itemCenter);
      const max = rect.width / 2;
      const t = Math.min(dist / max, 1);

      // 放物線（中央=1 / 端=0）
      const curve = 1 - t * t;

      // 調整ポイント
      const scale = 0.88 + curve * 0.22; // 最大1.10くらい
      const y = curve * 26; // 中央が下に沈む(∪)

      el.style.transform = `translateY(${y}px) scale(${scale})`;
    }
  };

  onMount(() => {
    applySizes();

    // 画像ロード後に再計測（ズレ防止）
    const imgs = viewport.querySelectorAll("img");
    let pending = imgs.length;

    for (const node of imgs) {
      const img = node as HTMLImageElement;

      if (img.complete) {
        pending -= 1;
        if (pending === 0) applySizes();
        continue;
      }

      img.addEventListener(
        "load",
        () => {
          pending -= 1;
          if (pending === 0) applySizes();
        },
        { once: true },
      );
    }

    ro = new ResizeObserver(() => applySizes());
    ro.observe(viewport);
    ro.observe(setA);

    const loop = () => {
      updateCurve();
      if (isSP()) {
        rafId = requestAnimationFrame(loop);
      }
    };

    loop();

    onCleanup(() => {
      ro?.disconnect();
      cancelAnimationFrame(rafId);
    });
  });

  return (
    <>
      <Title text="Program Language and etc" />

      <div ref={viewport} class="px-5 py-10 program-viewport">
        <div ref={track} class="program-track">
          {/* ===== Set A ===== */}
          <div ref={setA} class="program-set">
            {PROGRAMS.map((p, i) => (
              <div class="program-item" ref={setItemRef(i)}>
                <MImg img={p.img} webp={p.webp} alt={p.name} />
              </div>
            ))}
          </div>

          {/* ===== Set B（SPのみ使用） ===== */}
          <div class="program-set" aria-hidden="true">
            {PROGRAMS.map((p, i) => (
              <div class="program-item" ref={setItemRef(PROGRAMS.length + i)}>
                <MImg img={p.img} webp={p.webp} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ===== Viewport + フェード（SP用） ===== */
        .program-viewport {
          position: relative;
          overflow: hidden;

          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            rgba(0,0,0,0.95) 25%,
            rgba(0,0,0,0.95) 75%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            rgba(0,0,0,0.95) 25%,
            rgba(0,0,0,0.95) 75%,
            transparent
          );
        }

        /* ===== Track（無限スクロール / SP） ===== */
        .program-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee var(--duration, 5s) linear infinite;
        }

        @keyframes marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(var(--shift, -500px), 0, 0); }
        }

        .program-set {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding-right: 24px;
          width: max-content;
        }

        /* ===== Icon wrapper ===== */
        .program-item {
          flex: 0 0 auto;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;

          transform-origin: center top;
          will-change: transform;
        }

        /* 縦横比維持 */
        .program-item img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          display: block;
        }

        /* ===== PC表示：従来通り ===== */
        @media (min-width: 1024px) {
          .program-viewport {
            -webkit-mask-image: none;
            mask-image: none;
          }

          .program-track {
            animation: none !important;
            transform: none !important;
            width: 100%;
            justify-content: center;
          }

          .program-set {
            flex-wrap: wrap;
            justify-content: center;
          }

          /* Set B を消す */
          .program-set + .program-set {
            display: none;
          }

          .program-item {
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .program-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};
