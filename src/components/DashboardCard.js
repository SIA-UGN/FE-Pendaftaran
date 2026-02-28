export function Card({number, title}) {
    return (
        <div
          className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40"
          style={{ backgroundColor: '#ffffff', border: '1px solid #E6EEE9', borderRadius: '16px' }}
        >
            <span className="font-bold text-4xl" style={{ color: '#015023' }}>{number}</span>
            <span className="text-lg text-gray-500">{title}</span>
        </div>
    )
}