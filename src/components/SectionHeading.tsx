interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.22em] block mb-2.5 ${
            light ? "text-teal-300" : "text-russet-500"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-[clamp(26px,3.8vw,42px)] font-bold leading-[1.15] ${
          light ? "text-white" : "text-navy-700"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-[15px] font-light leading-relaxed max-w-lg ${
            centered ? "mx-auto" : ""
          } ${light ? "text-warm-300/80" : "text-navy-500"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
