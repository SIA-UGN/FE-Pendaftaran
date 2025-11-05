import { Card } from '@/components/ui/card'
import ManajerList from '@/components/ManajerList'

export default function Manajer() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
                            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                                Data Manajer
                            </h2>
                <ManajerList />
            </div>
        </div>
    )
}