import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

/*
 * Air Gift Voucher case study - same visual system as PrismCaseStudy
 * Surfaces:  paper #ede9e3 (border #d8d2c8) · dark #1a1815
 * Accent:    blue-600 for "what we did", orange-700 for gaps / risks only.
 *
 * IndiGo is named (it's on the resume). Withheld on purpose: vendor names, BRD authors, internal specifics.
 * Screens stay brand-blurred because the product isn't live yet.
 * Every number on this page is counted from the OOUX workbook (OOUX AIR GV.xlsx).
 * Screens in /public/air-gv are Figma exports with brand marks blurred.
 */

const TOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'Story' },
  { id: 'problem', label: 'Problem' },
  { id: 'users', label: 'Users' },
  { id: 'role', label: 'My Role' },
  { id: 'model', label: 'OOUX Model' },
  { id: 'gaps', label: 'Gaps' },
  { id: 'journey', label: 'Journey' },
  { id: 'iterations', label: 'Iterations' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'handoff', label: 'Handoff' },
  { id: 'next', label: 'Next' },
];

const GAP = '#c2410c'; // orange-700

/* ── Data (from the OOUX workbook) ──────────────────────────────── */

type ObjKey = 'USER' | 'ORDER' | 'VOUCHER' | 'RECIPIENT' | 'WALLET' | 'PAYMENT' | 'PROMO' | 'DELIVERY';

const OBJECTS: Record<
  ObjKey,
  { label: string; x: number; y: number; structure: string; instance: string; purpose: string; flag?: string }
> = {
  USER: {
    label: 'User',
    x: 110,
    y: 200,
    structure: 'A person buying or redeeming - either a guest or logged in.',
    instance: 'Rahul · logged in · wallet ₹3,500',
    purpose: 'The primary actor. Their auth state decides how many forms they see.',
  },
  ORDER: {
    label: 'Order',
    x: 380,
    y: 200,
    structure: 'A purchase record bundling vouchers, payment, promo and recipient.',
    instance: 'ORD-8821 · 2 × ₹1,000 · promo applied · paid ₹1,900',
    purpose: 'The parent object. It ties every other purchase object together.',
  },
  VOUCHER: {
    label: 'Voucher',
    x: 640,
    y: 200,
    structure: 'A digital monetary certificate issued by the voucher partner after payment.',
    instance: '₹2,000 · Birthday theme · Active · PIN 4821',
    purpose: 'The core product. It holds value and loads into the wallet.',
  },
  PAYMENT: {
    label: 'Payment',
    x: 380,
    y: 50,
    structure: 'A transaction processed through the payment gateway.',
    instance: 'UPI · ₹1,900 · Success',
    purpose: 'Confirms the transaction before any voucher is issued.',
  },
  PROMO: {
    label: 'Promo code',
    x: 640,
    y: 50,
    structure: 'A campaign discount rule entered at checkout.',
    instance: '10% off · max cap ₹500 · valid till 31 Mar',
    purpose: 'Marketing-driven incentive, 0–1 per order.',
  },
  DELIVERY: {
    label: 'Delivery',
    x: 640,
    y: 355,
    structure: 'The email + SMS event carrying code, PIN and instructions.',
    instance: 'Email + SMS · Delivered',
    purpose: 'Makes sure the voucher reaches the right person.',
    flag: 'No retry or bounce handling defined',
  },
  RECIPIENT: {
    label: 'Recipient',
    x: 380,
    y: 355,
    structure: 'Whoever receives the voucher - the buyer themselves, or someone else.',
    instance: 'Priya · no IndiGo account',
    purpose: 'Receives the delivery and redeems the value.',
    flag: 'May have no account - redemption path undefined',
  },
  WALLET: {
    label: 'Wallet',
    x: 110,
    y: 355,
    structure: 'A stored-value balance tied to an account.',
    instance: 'Balance ₹3,500 · last topped up 10 Mar',
    purpose: 'Where voucher value lands, to be spent on flights.',
    flag: 'Unclear if a recipient needs an account to have one',
  },
};

// ctrl = quadratic control point for edges that must route around nodes
const RELATIONS: { from: ObjKey; to: ObjKey; card: string; flag?: boolean; ctrl?: [number, number] }[] = [
  { from: 'USER', to: 'ORDER', card: '0–many' },
  { from: 'USER', to: 'WALLET', card: '0–1', flag: true },
  { from: 'USER', to: 'RECIPIENT', card: '0–1' },
  { from: 'ORDER', to: 'PAYMENT', card: '1' },
  { from: 'ORDER', to: 'VOUCHER', card: '1–many' },
  { from: 'ORDER', to: 'PROMO', card: '0–1' },
  { from: 'ORDER', to: 'RECIPIENT', card: '1' },
  { from: 'VOUCHER', to: 'DELIVERY', card: '1', flag: true },
  { from: 'VOUCHER', to: 'WALLET', card: '0–1 ⇄ 0–many', ctrl: [375, 560] },
  { from: 'RECIPIENT', to: 'WALLET', card: '0–1', flag: true },
  { from: 'RECIPIENT', to: 'DELIVERY', card: '1–many' },
];

// 45 attributes, grouped by who owns the data
const OWNERS = [
  { key: 'user', label: 'User enters', color: '#1a1815' },
  { key: 'platform', label: 'Our platform', color: 'rgba(26,24,21,0.28)' },
  { key: 'vendor', label: 'Voucher partner', color: '#2563eb' },
  { key: 'gateway', label: 'Payment gateway', color: '#60a5fa' },
  { key: 'cms', label: 'Marketing CMS', color: '#bfdbfe' },
] as const;

const ATTRIBUTES: { obj: string; user: number; platform: number; vendor: number; gateway: number; cms: number }[] = [
  { obj: 'Voucher', user: 3, platform: 0, vendor: 7, gateway: 0, cms: 0 },
  { obj: 'Order', user: 1, platform: 6, vendor: 0, gateway: 0, cms: 0 },
  { obj: 'Promo code', user: 1, platform: 1, vendor: 0, gateway: 0, cms: 4 },
  { obj: 'User', user: 4, platform: 1, vendor: 0, gateway: 0, cms: 0 },
  { obj: 'Payment', user: 1, platform: 1, vendor: 0, gateway: 3, cms: 0 },
  { obj: 'Recipient', user: 3, platform: 1, vendor: 0, gateway: 0, cms: 0 },
  { obj: 'Wallet', user: 0, platform: 4, vendor: 0, gateway: 0, cms: 0 },
  { obj: 'Delivery', user: 0, platform: 4, vendor: 0, gateway: 0, cms: 0 },
];

const CTA_COVERAGE = [
  { persona: 'Purchaser', brd: 15, gap: 4 },
  { persona: 'System', brd: 6, gap: 3 },
  { persona: 'Recipient', brd: 6, gap: 2 },
];

// Verify with the user before publishing: which team each gap actually went to
type GapStatus = 'handoff' | 'flagged';
const GAPS: { cta: string; persona: string; priority: 'P1' | 'P2'; status: GapStatus; note: string }[] = [
  { cta: 'Create account to redeem', persona: 'Recipient', priority: 'P1', status: 'handoff', note: 'Critical - gift recipients with no account had no way in' },
  { cta: 'Recover lost PIN / code', persona: 'Recipient', priority: 'P1', status: 'handoff', note: 'Lost email meant lost money' },
  { cta: 'Retry failed delivery', persona: 'System', priority: 'P1', status: 'flagged', note: 'No retry or fallback defined for bounces' },
  { cta: 'Auto-expire voucher', persona: 'System', priority: 'P1', status: 'flagged', note: 'Expiry existed as a date, not as a rule' },
  { cta: 'Resend voucher', persona: 'Purchaser', priority: 'P1', status: 'flagged', note: 'Buyer had no recourse if the gift never arrived' },
  { cta: 'Preview recipient email', persona: 'Purchaser', priority: 'P1', status: 'flagged', note: 'Gifters want to see it before they pay' },
  { cta: 'Cancel voucher', persona: 'System', priority: 'P2', status: 'flagged', note: 'Status existed - nobody owned the trigger' },
  { cta: 'Schedule delivery date', persona: 'Purchaser', priority: 'P2', status: 'flagged', note: 'Send it on the birthday, not today' },
  { cta: 'Track redemption status', persona: 'Purchaser', priority: 'P2', status: 'flagged', note: 'Did they actually use my gift?' },
];

const FORM_STATES = [
  { id: 'guest-self', auth: 'Guest', mode: 'Buy for self', forms: 1, img: '/air-gv/contact-guest-self.webp', why: 'One contact form - the buyer is also the recipient.' },
  { id: 'guest-gift', auth: 'Guest', mode: 'Send as gift', forms: 2, img: '/air-gv/contact-guest-gift.webp', why: 'Receiver + sender, collapsible so only one is open at a time.' },
  { id: 'member-self', auth: 'Logged in', mode: 'Buy for self', forms: 0, img: '/air-gv/contact-member-self.webp', why: 'Nothing to fill - profile data prefilled and locked.' },
  { id: 'member-gift', auth: 'Logged in', mode: 'Send as gift', forms: 1, img: '/air-gv/contact-member-gift.webp', why: 'Only the receiver - the sender is already known.' },
] as const;

