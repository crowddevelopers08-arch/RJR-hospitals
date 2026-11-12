type P = { className?: string };

export const PhoneIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" />
  </svg>
);

export const WhatsAppIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.2 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11.5 11.5 0 01-4.4-3.9c-.4-.5-1.5-1.9-1.5-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.7.5l1 2.3c.1.2.1.4 0 .6l-.4.6-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.7-.1l.9-1.1c.2-.3.5-.2.7-.1l2.2 1.1c.3.1.5.2.5.3.1.1.1.6-.1 1.2z" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
  </svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11H7v-2h4V6h2z" />
  </svg>
);

export const MailIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const LeafIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 52C12 28 28 12 52 12c0 24-16 40-40 40z" />
    <path d="M12 52L36 28" />
  </svg>
);

export const ArrowUpIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
