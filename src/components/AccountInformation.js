"use client"

import { Card } from '@/components/ui/card'

export default function AccountInformation() {
    return (
        <>
            <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full gap-3">
                <h2 className="text-3xl sm:text-2xl font-semibold mb-8 w-full border-b-1 border-gray-500 pb-2 text-[var(--green)]">
                    Pendaftar & Manager
                </h2>
                <div className="grid grid-cols-2 w-8/12 gap-12 h-2xl">
                    <Card className="flex items-center justify-center p-6 flex-col w-full  gap-2 h-[160px]">
                                    <span className="font-bold text-4xl text-[var(--green)]">123</span>
                                    <span className='text-lg text-gray-500'>Total Pendaftar</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full gap-2  h-[160px]">
                                    <span className="font-bold text-4xl text-[var(--green)]">20</span>
                                    <span className="text-lg text-gray-500">Total Manager</span>
                    </Card>
                </div>
            </div>
        </>
    )
}