const ORDER_STATES = [
  { id: 'ok', label: 'Confirmed', status: 'Success', img: '/air-gv/order-ok.webp', note: 'Transaction ID with copy action, delivery promise via email + SMS.' },
  { id: 'pend', label: 'Pending', status: 'Pending', img: '/air-gv/order-pend.webp', note: 'Money has left the account but nothing is issued yet - say so, and say what happens next.' },
  { id: 'fail', label: 'Failed', status: 'Failed', img: '/air-gv/order-fail.webp', note: 'Refund timeline stated up front, plus one clear Retry Payment action.' },
] as const;

/* ── Shared building blocks (mirrors PrismCaseStudy) ────────────── */

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-[11px] uppercase tracking-widest text-black/55 whitespace-nowrap">
      {children} <span className="text-blue-600 font-bold ml-1">///</span>
    </span>
    <div className="h-px flex-1 bg-black/10" />
  </div>
);

const SectionTitle = ({ children, className = 'mb-4' }: { children: ReactNode; className?: string }) => (
  <h2
    className={`text-[34px] sm:text-[48px] tracking-tight text-black ${className}`}
    style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.08, textWrap: 'balance' }}
  >
    {children}
  </h2>
);

const Lead = ({ children, className = 'mb-10' }: { children: ReactNode; className?: string }) => (
  <p className={`text-[17px] leading-relaxed text-black/60 max-w-2xl ${className}`}>{children}</p>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] text-black/40 text-center mt-3 uppercase tracking-widest">{children}</p>
);

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl ${className}`}>{children}</div>
);

const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const Screen = ({ src, alt }: { src: string; alt: string }) => (
  <div className="rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)]">
    <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
  </div>
);

/* ── Glossary tooltips for jargon ───────────────────────────────── */

const GLOSSARY: Record<string, { name: string; def: string; href?: string; linkLabel?: string }> = {
  OOUX: {
    name: 'Object-Oriented UX',
    def: 'Designing from the “things” in a system - like Voucher, Order and Wallet - before designing any screens. Define the objects first; the screens follow from them.',
    href: 'https://www.ooux.com/',
    linkLabel: 'What is OOUX',
  },
  ORCA: {
    name: 'Objects · Relationships · CTAs · Attributes',
    def: 'The OOUX process in four rounds: find the objects, map how they connect, list what people can do to them, and what information each one holds.',
    href: 'https://www.ooux.com/resources',
    linkLabel: 'ORCA resources',
  },
  BRD: {
    name: 'Business Requirements Document',
    def: 'The product manager’s spec - what the feature has to do, for whom, and why the business wants it.',
  },
  CTA: {
    name: 'Call to action',
    def: 'Any action a person - or the system - can take on an object: “Apply promo”, “Retry payment”, “Resend voucher”.',
  },
  JTBD: {
    name: 'Jobs to be done',
    def: 'What someone is really trying to get done, written as “I want to… so that…”. It keeps design tied to outcomes, not features.',
  },
  Objects: {
    name: 'The O in ORCA',
    def: 'The nouns of the system - things users recognise and act on, like Voucher, Order or Wallet.',
  },
  Relationships: {
    name: 'The R in ORCA',
    def: 'How objects connect, and how many of each: an Order has exactly 1 Payment and 1–many Vouchers.',
  },
  CTAs: {
    name: 'The C in ORCA',
    def: 'Everything a person or the system can do to an object - listed per persona, so nothing is forgotten.',
  },
  Attributes: {
    name: 'The A in ORCA',
    def: 'The information an object holds - a Voucher’s value, PIN, theme and expiry date.',
  },
  cardinality: {
    name: 'Cardinality',
    def: 'How many of one object can connect to another - none or one (0–1), exactly one (1), or one or more (1–many).',
  },
};

const Term = ({ k, children, tone = 'light' }: { k: keyof typeof GLOSSARY; children?: ReactNode; tone?: 'light' | 'dark' }) => {
  const entry = GLOSSARY[k];
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean }>({ left: 0, top: 0, above: true });
  const ref = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();
  const id = `term-${String(k).toLowerCase()}`;

  const place = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const w = Math.min(300, window.innerWidth - 32);
    const left = Math.max(16, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 16));
    const above = r.top > 220;
    setPos({ left, top: above ? r.top - 10 : r.bottom + 10, above });
  };
  const show = () => {
    window.clearTimeout(closeTimer.current);
    place();
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onScroll = () => setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={() => (open ? setOpen(false) : show())}
        className={`inline underline decoration-dotted decoration-[1.5px] underline-offset-[5px] cursor-help transition-colors ${
          tone === 'dark' ? 'decoration-white/50 hover:text-white' : 'decoration-blue-600/60 hover:text-blue-700'
        }`}
        style={{ font: 'inherit', color: 'inherit', background: 'none', padding: 0, border: 0 }}
      >
        {children ?? k}
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          onMouseEnter={show}
          onMouseLeave={hide}
          className="fixed z-50 block w-[300px] max-w-[calc(100vw-32px)] rounded-xl bg-[#1a1815] text-left p-4 shadow-2xl border border-white/10"
          style={{ left: pos.left, top: pos.top, transform: pos.above ? 'translateY(-100%)' : undefined }}
        >
          <span className="block font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-1.5">{String(k)}</span>
          <span className="block text-[14px] font-semibold text-white mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
            {entry.name}
          </span>
          <span className="block text-[13px] leading-relaxed text-white/70 font-normal normal-case tracking-normal">{entry.def}</span>
          {entry.href && (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-[12px] font-medium text-blue-300 hover:text-blue-200"
            >
              {entry.linkLabel} <span aria-hidden="true">↗</span>
            </a>
          )}
        </span>
      )}
    </>
  );
};

/* ── Object map (interactive SVG) ───────────────────────────────── */

const NODE_W = 132;
const NODE_H = 44;

const ObjectMap = () => {
  const [active, setActive] = useState<ObjKey>('ORDER');
  const obj = OBJECTS[active];
  const linked = new Set<ObjKey>(
    RELATIONS.filter((r) => r.from === active || r.to === active).flatMap((r) => [r.from, r.to])
  );

  const edgePath = (r: (typeof RELATIONS)[number]) => {
    const a = OBJECTS[r.from];
    const b = OBJECTS[r.to];
    if (!r.ctrl) return { d: `M${a.x},${a.y} L${b.x},${b.y}`, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
    const [cx, cy] = r.ctrl;
    // label sits on the curve's midpoint (t = 0.5)
    return {
      d: `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`,
      mx: 0.25 * a.x + 0.5 * cx + 0.25 * b.x,
      my: 0.25 * a.y + 0.5 * cy + 0.25 * b.y,
    };
  };

  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] gap-5">
      <Card className="p-3 sm:p-5">
        <div className="overflow-x-auto -mx-1 px-1">
        <svg viewBox="0 0 750 445" className="w-full min-w-[600px] h-auto" role="img" aria-label="Object relationship map for the gift voucher system">
          {RELATIONS.map((r, i) => {
            const { d, mx, my } = edgePath(r);
            const on = r.from === active || r.to === active;
            const stroke = r.flag ? GAP : on ? '#2563eb' : 'rgba(0,0,0,0.22)';
            return (
              <g key={i} style={{ opacity: on ? 1 : 0.45, transition: 'opacity 200ms' }}>
                <path d={d} fill="none" stroke={stroke} strokeWidth={on ? 2 : 1.4} strokeDasharray={r.flag ? '5 4' : undefined} />
                <rect x={mx - (r.card.length * 3.6 + 10)} y={my - 10} width={r.card.length * 7.2 + 20} height={20} rx={10} fill="#f7f4ef" stroke={stroke} strokeWidth={1} />
                <text x={mx} y={my + 4} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={r.flag ? GAP : 'rgba(0,0,0,0.7)'}>
                  {r.card}
                </text>
              </g>
            );
          })}
          {(Object.keys(OBJECTS) as ObjKey[]).map((k) => {
            const o = OBJECTS[k];
            const isActive = k === active;
            const isLinked = linked.has(k);
            return (
              <g
                key={k}
                onClick={() => setActive(k)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(k)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${o.label} object`}
                className="cursor-pointer outline-none"
                style={{ opacity: isActive || isLinked ? 1 : 0.55, transition: 'opacity 200ms' }}
              >
                <rect
                  x={o.x - NODE_W / 2}
                  y={o.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  fill={isActive ? '#1a1815' : '#fff'}
                  stroke={o.flag ? GAP : isActive ? '#1a1815' : 'rgba(0,0,0,0.15)'}
                  strokeWidth={o.flag ? 1.6 : 1}
                />
                <text x={o.x} y={o.y + 5} textAnchor="middle" fontSize="15" fontWeight={600} fill={isActive ? '#fff' : '#1a1815'} style={{ fontFamily: 'var(--font-heading)' }}>
                  {o.label}
                </text>
                {o.flag && <circle cx={o.x + NODE_W / 2 - 10} cy={o.y - NODE_H / 2 + 10} r={4} fill={GAP} />}
              </g>
            );
          })}
        </svg>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 px-2 pt-3 font-mono text-[10px] uppercase tracking-wider text-black/45">
          <span className="inline-flex items-center gap-2"><span className="w-5 h-[2px] bg-blue-600" />Selected object's relationships</span>
          <span className="inline-flex items-center gap-2"><span className="w-5 border-t-2 border-dashed" style={{ borderColor: GAP }} />Undefined in the BRD</span>
          <span className="inline-flex items-center gap-2">Tap any object<span className="sm:hidden">· swipe for more</span></span>
        </div>
      </Card>

      <Card className="p-6 mt-4 lg:mt-0 flex flex-col">
        <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-2">Object · SIP</div>
        <h3 className="text-[26px] font-semibold text-black mb-5" style={{ fontFamily: 'var(--font-heading)' }}>{obj.label}</h3>
        {[
          ['Structure', obj.structure],
          ['Instance', obj.instance],
          ['Purpose', obj.purpose],
        ].map(([k, v]) => (
          <div key={k} className="mb-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-1">{k}</div>
            <p className="text-[14px] leading-relaxed text-black/70">{v}</p>
          </div>
        ))}
        {obj.flag && (
          <div className="mt-auto rounded-xl px-4 py-3 text-[13px] leading-snug" style={{ background: 'rgba(194,65,12,0.08)', color: GAP }}>
            <span className="font-mono text-[10px] uppercase tracking-widest block mb-1">Flag</span>
            {obj.flag}
          </div>
        )}
      </Card>
    </div>
  );
};

