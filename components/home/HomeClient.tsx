"use client";

import Image from "next/image";
import Link from "next/link";
import productos from "@/data/productos.json";
import { getDirection } from "@/lib/locale";
import { useLocale } from "@/lib/locale-client";
import { homeCopy } from "./copy";
import Statement from "./Statement";

const FAMILIES = [
  { key: "Pescado", src: "/productos/san-pedro-930x620.jpg", pos: "45% 50%" },
  { key: "Cefalópodos", src: "/productos/pulpo.webp", pos: "50% 40%" },
  { key: "Crustáceos", src: "/productos/langosta-mora.jpg", pos: "52% 50%" },
  { key: "Condrictios", src: "/productos/raya-mosaica-930x620.jpg", pos: "35% 50%" },
] as const;

const PORT_MAP = "https://www.google.com/maps?q=Port%20de%20Nouadhibou%20Mauritania";

function Arrow() {
  return (
    <svg className="of-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M1 6h8" />
      <path d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
  );
}

export default function HomeClient({ fonts }: { fonts: string }) {
  const locale = useLocale();
  const t = homeCopy[locale];
  const dir = getDirection(locale);
  const total = productos.length;
  const countBy = (cat: string) => productos.filter((p) => p.categoria === cat).length;

  return (
    <>
      {/* 1 · hero: the photo hero, the words in a solid box on the calm sky */}
      <section className={`of-home of-hero hero ${fonts}`} dir={dir} lang={locale} data-enter aria-labelledby="hero-h">
        <div className="of-hero__media hero__media">
          <Image
            src="/fondo2.webp"
            alt={t.alt.hero}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="of-hero__img"
            data-source="client"
            data-subject="fishing boat on an Atlantic beach"
          />
        </div>
        <div className="wrap of-wrap of-hero__wrap">
          <div className="of-hero__box hero-text">
            <h1 id="hero-h" className="of-h1">
              {t.heroTitle}
            </h1>
            <p className="of-hero__lead hero__lead">{t.heroLead(total)}</p>
            <div className="of-hero__actions">
              <Link href="/contacto" className="btn of-btn of-btn--primary btn--primary">
                {t.quote}
              </Link>
              <Link href="/productos" className="btn of-btn of-btn--secondary btn--secondary">
                {t.seeCatalog}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · the range: four families, each a linked card with its photograph */}
      <section className={`of-home of-section ${fonts}`} dir={dir} lang={locale} id="especies" aria-labelledby="especies-h">
        <div className="wrap of-wrap">
          <div className="of-head">
            <div>
              <h2 id="especies-h" className="of-h2">
                {t.rangeTitle(total)}
              </h2>
              <p className="of-lead">{t.rangeLead}</p>
            </div>
            <Link href="/productos" className="of-link of-link--arrow">
              {t.seeCatalog}
              <Arrow />
            </Link>
          </div>
          <ul className="of-families">
            {FAMILIES.map((f) => (
              <li key={f.key}>
                <Link href="/productos" className="of-card">
                  <span className="of-frame of-frame--family">
                    <Image
                      src={f.src}
                      alt={t.alt.families[f.key]}
                      fill
              unoptimized
                      sizes="(min-width: 1024px) 600px, 50vw"
                      style={{ objectPosition: f.pos }}
                      data-source="client"
                      data-subject={f.key}
                    />
                  </span>
                  <span className="of-card__body">
                    <span className="of-card__title">{t.families[f.key]}</span>
                    <span className="of-card__meta">{t.speciesCount(countBy(f.key))}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · origin: tall-small, the trawler tall, the Nouadhibou port small */}
      <section className={`of-home of-section ${fonts}`} dir={dir} lang={locale} id="origen" aria-labelledby="origen-h">
        <div className="wrap of-wrap of-tallsmall">
          <div className="of-frame of-tallsmall__tall">
            <Image
              src="/fondo.webp"
              alt={t.alt.trawler}
              fill
              unoptimized
              sizes="(min-width: 1200px) 1100px, 100vw"
              style={{ objectPosition: "28% 70%" }}
              data-source="client"
              data-subject="trawler with nets out"
            />
          </div>
          <div className="of-tallsmall__text">
            <div>
              <h2 id="origen-h" className="of-h2">
                {t.originTitle}
              </h2>
              <p className="of-lead">{t.originLead}</p>
              <dl className="of-points">
                {t.originPoints.map((p) => (
                  <div key={p.title}>
                    <dt>{p.title}</dt>
                    <dd>{p.text}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={PORT_MAP}
                target="_blank"
                rel="noopener noreferrer"
                className="of-link of-link--arrow"
              >
                {t.originMap}
                <Arrow />
              </a>
            </div>
          </div>
          <a
            href={PORT_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="of-frame of-tallsmall__small of-zoom"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src="/puerto.webp"
              alt={t.alt.port}
              fill
              unoptimized
              sizes="(min-width: 1200px) 520px, 40vw"
              style={{ objectPosition: "50% 60%" }}
              data-source="client"
              data-subject="Nouadhibou port"
            />
          </a>
        </div>
      </section>

      {/* 4 · about: the dealt moment, word-highlight (the kit's module), beside one photograph */}
      <Statement
        key={locale}
        className={`of-home of-section of-statement-section ${fonts}`}
        dir={dir}
        lang={locale}
        title={t.aboutTitle}
        segments={t.statement}
        photo={
          <Image
            src="/productos/calamar.webp"
            alt={t.alt.squid}
            fill
            unoptimized
            sizes="(min-width: 1200px) 486px, 100vw"
            style={{ objectPosition: "50% 45%" }}
            data-source="client"
            data-subject="whole squid"
          />
        }
      />

      {/* 5 · cold chain: the dark band, pair of photographs */}
      <section className={`of-home of-section of-dark ${fonts}`} dir={dir} lang={locale} id="frio" aria-labelledby="frio-h">
        <div className="wrap of-wrap">
          <div className="of-head of-head--split">
            <div>
              <h2 id="frio-h" className="of-h2">
                {t.coldTitle}
              </h2>
              <p className="of-lead">{t.coldLead}</p>
            </div>
            <dl className="of-facts">
              {t.coldFacts.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="of-pair">
            <div className="of-frame of-frame--pair">
              <Image
                src="/productos/gamba-roja-de-profundidad.jpg"
                alt={t.alt.prawns}
                fill
                unoptimized
                sizes="(min-width: 640px) 700px, 50vw"
                data-source="client"
                data-subject="red prawns on ice"
              />
            </div>
            <div className="of-frame of-frame--pair">
              <Image
                src="/productos/rape.webp"
                alt={t.alt.monkfish}
                fill
                unoptimized
                sizes="(min-width: 640px) 700px, 50vw"
                style={{ objectPosition: "50% 45%" }}
                data-source="client"
                data-subject="monkfish in a crate of ice"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6 · documents: the spec list, with the ONISPA mark */}
      <section className={`of-home of-section ${fonts}`} dir={dir} lang={locale} id="certificados" aria-labelledby="docs-h">
        <div className="wrap of-wrap of-docs-wrap">
          <div className="of-docs__s1">
            <div className="of-docs__intro">
              <h2 id="docs-h" className="of-h2">
                {t.docsTitle}
              </h2>
              <p className="of-lead">{t.docsLead}</p>
            </div>
            <ul className="of-docs of-docs--a">
              {t.docs.slice(0, 4).map((d) => (
                <li key={d.title}>
                  <span className="of-docs__title">{d.title}</span>
                  <span className="of-docs__text">{d.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="of-docs__s2">
            <ul className="of-docs of-docs--b">
              {t.docs.slice(4).map((d) => (
                <li key={d.title}>
                  <span className="of-docs__title">{d.title}</span>
                  <span className="of-docs__text">{d.text}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.onispa.mr"
              target="_blank"
              rel="noopener noreferrer"
              className="of-onispa"
            >
              <Image
                src="/productos/ONISPA-1-1.png"
                alt={t.alt.onispa}
                width={163}
                height={145}
                unoptimized
                data-source="client"
                data-subject="ONISPA logo"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 7 · close: close-word, the h2 and the button, then the name set across the wrap */}
      <section className={`of-home of-section of-close ${fonts}`} dir={dir} lang={locale} id="presupuesto" aria-labelledby="close-h">
        <div className="wrap of-wrap of-close__wrap">
          <div className="of-close__row">
            <div>
              <h2 id="close-h" className="of-h2">
                {t.closeTitle}
              </h2>
              <p className="of-lead">{t.closeLead}</p>
            </div>
            <Link href="/contacto" className="btn of-btn of-btn--primary btn--primary">
              {t.quote}
              <Arrow />
            </Link>
          </div>
          <p className="of-word" aria-hidden="true">
            <span>Ocean</span>
            <span>Fresh</span>
          </p>
        </div>
      </section>
    </>
  );
}
