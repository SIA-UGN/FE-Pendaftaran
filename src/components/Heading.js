export function Heading({ title, subtitle, variant = "default" }) {
  const isFirst = variant === "first";

  return (
    <div
      className={`w-full mb-6 sm:mb-8 md:mb-10 ${isFirst ? "mt-0" : "mt-6 sm:mt-8 md:mt-12"}`}
      style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
    >
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold pb-3 border-b-2"
        style={{ color: '#015023', borderColor: '#DABC4E' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}