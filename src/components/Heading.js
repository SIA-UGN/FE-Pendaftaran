export function Heading({title}) {
    return (
        <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
            {title}
        </h2>
    )
}