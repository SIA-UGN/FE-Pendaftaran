export function Card({number, title}) {
    return (
        <Card className="flex items-center justify-center p-6 flex-col w-full gap-2 h-40 border border-black">
            <span className="font-bold text-4xl text-[var(--green)]">{number}</span>
            <span className="text-lg text-gray-500">{title}</span>
        </Card>
    )
}