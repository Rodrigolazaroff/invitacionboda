"use client";

import { useState } from "react";
import { Copy, Check, Wallet, Landmark } from "lucide-react";
import Reveal from "./Reveal";
import { gifts } from "@/lib/data";

const BADGES = { mp: Wallet, usd: Landmark };

function CopyRow({ field }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(field.value);
    } catch {
      // fallback para navegadores sin Clipboard API
      const ta = document.createElement("textarea");
      ta.value = field.value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className="copy-row">
      <div className="copy-info">
        <div className="copy-name">{field.name}</div>
        <div className="copy-value">{field.value}</div>
      </div>
      <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy} type="button">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}

export default function Gifts() {
  return (
    <section>
      <div className="inner">
        <Reveal>
          <h2 className="section-title">
            <img
              src="/assets/icons/regalo.webp"
              alt=""
              style={{ width: 44, height: 44, verticalAlign: "-8px", marginRight: 10 }}
            />
            Regalos
          </h2>
          <div className="divider">❦</div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="gifts-intro">{gifts.intro}</p>
        </Reveal>

        {gifts.accounts.map((acc, i) => {
          const Badge = BADGES[acc.id] || Wallet;
          return (
            <Reveal key={acc.id} delay={0.1 + i * 0.08}>
              <div className="account card">
                <div className="account-head">
                  <span className="badge">
                    <Badge size={22} strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className="account-title">{acc.label}</div>
                    <div className="account-holder">{acc.holder}</div>
                  </div>
                </div>
                {acc.fields.map((f) => (
                  <CopyRow key={f.name} field={f} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
