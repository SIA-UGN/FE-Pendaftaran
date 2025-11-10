export function Heading({ title, variant = "default" }) {
  const isFirst = variant === "first";

  return (
    <h2
      className={`text-xl sm:text-2xl font-semibold mb-8 w-full border-b border-gray-500 pb-2 text-[var(--green)] ${
        isFirst ? "mt-0" : "mt-12"
      }`}
    >
      {title}
    </h2>
  );
}