/* ── Charts ─────────────────────────────────────────────────────── */

const AttributeOwnership = () => {
  const max = Math.max(...ATTRIBUTES.map((a) => a.user + a.platform + a.vendor + a.gateway + a.cms));
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">45 attributes · by data owner</div>
          <h3 className="text-[20px] font-semibold text-black" style={{ fontFamily: 'var(--font-heading)' }}>Who owns each field on screen?</h3>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {OWNERS.map((o) => (
            <span key={o.key} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-black/55">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: o.color }} />
              {o.label}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        {ATTRIBUTES.map((a, i) => {
          const total = a.user + a.platform + a.vendor + a.gateway + a.cms;
          return (
            <div key={a.obj} className="grid grid-cols-[88px_1fr_24px] sm:grid-cols-[110px_1fr_28px] items-center gap-3">
              <div className="text-[13px] text-black/70 truncate">{a.obj}</div>
              <div className="h-6 rounded-md bg-black/[0.04] overflow-hidden">
                <motion.div
                  className="h-full flex"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(total / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
                >
                  {OWNERS.map((o) =>
                    a[o.key] ? (
                      <div
                        key={o.key}
                        title={`${o.label}: ${a[o.key]}`}
                        style={{ width: `${(a[o.key] / total) * 100}%`, background: o.color }}
                        className="h-full border-r border-[#ede9e3] last:border-r-0"
                      />
                    ) : null
                  )}
                </motion.div>
              </div>
              <div className="font-mono text-[12px] text-black/50 tabular-nums text-right">{total}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-5 border-t border-black/10 grid sm:grid-cols-[auto_1fr] gap-4 items-center">
        <div className="text-[44px] font-bold leading-none tracking-tight text-blue-700 tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
          31%
        </div>
        <p className="text-[14px] leading-relaxed text-black/65">
          14 of 45 fields come from <span className="font-semibold text-black/85">three external parties</span> we
          didn't control - so every screen state had to plan for their data being late, missing or wrong.
        </p>
      </div>
    </Card>
  );
};

const CtaCoverage = () => {
  const total = CTA_COVERAGE.reduce((s, c) => s + c.brd + c.gap, 0);
  const gaps = CTA_COVERAGE.reduce((s, c) => s + c.gap, 0);
  const r = 52;
  const circ = 2 * Math.PI * r;
  return (
    <Card className="p-6 sm:p-8">
      <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">{total} CTAs · 3 personas</div>
      <h3 className="text-[20px] font-semibold text-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Which actions did the BRD actually cover?
      </h3>
      <div className="grid sm:grid-cols-[150px_1fr] gap-8 items-center">
        <div className="relative w-[150px] h-[150px] mx-auto">
          <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="75" cy="75" r={r} fill="none" stroke="rgba(26,24,21,0.75)" strokeWidth="18" />
            <motion.circle
              cx="75"
              cy="75"
              r={r}
              fill="none"
              stroke={GAP}
              strokeWidth="18"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              whileInView={{ strokeDashoffset: circ - (gaps / total) * circ }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[34px] font-bold leading-none tabular-nums" style={{ fontFamily: 'var(--font-heading)', color: GAP }}>{gaps}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-black/45 mt-1">missing</div>
          </div>
        </div>
        <div className="space-y-4">
          {CTA_COVERAGE.map((c) => {
            const t = c.brd + c.gap;
            return (
              <div key={c.persona}>
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span className="text-black/75 font-medium">{c.persona}</span>
                  <span className="font-mono text-[11px] text-black/45 tabular-nums">
                    {c.brd} in BRD · <span style={{ color: GAP }}>{c.gap} gaps</span>
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex bg-black/[0.04]" style={{ width: `${(t / 19) * 100}%` }}>
                  <div className="h-full" style={{ width: `${(c.brd / t) * 100}%`, background: 'rgba(26,24,21,0.75)' }} />
                  <div className="h-full" style={{ width: `${(c.gap / t) * 100}%`, background: GAP }} />
                </div>
              </div>
            );
          })}
          <p className="text-[13px] leading-relaxed text-black/55 pt-1">
            1 in 4 actions a real person would need had no home in the requirements. Most of them sat{' '}
            <span className="font-semibold text-black/75">after</span> the payment - exactly where the BRD stopped.
          </p>
        </div>
      </div>
    </Card>
  );
};

/* ── Journey (built from the FigJam user flow) ──────────────────── */

type Pin = { x: number; y: number; title: string; body: string };

// Stages follow the FigJam user-flow board, in order. `nodes` are the board's own node labels.
const JOURNEY = [
  { id: 'j-land', n: '01', short: 'Land', title: 'Land on the gift page', meta: '4 entry points', nodes: ['Homepage banner', 'Navigation menu', 'Campaign', 'Marketplace'] },
  { id: 'j-configure', n: '02', short: 'Configure', title: 'Configure the voucher', meta: '5 choices', nodes: ['Theme', 'Denomination', 'Delivery option', 'Quantity', 'Message'] },
  { id: 'j-who', n: '03', short: 'Who for?', title: 'Tell us who it’s for', meta: '0–2 forms', nodes: ['Buy for self', 'Send as gift', 'Logged in?'], decision: true },
  { id: 'j-offers', n: '04', short: 'Offers', title: 'Apply an offer', meta: 'optional', nodes: ['Promo code / offers'] },
  { id: 'j-review', n: '05', short: 'Review', title: 'Review and continue', meta: '1 total', nodes: ['Order summary', 'Buy now'] },
  { id: 'j-pay', n: '06', short: 'Pay', title: 'Pay', meta: '4 methods', nodes: ['UPI', 'Cards', 'Net banking', 'Wallets'] },
  { id: 'j-outcome', n: '07', short: 'Outcome', title: 'Know what happened', meta: '3 outcomes', nodes: ['Payment status?', 'Issuance status?'], decision: true },
  { id: 'j-deliver', n: '08', short: 'Deliver', title: 'Voucher delivered', meta: 'email + SMS', nodes: ['Voucher generated', 'Email', 'SMS'], system: true },
  { id: 'j-find', n: '09', short: 'Find', title: 'Find it again later', meta: 'guest lookup', nodes: ['Order history', 'Find by order ID'] },
] as const;

const PINS: Record<string, Pin[]> = {
  land: [
    { x: 79, y: 31, title: 'Lead with the why', body: '“Gift a journey” sells the trip, not a card balance.' },
    { x: 11, y: 42, title: 'Live preview first', body: 'The card is the hero. It re-skins with every theme and message.' },
    { x: 6, y: 72, title: 'Emotion before money', body: 'Occasion themes sit above the price choices.' },
    { x: 94, y: 48, title: 'Price, upfront', body: 'Face value, discount and loyalty points are visible before any commitment.' },
  ],
  configure: [
    { x: 2, y: 33, title: 'Presets for speed', body: 'Four common values cover most gifts in one tap.' },
    { x: 97, y: 26, title: 'Custom on demand', body: 'The amount field only appears when “Custom” is chosen.' },
    { x: 2, y: 52, title: 'Limits shown, not punished', body: 'The ₹100–₹10,000 range sits under the field before any error can happen.' },
    { x: 2, y: 64, title: 'One switch, whole flow', body: 'Self or gift decides which forms come next (stage 03).' },
    { x: 2, y: 75, title: 'Quantity = vouchers', body: 'Order has 1–many vouchers, so a stepper, with a minimum of 1.' },
    { x: 2, y: 89, title: 'Message is opt-in', body: 'A checkbox, not an empty required-looking field.' },
  ],
  offers: [
    { x: 2, y: 31, title: 'Type a code', body: 'For people who arrive with a code from a campaign.' },
    { x: 98, y: 36, title: 'Or just tap Apply', body: 'Eligible offers are listed, so nobody has to go hunting.' },
    { x: 2, y: 61, title: 'Terms one tap away', body: 'The cap and conditions are behind “View details”, not hidden.' },
  ],
  review: [
    { x: 21, y: 40, title: 'Running total', body: 'The payable amount follows you down the page.' },
    { x: 98, y: 50, title: 'Next waits for valid input', body: 'Disabled until every required field is complete, with a message saying what’s missing.' },
  ],
  pay: [
    { x: 3, y: 7, title: 'Recommended method open', body: 'UPI is expanded by default: QR for another phone, ID for this one.' },
    { x: 41, y: 19, title: 'Steps for the unsure', body: 'A 3-step “how it works” for first-time UPI collect users.' },
    { x: 81, y: 27, title: 'What you’re paying for', body: 'Card preview, theme, quantity and recipient stay in view while paying.' },
    { x: 97, y: 58, title: 'No surprise totals', body: 'Gift value, discount and total broken down line by line.' },
    { x: 79, y: 95, title: 'One action', body: 'A single Pay button, with the payable amount right beside it.' },
  ],
  find: [
    { x: 37, y: 50, title: 'No account needed', body: 'Guests find an order with its ID plus a last name or email.' },
    { x: 56, y: 92, title: 'An empty state that helps', body: 'Nothing found? Log in to see every voucher you’ve bought.' },
  ],
};

const BrowserFrame = ({ children, url = 'airline.example/gift-vouchers' }: { children: ReactNode; url?: string }) => (
  <div className="rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)]">
    <div className="flex items-center gap-2 px-3 py-2 bg-[#f4f4f5] border-b border-black/5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
      </span>
      <span className="flex-1 mx-2 sm:mx-8 truncate text-center font-mono text-[10px] text-black/40 bg-white rounded-md py-1 px-2">{url}</span>
    </div>
    {children}
  </div>
);

/* A screen with numbered callouts; notes sit beside it on desktop, below on mobile */
const AnnotatedScreen = ({
  src,
  alt,
  pins,
  frame = true,
  maxW,
}: {
  src: string;
  alt: string;
  pins: Pin[];
  frame?: boolean;
  maxW?: string;
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const img = (
    <div className="relative">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      {pins.map((p, i) => (
        <span
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-[12px] font-bold text-white ring-4 transition-transform duration-200 ${
            hover === i ? 'bg-black ring-black/15 scale-110' : 'bg-blue-600 ring-blue-600/20'
          }`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-hidden="true"
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8 items-start">
      <div className="mx-auto w-full" style={maxW ? { maxWidth: maxW } : undefined}>
        {frame ? <BrowserFrame>{img}</BrowserFrame> : <div className="rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)]">{img}</div>}
      </div>
      <ol className="space-y-2.5">
        {pins.map((p, i) => (
          <li
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`flex gap-3 rounded-xl p-3 transition-colors ${hover === i ? 'bg-white' : 'bg-white/50'}`}
          >
            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${hover === i ? 'bg-black' : 'bg-blue-600'}`}>
              {i + 1}
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-black/85 leading-snug">{p.title}</span>
              <span className="block text-[13px] text-black/55 leading-snug mt-0.5">{p.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const FlowMap = ({ onJump }: { onJump: (id: string) => void }) => (
  <div className="bg-[#1a1815] rounded-2xl p-5 sm:p-8 relative overflow-hidden">
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <div className="relative">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400">The purchase flow · from our user-flow board</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">Tap a stage to jump</div>
      </div>
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <ol className="flex items-start min-w-[860px]">
          {JOURNEY.map((s, i) => (
            <li key={s.id} className="flex-1 flex items-start">
              <button onClick={() => onJump(s.id)} className="group flex flex-col items-center text-center w-full cursor-pointer">
                <span
                  className={`w-11 h-11 flex items-center justify-center font-mono text-[13px] font-bold transition-colors ${
                    'decision' in s
                      ? 'rotate-45 rounded-md bg-transparent border-2 border-amber-300/80 text-amber-200 group-hover:bg-amber-300/15'
                      : 'system' in s
                        ? 'rounded-full border-2 border-dashed border-white/35 text-white/60 group-hover:border-white/70'
                        : 'rounded-full bg-blue-600 text-white group-hover:bg-blue-500'
                  }`}
                >
                  <span className={'decision' in s ? '-rotate-45' : ''}>{s.n}</span>
                </span>
                <span className="mt-3 text-[13px] font-semibold text-white/90 group-hover:text-white">{s.short}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1">{s.meta}</span>
              </button>
              {i < JOURNEY.length - 1 && <span className="shrink-0 w-4 sm:w-6 border-t border-dashed border-white/25 mt-[22px]" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600" />Screen designed</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rotate-45 rounded-[2px] border-2 border-amber-300/80" />Decision point</span>
        <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-dashed border-white/40" />System step · no UI</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          ['9', 'stages'],
          ['3', 'decision points'],
          ['4', 'user states, 1 page'],
          ['3', 'payment outcomes'],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="text-[28px] font-bold text-white tabular-nums leading-none" style={{ fontFamily: 'var(--font-heading)' }}>{v}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/45 mt-1.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StageHeader = ({ stage, children }: { stage: (typeof JOURNEY)[number]; children?: ReactNode }) => (
  <div className="grid sm:grid-cols-[88px_1fr] gap-2 sm:gap-6 mb-6">
    <div className="text-[56px] sm:text-[72px] font-bold leading-none text-black/10 tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
      {stage.n}
    </div>
    <div className="sm:pt-2">
      <h3 className="text-[24px] sm:text-[30px] font-semibold text-black leading-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{stage.title}</h3>
      {children && <p className="text-[15px] text-black/60 leading-relaxed max-w-2xl mb-3">{children}</p>}
      <div className="flex flex-wrap gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-black/35 mr-1 self-center">Flow nodes</span>
        {stage.nodes.map((n) => (
          <span key={n} className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 border border-black/10 text-black/55">{n}</span>
        ))}
      </div>
    </div>
  </div>
);

const Stage = ({ id, tone = 'paper', children }: { id: string; tone?: 'paper' | 'blue'; children: ReactNode }) => (
  <div id={id} className={`scroll-mt-28 rounded-2xl p-4 sm:p-8 lg:p-10 ${tone === 'blue' ? 'bg-[#dfe7f1]' : 'bg-[#ede9e3] border border-[#d8d2c8]'}`}>
    {children}
  </div>
);

/* ── Iterations: what changed, and why ─────────────────────────── */

const Iteration = ({
  n,
  kind,
  title,
  wrong,
  replaced,
  tradeoff,
  before,
  after,
}: {
  n: string;
  kind: string;
  title: string;
  wrong: ReactNode;
  replaced: ReactNode;
  tradeoff: ReactNode;
  before: ReactNode;
  after: ReactNode;
}) => (
  <Card className="p-5 sm:p-8">
    <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-2">
      Iteration {n} · {kind}
    </div>
    <h3 className="text-[24px] sm:text-[30px] font-semibold text-black leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
      {title}
    </h3>
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="rounded-xl bg-white/50 border border-black/10 p-4 sm:p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: GAP }}>What went wrong</div>
        <div className="mb-4">{before}</div>
        <div className="text-[14px] leading-relaxed text-black/70">{wrong}</div>
      </div>
      <div className="rounded-xl bg-white/80 border border-blue-600/40 p-4 sm:p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-3">What replaced it</div>
        <div className="mb-4">{after}</div>
        <div className="text-[14px] leading-relaxed text-black/70">{replaced}</div>
      </div>
    </div>
    <div className="bg-black/5 rounded-lg px-4 py-3 text-[14px] leading-relaxed text-black/70">
      <span className="font-mono text-[10px] uppercase tracking-widest text-black/50 mr-2">Trade-off</span>
      {tradeoff}
    </div>
  </Card>
);

/* Image with numbered pins and a compact legend - for use inside narrow columns */
const SHEET_PINS = [
  { x: 55, y: 40, t: 'Amount, price and quantity dimmed behind the overlay' },
  { x: 24, y: 73, t: 'The theme they picked is no longer readable' },
  { x: 66, y: 93, t: 'No amount or total anywhere in the sheet' },
];

const PinnedShot = ({ src, alt, pins }: { src: string; alt: string; pins: { x: number; y: number; t: string }[] }) => (
  <div>
    <div className="relative rounded-lg overflow-hidden border border-black/10 bg-white">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      {pins.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, background: GAP, boxShadow: '0 0 0 4px rgba(194,65,12,0.2)' }}
        >
          {i + 1}
        </span>
      ))}
    </div>
    <ol className="mt-3 space-y-1.5">
      {pins.map((p, i) => (
        <li key={i} className="flex gap-2 text-[13px] text-black/65 leading-snug">
          <span className="shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: GAP }}>
            {i + 1}
          </span>
          {p.t}
        </li>
      ))}
    </ol>
  </div>
);

/* Order → Voucher → Recipient, drawn both ways */
const RecipientDiagram = ({ mode }: { mode: 'many' | 'one' }) => {
  const vx = [70, 170, 270];
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label={mode === 'many' ? 'Each of three vouchers goes to a different recipient' : 'All three vouchers in an order go to one recipient'}>
      <rect x="120" y="8" width="100" height="34" rx="10" fill="#1a1815" />
      <text x="170" y="30" textAnchor="middle" fontSize="13" fill="#fff" fontWeight={600} style={{ fontFamily: 'var(--font-heading)' }}>Order · qty 3</text>
      {vx.map((x) => (
        <g key={x}>
          <path d={`M170,42 L${x},78`} stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" fill="none" />
          <rect x={x - 42} y="78" width="84" height="30" rx="8" fill="#fff" stroke="rgba(0,0,0,0.15)" />
          <text x={x} y="97" textAnchor="middle" fontSize="12" fill="#1a1815">Voucher</text>
        </g>
      ))}
      {mode === 'many'
        ? vx.map((x, i) => (
            <g key={x}>
              <path d={`M${x},108 L${x},150`} stroke={GAP} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
              <rect x={x - 42} y="150" width="84" height="30" rx="8" fill="rgba(194,65,12,0.06)" stroke={GAP} strokeDasharray="4 3" />
              <text x={x} y="169" textAnchor="middle" fontSize="12" fill={GAP}>Recipient {i + 1}</text>
            </g>
          ))
        : (
          <g>
            {vx.map((x) => (
              <path key={x} d={`M${x},108 L170,150`} stroke="#2563eb" strokeWidth="1.5" fill="none" />
            ))}
            <rect x="110" y="150" width="120" height="30" rx="8" fill="rgba(37,99,235,0.08)" stroke="#2563eb" />
            <text x="170" y="169" textAnchor="middle" fontSize="12" fill="#1d4ed8" fontWeight={600}>1 Recipient</text>
          </g>
        )}
    </svg>
  );
};

/* ── Benchmark: 4 live airline gift-card flows (checked Sep 2026) ── */
// Sources: giftcards.airindia.com (+ FAQ), giftcards.aa.com purchase form, lh-giftvoucher.vp-lhg.com/buy,
// airasia.com airasia Gifts T&Cs. 'u' = not stated in the flow or terms we checked.

type Mark = 'y' | 'p' | 'n' | 'u';
const BENCH_COLS = ['Our design', 'Air India', 'American Airlines', 'Lufthansa', 'AirAsia'];
const BENCH: { feature: string; cells: [Mark, string?][] }[] = [
  { feature: 'Buy as a guest', cells: [['y'], ['y'], ['y'], ['y'], ['n', 'Account required']] },
  { feature: 'Occasion themes', cells: [['y', '4+'], ['y', '8'], ['y', '18'], ['n', 'Amount only'], ['u']] },
  { feature: 'Presets + custom amount', cells: [['y', '₹100–10,000'], ['p', '8 presets'], ['p', 'Custom only'], ['p', 'Custom only'], ['p', 'Fixed values']] },
  { feature: 'Live card preview', cells: [['y'], ['p', 'Preview button'], ['p', 'Static image'], ['n'], ['u']] },
  { feature: 'Personal message', cells: [['y', 'Optional'], ['y', '125 chars'], ['y', 'Required'], ['n'], ['u']] },
  { feature: 'Buy for self or send as gift', cells: [['y'], ['y'], ['p', 'Send to self, forward'], ['p', 'PDF to buyer'], ['p', 'Share a link']] },
  { feature: 'Schedule delivery', cells: [['n', 'Gap · P2'], ['y', 'Up to 60 days'], ['n', 'Instant'], ['n'], ['u']] },
  { feature: 'Different recipient per voucher', cells: [['n', 'Iteration 02'], ['n', 'One receiver'], ['y', '“Create another”'], ['n'], ['u']] },
  { feature: 'Redeem without an account', cells: [['p', 'Wallet · handed off'], ['y', 'Code + PIN'], ['y', 'Code at checkout'], ['y', 'Code at checkout'], ['n', 'Member only']] },
  { feature: 'Self-serve resend', cells: [['n', 'Gap · P1'], ['n', 'Via support'], ['y', 'Resend page'], ['p', 'PDF download'], ['u']] },
];

const MarkIcon = ({ m }: { m: Mark }) => {
  const map = {
    y: { t: '✓', c: 'bg-blue-600 text-white', l: 'Yes' },
    p: { t: '◐', c: 'bg-blue-100 text-blue-800', l: 'Partly' },
    n: { t: '✕', c: 'bg-black/[0.07] text-black/45', l: 'No' },
    u: { t: '–', c: 'bg-transparent text-black/30 border border-dashed border-black/20', l: 'Not stated' },
  }[m];
  return (
    <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-[12px] font-bold ${map.c}`} title={map.l} aria-label={map.l}>
      {map.t}
    </span>
  );
};

const Benchmark = () => (
  <section id="benchmark" className="mb-24 scroll-mt-32">
    <SectionLabel>Benchmark</SectionLabel>
    <SectionTitle>How it stacks up against four airlines</SectionTitle>
    <Lead>
      We compared the design with the live gift-card flows of four airlines - one Indian, three global - across
      the ten things our object model says matter. It confirmed two of our calls and made two of our gaps harder
      to ignore.
    </Lead>

    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left">
          <thead>
            <tr className="border-b border-black/10">
              <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-black/45 font-semibold w-[210px]">Feature</th>
              {BENCH_COLS.map((c, i) => (
                <th
                  key={c}
                  className={`p-4 font-mono text-[10px] uppercase tracking-widest font-semibold ${i === 0 ? 'bg-[#1a1815] text-white' : 'text-black/55'}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BENCH.map((row) => (
              <tr key={row.feature} className="border-b border-black/5 last:border-0">
                <td className="p-4 text-[14px] font-medium text-black/80">{row.feature}</td>
                {row.cells.map(([m, note], i) => (
                  <td key={i} className={`p-4 align-top ${i === 0 ? 'bg-white/60' : ''}`}>
                    <div className="flex items-center gap-2">
                      <MarkIcon m={m} />
                      {note && <span className="text-[12px] text-black/55 leading-snug">{note}</span>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-black/10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-black/45">
        {(['y', 'p', 'n', 'u'] as Mark[]).map((m) => (
          <span key={m} className="inline-flex items-center gap-2">
            <MarkIcon m={m} />
            {{ y: 'Yes', p: 'Partly', n: 'No', u: 'Not stated' }[m]}
          </span>
        ))}
        <span className="ml-auto normal-case tracking-normal">Checked on live purchase pages and published terms, Sep 2026</span>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-4 mt-6">
      {[
        {
          tag: 'Confirms · Iteration 01',
          tone: 'blue',
          t: 'One page before payment is the category norm',
          d: 'Air India runs the same single page we landed on - theme, amount, self or gift, sender and receiver, message, promo and total together.',
        },
        {
          tag: 'Confirms · Iteration 02',
          tone: 'blue',
          t: 'One receiver per order is common - multi-recipient is the upgrade',
          d: 'Air India also takes one receiver per order. American Airlines lets every card go to a different email - proof the model change is worth making once the partner allows it.',
        },
        {
          tag: 'Sharpens · critical gap',
          tone: 'gap',
          t: 'Three of four let you redeem without an account',
          d: 'A code at checkout is the norm; only AirAsia makes recipients sign up. Our wallet-only redemption is why “create account to redeem” had to be the first thing we handed to the payments team.',
        },
        {
          tag: 'Sharpens · P1 / P2 gaps',
          tone: 'gap',
          t: 'Scheduling and resend already exist elsewhere',
          d: 'Air India schedules delivery up to 60 days ahead; American Airlines has a self-serve resend page. Both sit on our gap list - now with evidence for the backlog.',
        },
      ].map((c) => (
        <div key={c.t} className="bg-white/50 border border-black/10 rounded-2xl p-6">
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: c.tone === 'gap' ? GAP : '#1d4ed8' }}>
            {c.tag}
          </div>
          <h3 className="text-[17px] font-semibold text-black mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{c.t}</h3>
          <p className="text-[14px] leading-relaxed text-black/60">{c.d}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 grid grid-cols-3 gap-3">
      {[
        { k: 'Where we lead', v: 'Live preview · presets + custom amount · guest checkout' },
        { k: 'Where we match', v: 'Themes · personal message · self or gift' },
        { k: 'Where we trail', v: 'Scheduling · resend · multi-recipient · account-free redemption' },
      ].map((s, i) => (
        <div key={s.k} className={`rounded-xl p-4 ${i === 2 ? 'bg-[rgba(194,65,12,0.07)]' : 'bg-[#ede9e3] border border-[#d8d2c8]'}`}>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: i === 2 ? GAP : 'rgba(0,0,0,0.45)' }}>{s.k}</div>
          <div className="text-[13px] text-black/75 leading-snug">{s.v}</div>
        </div>
      ))}
    </div>
  </section>
);

/* Storyboard - shows the generated comic once /air-gv/storyboard.webp exists */
const Storyboard = () => {
  const [missing, setMissing] = useState(false);
  return (
    <section id="story" className="mb-24 scroll-mt-32">
      <SectionLabel>The story, in short</SectionLabel>
      {missing ? (
        <div className="border-2 border-dashed border-black/15 rounded-2xl min-h-[280px] flex flex-col items-center justify-center text-center p-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 bg-black/5 border border-black/10 rounded-full px-3 py-1 mb-3">Storyboard pending</span>
          <p className="text-[14px] text-black/50 max-w-sm">12-panel comic goes here. Drop the image at /public/air-gv/storyboard.webp.</p>
        </div>
      ) : (
        <div className="bg-white/50 border border-black/10 rounded-2xl p-3 sm:p-5 max-w-[860px] mx-auto">
          <img
            src="/air-gv/storyboard.webp"
            alt="Twelve-panel comic: Rahul wants to gift his friend Priya a trip for her birthday, worries a gift card will feel cold or never arrive, then personalises and sends an air gift voucher that Priya adds to her wallet and uses to fly"
            className="w-full h-auto rounded-xl"
            onError={() => setMissing(true)}
          />
        </div>
      )}
      <p className="text-[14px] text-black/50 text-center mt-4 max-w-2xl mx-auto">
        One gift, two people, twelve panels - from a present that felt like a bank transfer to a trip that
        arrives on the birthday. It's here to be read in thirty seconds; the sections below do the proving.
      </p>
    </section>
  );
};

/* ── Page ───────────────────────────────────────────────────────── */

export const AirGVCaseStudy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [formState, setFormState] = useState<(typeof FORM_STATES)[number]['id']>('guest-gift');
  const [orderState, setOrderState] = useState<(typeof ORDER_STATES)[number]['id']>('fail');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    TOC_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const currentForm = FORM_STATES.find((f) => f.id === formState)!;
  const currentOrder = ORDER_STATES.find((o) => o.id === orderState)!;

  return (
    <>
      {/* Sticky side TOC - desktop only */}
      <nav className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30" aria-label="Case study sections">
        <ul className="space-y-2.5">
          {TOC_SECTIONS.map((s) => {
            const on = activeSection === s.id;
            return (
              <li key={s.id}>
                <button onClick={() => scrollToSection(s.id)} className="group flex items-center gap-3 cursor-pointer">
                  <span className={`block rounded-full transition-all duration-300 ${on ? 'w-8 h-[3px] bg-black' : 'w-4 h-[2px] bg-black/20 group-hover:bg-black/40 group-hover:w-6'}`} />
                  <span className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${on ? 'text-black opacity-100' : 'text-black/50 opacity-0 group-hover:opacity-100'}`}>
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative z-1 min-h-screen py-24 sm:py-32 px-4 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-[15px] mb-10 text-black/70 hover:text-black transition-colors">
            <span aria-hidden="true">←</span>
            <span>Back to work</span>
          </Link>

          {/* ── Hero ── */}
          <div id="overview" className="mb-24 scroll-mt-32">
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['IndiGo · Ancillary revenue', 'OOUX / ORCA', 'Inherited project', 'Payments', 'In development'].map((t) => (
                <span key={t} className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 border border-black/10 font-mono text-[11px] text-black/55 uppercase tracking-wider">
                  {t === 'OOUX / ORCA' ? (
                    <>
                      <Term k="OOUX" />&nbsp;/&nbsp;<Term k="ORCA" />
                    </>
                  ) : (
                    t
                  )}
                </span>
              ))}
            </div>

            <h1
              className="text-[42px] sm:text-[64px] md:text-[76px] mb-6 tracking-tight leading-[1.04] text-black"
              style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
            >
              I inherited a stalled gifting feature. <span className="text-black/35 italic">So I rebuilt it from the data up.</span>
            </h1>

            <p className="text-[18px] sm:text-[21px] leading-[1.65] text-black/60 mb-8 max-w-3xl">
              Air Gift Voucher lets travellers buy flight credit for themselves or as a gift, on IndiGo - India's
              largest airline. The project had been started, paused and passed on - with no handover and flows nobody
              could fully explain.
            </p>

            <div className="border-l-[3px] border-blue-600 bg-white/50 rounded-r-2xl p-6 sm:p-8 mb-12 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-blue-700 mb-3">TL;DR</div>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-black/75">
                Instead of patching screens, I went back to the requirements and mapped the whole system with
                {' '}<Term k="OOUX" /> - 8 objects, 12 relationships, 45 attributes, 36 actions. That model exposed 9 missing
                actions before a line of code was written, gave us one purchase flow that adapts to 4 user states,
                and became the shared spec we handed to the payments team for redemption.
              </p>
            </div>

            <div className="lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-6 lg:items-stretch">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: '8', l: 'objects', s: 'mapped from one BRD' },
                  { n: '36', l: 'CTAs audited', s: 'across 3 personas' },
                  { n: '9', l: 'gaps found', s: '6 marked P1' },
                  { n: '4 → 1', l: 'user states, one flow', s: 'forms shown: 0 to 2' },
                ].map((m) => (
                  <Card key={m.l} className="p-5 hover:bg-[#e6e1da] transition-colors duration-200">
                    <div className="text-[40px] font-bold leading-none tracking-tight mb-4 text-black tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                      {m.n}
                    </div>
                    <div className="text-[13px] font-semibold text-black/75 leading-snug">{m.l}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-black/40 mt-1.5">{m.s}</div>
                  </Card>
                ))}
              </div>
              <div className="mt-4 lg:mt-0 flex flex-col justify-center">
                <Screen src="/air-gv/configurator.webp" alt="Gift voucher configurator: live card preview, theme picker, denominations, self or gift toggle, quantity and message" />
                <Caption>↑ The configurator - live preview reacts to every choice</Caption>
              </div>
            </div>
          </div>

          <Storyboard />

          {/* ── Problem ── */}
          <section id="problem" className="mb-24 scroll-mt-32">
            <SectionLabel>Problem</SectionLabel>
            <SectionTitle className="mb-6">Screens existed. The system behind them didn't.</SectionTitle>
            <p className="text-[18px] sm:text-[20px] leading-relaxed text-black/70 mb-10 max-w-3xl">
              The business goal was clear: a digital gifting product to grow ancillary revenue and bring people
              back to book. What I inherited wasn't. It wasn't live, there had been no knowledge transfer, and the
              requirements had been adapted from an older brand-voucher project without being fully rewritten.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { k: 'No handover', t: 'Nobody to ask "why"', d: 'Design decisions were in the files, but the reasoning behind them had left with the previous owner.' },
                { k: 'Leftover requirements', t: 'Two vendors, one voucher', d: 'The BRD named two different issuing partners in different sections - still titled after the project it was copied from.' },
                { k: 'Dead end', t: 'The story stopped at payment', d: 'Purchase was specified in detail. What the recipient does next - especially without an account - was not.' },
              ].map((c, i) => (
                <FadeIn key={c.k} delay={i * 0.08}>
                  <Card className="p-6 h-full">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">
                      {String(i + 1).padStart(2, '0')} · {c.k}
                    </div>
                    <h3 className="text-[17px] font-semibold mb-2 text-black" style={{ fontFamily: 'var(--font-heading)' }}>{c.t}</h3>
                    <p className="text-[14px] leading-relaxed text-black/60">{c.d}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            <div className="bg-[#1a1815] rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-5">Problem statement</div>
                <p className="text-[20px] sm:text-[24px] leading-relaxed text-white/90" style={{ textWrap: 'pretty' }}>
                  A payments feature was about to be built on requirements with undefined edges - failed deliveries,
                  lost PINs, recipients with no account. Each one is money a customer paid for and can't use: a
                  support ticket at best, lost trust in IndiGo at worst.
                </p>
              </div>
            </div>
          </section>

          {/* ── Users ── */}
          <section id="users" className="mb-24 scroll-mt-32">
            <SectionLabel>Users & needs</SectionLabel>
            <SectionTitle>One voucher, three people with different jobs</SectionTitle>
            <Lead>
              I wrote <Term k="JTBD">jobs-to-be-done</Term> straight from the object model, so every job pointed at the objects - and
              the screens - it would need.
            </Lead>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  who: 'The gifter',
                  want: 'personalise a voucher with a theme and a message',
                  so: 'it feels intentional - not like a bank transfer',
                  objs: ['Voucher', 'Delivery'],
                },
                {
                  who: 'The self-buyer',
                  want: 'finish with zero extra forms when I’m logged in',
                  so: 'I can preload credit and book later',
                  objs: ['User', 'Wallet'],
                },
                {
                  who: 'The recipient',
                  want: 'redeem without already having an account',
                  so: 'a gift from someone else isn’t stuck behind a sign-up wall',
                  objs: ['Recipient', 'Wallet'],
                  flag: true,
                },
              ].map((p, i) => (
                <FadeIn key={p.who} delay={i * 0.08}>
                  <Card className="p-6 h-full flex flex-col">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-4">JTBD · {String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-[20px] font-semibold text-black mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{p.who}</h3>
                    <p className="text-[15px] leading-relaxed text-black/70 mb-5">
                      <span className="text-black/40">I want to </span>{p.want}
                      <span className="text-black/40"> so that </span>{p.so}.
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 items-center">
                      {p.objs.map((o) => (
                        <span key={o} className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 border border-black/10 text-black/60">{o}</span>
                      ))}
                      {p.flag && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: GAP, background: 'rgba(194,65,12,0.08)' }}>
                          Not in BRD
                        </span>
                      )}
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
            <p className="mt-4 text-[14px] text-black/50 max-w-3xl">
              A fourth, quieter persona shaped the analytics: the business wanted to track drop-off at each step
              and the split between self and gift purchases.
            </p>
          </section>

          {/* ── Role ── */}
          <section id="role" className="mb-24 scroll-mt-32">
            <SectionLabel>My role</SectionLabel>
            <SectionTitle>What I owned, what we shared</SectionTitle>
            <Lead>
              I was the product designer on the purchase experience, working with the product manager who owned
              the <Term k="BRD" />, engineering, and the payments team who owned the wallet.
            </Lead>
            <Card className="overflow-hidden">
              {[
                { area: 'Re-baselining requirements', detail: 'Asked the PM for the BRD again and treated it as the source of truth, not the old files', tag: 'With PM' },
                { area: 'OOUX / ORCA model', detail: 'Objects, relationships, attributes, CTAs and JTBD - built end to end', tag: 'Owned' },
                { area: 'Gap audit & prioritisation', detail: 'Every missing action logged with a persona, a trigger and a P1 / P2 priority', tag: 'Owned' },
                { area: 'Purchase flow UX & UI', detail: 'Configurator, 4 contact states, checkout, order outcomes, order lookup', tag: 'Owned' },
                { area: 'Redemption & wallet', detail: 'Problem statement + object model handed to the payments team, who own that journey', tag: 'Handed off' },
              ].map((row, i) => (
                <div key={row.area} className={`grid grid-cols-[1fr_auto] sm:grid-cols-[260px_1fr_120px] gap-3 sm:gap-6 items-start sm:items-center p-4 sm:p-5 ${i ? 'border-t border-black/5' : ''}`}>
                  <div className="text-[14px] font-semibold text-black/85">{row.area}</div>
                  <div className="text-[13px] text-black/55 leading-relaxed col-span-2 sm:col-span-1 sm:order-2">{row.detail}</div>
                  <div className="sm:order-3 justify-self-end">
                    <span className={`inline-flex font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${row.tag === 'Owned' ? 'bg-black text-white' : 'border border-black/25 text-black/60'}`}>
                      {row.tag}
                    </span>
                  </div>
                </div>
              ))}
            </Card>
            <div className="mt-6 border-l-[3px] border-black/70 bg-white/50 rounded-r-2xl px-6 py-4 max-w-3xl">
              <p className="text-[15px] leading-relaxed text-black/70">
                <span className="font-semibold text-black/90">Constraints: </span>
                no handover, three third-party systems (voucher issuing, payment gateway, CMS), and a redemption
                journey owned by another team - so our side had to be airtight about the data it passed on.
              </p>
            </div>
          </section>

          {/* ── OOUX model ── */}
          <section id="model" className="mb-24 scroll-mt-32">
            <SectionLabel>Process · OOUX</SectionLabel>
            <SectionTitle>Nouns before screens</SectionTitle>
            <Lead>
              With nobody to explain the old flows, I stopped reading screens and started reading the system.
              {' '}<Term k="ORCA" /> forces one question at a time - what exists, how it connects, what it holds, what people do
              to it.
            </Lead>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
              {[
                { n: '01', t: 'Objects', c: '8', d: 'with structure, instance, purpose' },
                { n: '02', t: 'Relationships', c: '12', d: 'each with cardinality' },
                { n: '03', t: 'Attributes', c: '45', d: 'type, owner, where shown' },
                { n: '04', t: 'CTAs', c: '36', d: 'per persona, marked in BRD or not' },
                { n: '05', t: 'JTBD', c: '11', d: 'tied back to objects' },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={i * 0.06}>
                  <div className="bg-white/60 border border-black/10 rounded-2xl p-5 h-full">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="font-mono text-[11px] text-black/35">{s.n}</span>
                      <span className="text-[28px] font-bold tabular-nums text-black" style={{ fontFamily: 'var(--font-heading)' }}>{s.c}</span>
                    </div>
                    <div className="text-[15px] font-semibold text-black mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {s.t in GLOSSARY ? <Term k={s.t} /> : s.t}
                    </div>
                    <div className="text-[12px] text-black/50 leading-snug">{s.d}</div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <h3 className="text-[22px] font-semibold text-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>The object map</h3>
            <p className="text-[15px] text-black/55 mb-5 max-w-2xl">
              Every line is a rule the interface has to respect. The dashed ones are the rules the BRD never wrote.
            </p>
            <ObjectMap />

            <div className="grid lg:grid-cols-2 gap-5 mt-10">
              <AttributeOwnership />
              <Card className="p-6 sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-1">Relationship → UX rule</div>
                <h3 className="text-[20px] font-semibold text-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>How <Term k="cardinality" /> turned into interface decisions</h3>
                <div className="space-y-3">
                  {[
                    ['Order has exactly 1 Payment', 'No confirmation page without a payment result - block progression.'],
                    ['Order has 1–many Vouchers', 'Quantity is a stepper, and each voucher needs its own delivery.'],
                    ['Order has 0–1 Promo code', 'Promo is optional - show savings only once one is applied.'],
                    ['User has 0–1 Recipient', 'Buying for yourself hides the recipient form entirely.'],
                    ['User has 0–many Orders', 'Order history needs a real empty state for first-time buyers.'],
                  ].map(([rel, rule]) => (
                    <div key={rel} className="grid grid-cols-[1fr] sm:grid-cols-[190px_1fr] gap-1 sm:gap-4 bg-white/60 border border-black/5 rounded-xl p-3.5">
                      <div className="font-mono text-[11px] text-blue-700 leading-snug">{rel}</div>
                      <div className="text-[13px] text-black/70 leading-snug">{rule}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ── Gaps ── */}
          <section id="gaps" className="mb-24 scroll-mt-32">
            <SectionLabel>What the model exposed</SectionLabel>
            <SectionTitle>9 things nobody had asked for yet</SectionTitle>
            <Lead>
              Listing every action per persona, and marking whether the BRD covered it, turned "something feels
              missing" into a list with priorities.
            </Lead>
            <CtaCoverage />
          </section>

          {/* ── Journey (design) ── */}
          <section id="journey" className="mb-24 scroll-mt-32">
            <SectionLabel>Design · the journey</SectionLabel>
            <SectionTitle>Nine stages, walked in order</SectionTitle>
            <Lead>
              We mapped the whole purchase as a user flow first - every branch and decision - then designed the
              screens to match it. Here's that flow, and the screen behind each stage.
            </Lead>

            <FlowMap onJump={scrollToSection} />

            <div className="space-y-6 mt-10">
              <Stage id="j-land" tone="blue">
                <StageHeader stage={JOURNEY[0]}>
                  Four entry points - homepage banner, navigation, campaigns and the marketplace - all land on the
                  same page, so there's one place to get right.
                </StageHeader>
                <AnnotatedScreen src="/air-gv/pdp-full.webp" alt="Gift voucher page: headline, live card preview, theme picker and configuration panel" pins={PINS.land} />
              </Stage>

              <Stage id="j-configure">
                <StageHeader stage={JOURNEY[1]}>
                  Five choices, one panel. The custom amount is shown here because it's the state with the most
                  rules behind it.
                </StageHeader>
                <AnnotatedScreen src="/air-gv/custom-amount.webp" alt="Configuration panel with Custom selected, amount field and range hint" pins={PINS.configure} frame={false} maxW="560px" />
              </Stage>

              <Stage id="j-who" tone="blue">
                <StageHeader stage={JOURNEY[2]}>
                  The flow's first decision. Two attributes - logged in or not, self or gift - decide how much
                  anyone has to type. Pick a state:
                </StageHeader>
            <div className="lg:grid lg:grid-cols-[340px_1fr] gap-6 items-start">
              <div>
                <div className="grid grid-cols-[72px_1fr_1fr] gap-2 mb-4" role="group" aria-label="Choose a user state">
                  <div />
                  {['Buy for self', 'Send as gift'].map((h) => (
                    <div key={h} className="font-mono text-[10px] uppercase tracking-wider text-black/45 text-center pb-1">{h}</div>
                  ))}
                  {(['Guest', 'Logged in'] as const).map((auth) => (
                    <div key={auth} className="contents">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-black/45 self-center">{auth}</div>
                      {(['Buy for self', 'Send as gift'] as const)
                        .map((mode) => FORM_STATES.find((f) => f.auth === auth && f.mode === mode)!)
                        .map((f) => {
                          const on = f.id === formState;
                          return (
                            <button
                              key={f.id}
                              onClick={() => setFormState(f.id)}
                              aria-pressed={on}
                              className={`rounded-xl py-4 text-center border transition-colors ${on ? 'bg-[#1a1815] border-[#1a1815] text-white' : 'bg-[#ede9e3] border-[#d8d2c8] text-black hover:bg-[#e6e1da]'}`}
                            >
                              <div className="text-[30px] font-bold leading-none tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>{f.forms}</div>
                              <div className={`font-mono text-[10px] uppercase tracking-wider mt-1.5 ${on ? 'text-white/60' : 'text-black/45'}`}>
                                form{f.forms === 1 ? '' : 's'}
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  ))}
                </div>
                <div className="bg-white/60 border border-black/10 rounded-xl p-4 mb-6 lg:mb-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-1">
                    {currentForm.auth} · {currentForm.mode}
                  </div>
                  <p className="text-[14px] text-black/70 leading-relaxed">{currentForm.why}</p>
                </div>
              </div>
              <div className="bg-white/40 rounded-2xl p-4 sm:p-8 flex justify-center sm:min-h-[480px] items-start">
                <motion.div key={currentForm.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-[520px]">
                  <Screen src={currentForm.img} alt={`Contact details section for ${currentForm.auth} users choosing ${currentForm.mode}`} />
                </motion.div>
              </div>
            </div>

              </Stage>

              <Stage id="j-offers">
                <StageHeader stage={JOURNEY[3]}>Optional, so it never blocks the path - but easy to use when it matters.</StageHeader>
                <AnnotatedScreen src="/air-gv/offers-drawer.webp" alt="All offers drawer with promo code field and offers you can apply" pins={PINS.offers} frame={false} maxW="440px" />
              </Stage>

              <Stage id="j-review" tone="blue">
                <StageHeader stage={JOURNEY[4]}>The order summary is a sticky bar, not a separate page - one less screen before payment.</StageHeader>
                <AnnotatedScreen src="/air-gv/total-bar.webp" alt="Sticky total bar with total amount and Next button" pins={PINS.review} frame={false} />
              </Stage>

              <Stage id="j-pay">
                <StageHeader stage={JOURNEY[5]}>Four payment methods from the flow, with the one most people use opened first.</StageHeader>
                <AnnotatedScreen src="/air-gv/payment.webp" alt="Payment page with UPI options, review summary and payment breakdown" pins={PINS.pay} />
              </Stage>

              <Stage id="j-outcome" tone="blue">
                <StageHeader stage={JOURNEY[6]}>
                  Two decisions in a row: did the payment go through, and did the partner issue the voucher? That
                  gives three outcomes, and each one has a designed next step.
                </StageHeader>
              <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Order outcome">
                {ORDER_STATES.map((o) => {
                  const on = o.id === orderState;
                  return (
                    <button
                      key={o.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setOrderState(o.id)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${on ? 'bg-black text-white border-black' : 'bg-white/60 border-black/10 text-black/70 hover:bg-white'}`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
                <motion.div key={currentOrder.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Screen src={currentOrder.img} alt={`Order ${currentOrder.label.toLowerCase()} page`} />
                </motion.div>
                <Card className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-2">Payment.status = {currentOrder.status}</div>
                  <p className="text-[15px] leading-relaxed text-black/75">{currentOrder.note}</p>
                </Card>
              </div>
              </Stage>

              <Stage id="j-deliver">
                <StageHeader stage={JOURNEY[7]}>
                  A system step with no screen of ours - but its content was specified from the Voucher and
                  Delivery attributes, so nothing the recipient needs is left out.
                </StageHeader>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { ch: 'Email', items: ['Voucher code', 'PIN (masked in UI)', 'Value', 'Expiry date', 'How to redeem'] },
                    { ch: 'SMS', items: ['Notification', 'Voucher reference'] },
                  ].map((c) => (
                    <div key={c.ch} className="bg-white/70 border border-dashed border-black/20 rounded-xl p-5">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Channel · {c.ch}</div>
                      <ul className="space-y-1.5">
                        {c.items.map((it) => (
                          <li key={it} className="text-[14px] text-black/70 flex gap-2"><span className="text-blue-600">→</span>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[13px] leading-relaxed" style={{ color: GAP }}>
                  What happens when delivery fails had no answer in the BRD - it's one of the 9 gaps, raised with the PM.
                </p>
              </Stage>

              <Stage id="j-find" tone="blue">
                <StageHeader stage={JOURNEY[8]}>After purchase, guests and members both need a way back to their voucher.</StageHeader>
                <AnnotatedScreen src="/air-gv/order-lookup.webp" alt="Find your booking: order ID and last name lookup with an empty state and login prompt" pins={PINS.find} />
              </Stage>
            </div>
          </section>

          {/* ── Iterations ── */}
          <section id="iterations" className="mb-24 scroll-mt-32">
            <SectionLabel>Iterations</SectionLabel>
            <SectionTitle>Two ideas that changed shape</SectionTitle>
            <Lead>
              Neither of these screens looked like this at first. One changed because people got lost in it; the
              other because a partner system couldn't carry it - yet.
            </Lead>

            <div className="space-y-6">
              <Iteration
                n="01"
                kind="Peer reviews · UX audit · prototype sessions"
                title="From a side sheet to one page before payment"
                before={
                  <PinnedShot
                    src="/air-gv/side-sheet.webp"
                    alt="Earlier version: a Send as a gift side sheet covering the voucher configuration behind a dark overlay"
                    pins={SHEET_PINS}
                  />
                }
                wrong={
                  <>
                    Details were collected in a side sheet that opened over the voucher. In internal peer reviews, a UX
                    audit and prototype sessions with around 6 colleagues from finance and ops, people lost track of
                    what they had already chosen - the sheet covered the very thing they were buying.
                  </>
                }
                after={<Screen src="/air-gv/pdp-full.webp" alt="One-page gift voucher configuration with card preview and details visible together" />}
                replaced={
                  <>
                    Everything before payment lives on one page: the card preview, amount, recipient and a sticky total
                    stay in view together. That's also why the order summary became a bar instead of its own step.
                    People recognise their choices instead of having to remember them.
                  </>
                }
                tradeoff={
                  <>
                    The page got longer, and the contact details moved further down. But the colleagues who tried it
                    found the one-page version easy to fill - the extra scroll cost less than losing track of what
                    they were buying.
                  </>
                }
              />

              <Iteration
                n="02"
                kind="Third-party constraint"
                title="One recipient per order - for now"
                before={<RecipientDiagram mode="many" />}
                wrong={
                  <>
                    Quantity allows several vouchers per order, so we designed for the obvious next ask: send each one to
                    a different person. But recipient details travel to the voucher partner with every order, and the
                    partner's integration couldn't send and receive separate recipient details for each voucher in
                    one order.
                  </>
                }
                after={<RecipientDiagram mode="one" />}
                replaced={
                  <>
                    We fell back to what the object model already said - an Order has exactly 1 Recipient. All vouchers
                    in an order go to one person, and the form says so rather than implying otherwise.
                  </>
                }
                tradeoff={
                  <>
                    Gifting three different people means three orders today. In exchange, delivery stays reliable on a
                    system we don't control - and because the model is explicit, moving Recipient from Order to Voucher
                    later is a single, well-understood change.
                  </>
                }
              />
            </div>
          </section>

          <Benchmark />

          {/* ── Handoff ── */}
          <section id="handoff" className="mb-24 scroll-mt-32">
            <SectionLabel>Handoff</SectionLabel>
            <SectionTitle>Every gap got an owner</SectionTitle>
            <Lead>
              Redemption belonged to the payments team, not us. Rather than hand over screens, we handed over
              the model - the objects, attributes and relationships - so both teams described the voucher the
              same way.
            </Lead>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {(
                [
                  { s: 'handoff', t: 'Handed to payments team', d: 'Redemption-side problems, with the problem statement and ORCA spec' },
                  { s: 'flagged', t: 'Raised with PM as requirements', d: 'Prioritised P1 / P2 for the product backlog' },
                ] as const
              ).map((col) => (
                <Card key={col.s} className="p-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-[18px] font-semibold text-black" style={{ fontFamily: 'var(--font-heading)' }}>{col.t}</h3>
                    <span className="text-[28px] font-bold tabular-nums text-black/80" style={{ fontFamily: 'var(--font-heading)' }}>
                      {GAPS.filter((g) => g.status === col.s).length}
                    </span>
                  </div>
                  <p className="text-[13px] text-black/50 mb-5">{col.d}</p>
                  <div className="space-y-2">
                    {GAPS.filter((g) => g.status === col.s).map((g) => (
                      <div key={g.cta} className="bg-white/70 border border-black/5 rounded-xl p-3.5">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className="text-[14px] font-semibold text-black/85">{g.cta}</span>
                          <span
                            className="shrink-0 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={g.priority === 'P1' ? { background: GAP, color: '#fff' } : { border: '1px solid rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.55)' }}
                          >
                            {g.priority}
                          </span>
                        </div>
                        <div className="text-[12px] text-black/50 leading-snug">
                          <span className="font-mono uppercase tracking-wider text-[10px] text-black/35 mr-1.5">{g.persona}</span>
                          {g.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-[#1a1815] rounded-2xl p-6 sm:p-8 grid sm:grid-cols-3 gap-6">
              {[
                ['Objects', 'Voucher, Wallet, Recipient and Delivery - with the same definitions on both sides'],
                ['Attributes', 'Which fields we send, who owns them, and which are masked (the PIN never shows in full)'],
                ['Lifecycle', 'Active → Redeemed / Expired / Cancelled - with the triggers still to be agreed'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-2">Shared: {k}</div>
                  <p className="text-[14px] leading-relaxed text-white/75">{v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Next ── */}
          <section id="next" className="mb-24 scroll-mt-32">
            <SectionLabel>Where it stands</SectionLabel>
            <SectionTitle>Not live yet - here's how we'll know it worked</SectionTitle>
            <Lead>
              The feature is still in development, so there are no results to show. These are the success
              criteria the business set, and the ones this design is accountable to.
            </Lead>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {[
                ['≥ 95%', 'transaction success across payment methods'],
                ['≤ 2%', 'payment failures, with retry + fallback'],
                ['≥ 3%', 'click-through on entry points'],
                ['25–30%', 'repeat purchase within 90 days'],
              ].map(([v, l]) => (
                <Card key={l} className="p-5 border-dashed">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Target</div>
                  <div className="text-[34px] font-bold text-black tabular-nums tracking-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{v}</div>
                  <div className="text-[13px] text-black/60 leading-snug">{l}</div>
                </Card>
              ))}
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-black/40">Targets from the BRD - not outcomes</p>

            <div className="mt-16">
              <SectionLabel>Learnings</SectionLabel>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    t: 'When nobody can explain the screens, model the system',
                    d: 'OOUX gave me a way in that didn’t depend on the person who left. The objects were in the BRD all along.',
                  },
                  {
                    t: 'Gaps hide after the "happy" moment',
                    d: 'Most missing actions sat after payment: delivery, recovery, redemption. The BRD ended where the customer’s real journey began.',
                  },
                  {
                    t: 'The model is the handoff',
                    d: 'Sharing objects and attributes - not just mockups - let another team build redemption on the same definitions we used.',
                  },
                ].map((l, i) => (
                  <div key={l.t} className="bg-white/50 border border-black/10 rounded-2xl p-6 hover:border-black/20 hover:bg-white/70 transition-colors duration-200">
                    <div className="text-[40px] font-bold text-black/10 mb-2 tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-[17px] font-semibold mb-3 text-black" style={{ fontFamily: 'var(--font-heading)' }}>{l.t}</h3>
                    <p className="text-[14px] leading-relaxed text-black/60">{l.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="bg-[#1a1815] rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-3">Air Gift Voucher</div>
                <p className="text-[18px] sm:text-[22px] text-white/90 max-w-xl leading-relaxed" style={{ fontFamily: 'var(--font-heading)' }}>
                  Vendor and internal details withheld; unreleased screens blurred. Full OOUX workbook and Figma walkthrough available on request.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link to="/" className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-[14px] hover:bg-white/10 transition-colors">
                  See all work
                </Link>
                <a href="mailto:yogesh.ai.ux@gmail.com" className="px-5 py-2.5 rounded-full bg-white text-black text-[14px] font-medium hover:bg-white/90 transition-colors">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
