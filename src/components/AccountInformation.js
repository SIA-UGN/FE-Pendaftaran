"use client"

import { Card } from '@/components/ui/card'

export default function AccountInformation() {
    return (
        <>
            <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
                <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                    Pendaftar & Manager
                </h2>
                <div className="grid grid-cols-2 w-8/12 gap-12 h-2xl">
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2 ">
                                    <span className="font-bold text-3xl">123</span>
                                    <span className='text-lg'>Jumlah Pendaftar</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">20</span>
                                    <span className="text-lg">Jumlah Manager</span>
                    </Card>
                </div>
            </div>
        </>
    )
}