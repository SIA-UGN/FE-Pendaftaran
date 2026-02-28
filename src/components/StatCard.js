export function StatCard({ value, label, color }) {
  return (
    <div
      className="flex items-center justify-center flex-col w-full gap-2 h-[130px] sm:h-[150px] transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #E6EEE9',
        borderRadius: '16px',
        fontFamily: 'Urbanist, system-ui, sans-serif',
        padding: '16px',
      }}
    >
      <span
        className="font-bold text-2xl sm:text-3xl lg:text-4xl"
        style={{ color: color || '#015023' }}
      >
        {value}
      </span>
      <span className="text-sm sm:text-base text-gray-500 text-center">
        {label}
      </span>
    </div>
  );
}