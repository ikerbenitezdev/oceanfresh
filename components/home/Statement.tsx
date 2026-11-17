"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";

type Segment = string | { strong: string };

type MomentsModule = {
  mount: (el: Element) => Promise<unknown>;
  unmountAll: (root?: Element | Document) => void;
};

// Loaded as a plain file from /public, outside the bundler, exactly as the kit ships it.
const loadMoments = () =>
  (new Function("u", "return import(u)") as (u: string) => Promise<MomentsModule>)(
    "/assets/moments/moments.js"
  );

/*
  The about section: the dealt word-highlight moment (tasteskill assets/moments/word-highlight). The words
  rest at half ink and turn to ink as the statement crosses the middle of the screen; the <strong> words
  turn to the accent. Without script or under reduced motion the statement stands in full ink.
*/
export default function Statement({
  className,
  dir,
  lang,
  title,
  segments,
  photo,
}: {
  className: string;
  dir: "ltr" | "rtl";
  lang: string;
  title: string;
  segments: Segment[];
  photo: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let live = true;
    let mod: MomentsModule | null = null;
    (window as unknown as { __momentsManual?: boolean }).__momentsManual = true;
    loadMoments()
      .then((m) => {
        mod = m;
        if (live) return m.mount(el);
      })
      .catch(() => el.classList.add("mo-safe"));
    return () => {
      live = false;
      mod?.unmountAll(el);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={className}
      dir={dir}
      lang={lang}
      id="quienes-somos"
      data-moment="word-highlight"
      aria-labelledby="quienes-h"
    >
      <div className="wrap of-wrap of-about">
        <div className="of-about__text">
          <h2 id="quienes-h" className="of-h2">
            {title}
          </h2>
          <p className="mo-wh__text of-statement">
            {segments.map((segment, i) =>
              typeof segment === "string" ? (
                <Fragment key={i}>{segment}</Fragment>
              ) : (
                <strong key={i}>{segment.strong}</strong>
              )
            )}
          </p>
        </div>
        <div className="of-frame of-about__photo">{photo}</div>
      </div>
    </section>
  );
}
