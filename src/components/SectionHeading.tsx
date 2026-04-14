interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-earth-900">{title}</h2>
      {description && (
        <p className="mt-3 text-earth-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
