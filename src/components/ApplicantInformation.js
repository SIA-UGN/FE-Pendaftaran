import { Card } from '@/components/ui/card'
import ApplicantList from '@/components/ApplicantList'

export default function ApplicantInformation() {
    return (
        <>
            <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
                            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                                Data Pendaftar
                            </h2>
                            <div className="grid grid-cols-3 w-full gap-12">
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">80</span>
                                    <span className='text-lg'>Approved</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">30</span>
                                    <span className='text-lg'>Rejected</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">23</span>
                                    <span className='text-lg'>Pending</span>
                    </Card>
                </div>
                <ApplicantList />
            </div>
            <div className="flex flex-col items-center px-4 sm:px-8 max-w-11/12 my-12 w-full">
                            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                                Data Kelulusan Pendaftar
                            </h2>
                            <div className="grid grid-cols-2 w-10/12 gap-12">
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">80</span>
                                    <span className='text-lg'>Lulus</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black gap-2">
                                    <span className="font-bold text-3xl">30</span>
                                    <span className='text-lg'>Ditolak</span>
                    </Card>
                </div>
                <ApplicantList />
            </div>
        </>
    )
}