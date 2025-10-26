import { Card } from '@/components/ui/card'
import ApplicantList from '@/components/ApplicantList'

export default function ApplicantInformation() {
    return (
        <>
            <div className="flex flex-col items-center pt-4 pb-16 px-4 sm:px-8 max-w-11/12 my-12">
                            <h2 className="text-xl sm:text-2xl font-medium mb-8 w-full border-b-2 border-black pb-2">
                                Data Pendaftar
                            </h2>
                            <div className="grid grid-cols-3 w-full gap-5">
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black ">
                                    <span className="font-bold">80</span>
                                    <span>Approved</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black ">
                                    <span className="font-bold">30</span>
                                    <span>Rejected</span>
                    </Card>
                    <Card className="flex items-center justify-center p-6 flex-col w-full stroke-black ">
                                    <span className="font-bold">23</span>
                                    <span>Pending</span>
                    </Card>
                </div>
                <ApplicantList />
                        </div>
        </>
    )
}