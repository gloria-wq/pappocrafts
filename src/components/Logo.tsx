interface LogoProps {
  color?: string;
  accentColor?: string;
  className?: string;
}

export default function Logo({
  color = "currentColor",
  accentColor = "#00BEC6",
  className = "",
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 380 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* P */}
      <line x1="10" y1="8" x2="10" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="20" y1="8" x2="20" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="8" x2="30" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="8" x2="58" y2="8" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="16" x2="60" y2="16" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="24" x2="58" y2="24" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="32" x2="54" y2="32" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="30" y1="40" x2="48" y2="40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />

      {/* A */}
      <line x1="88" y1="62" x2="100" y2="8" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="97" y1="62" x2="107" y2="16" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="106" y1="62" x2="113" y2="24" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="115" y1="62" x2="119" y2="32" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="124" y1="62" x2="125" y2="40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="133" y1="62" x2="131" y2="48" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="142" y1="62" x2="125" y2="40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="70" y1="36" x2="144" y2="36" stroke={color} strokeWidth="4.5" strokeLinecap="round" />

      {/* P */}
      <line x1="166" y1="8" x2="166" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="176" y1="8" x2="176" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="8" x2="186" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="8" x2="214" y2="8" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="16" x2="216" y2="16" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="24" x2="214" y2="24" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="32" x2="210" y2="32" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="186" y1="40" x2="204" y2="40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />

      {/* P */}
      <line x1="234" y1="8" x2="234" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="244" y1="8" x2="244" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="8" x2="254" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="8" x2="282" y2="8" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="16" x2="284" y2="16" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="24" x2="282" y2="24" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="32" x2="278" y2="32" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="254" y1="40" x2="272" y2="40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />

      {/* O with fingerprint */}
      <line x1="308" y1="8" x2="308" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="318" y1="8" x2="318" y2="62" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M318 8 Q352 8 352 35 Q352 62 318 62" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M318 16 Q340 16 340 35 Q340 54 318 54" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M318 24 Q330 24 330 35 Q330 46 318 46" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* Decorative lines */}
      <line x1="10" y1="74" x2="136" y2="74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity=".35" />
      <line x1="260" y1="74" x2="356" y2="74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity=".35" />

      {/* "crafts" text */}
      <text x="166" y="80" fontFamily="Poppins,sans-serif" fontSize="16" fontWeight="600" fill={accentColor} letterSpacing="4">
        crafts
      </text>
    </svg>
  );
}
