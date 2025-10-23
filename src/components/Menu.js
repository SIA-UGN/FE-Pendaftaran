import { Card } from "@/components/ui/card"

import { GraduationCap } from "lucide-react"
import { Building } from "lucide-react"
import { NotebookPen } from "lucide-react"

export default function Menu() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-11/12 mx-auto my-3">
            <Card className="flex items-center justify-center p-6 flex-col w-2/3 mx-auto">
                <GraduationCap size={100} className="stroke-1"/>
                Profil
            </Card>
            <Card className="flex items-center justify-center p-6 flex-col w-2/3 mx-auto">
                <Building size={100} className="stroke-1" />
                Fakultas
            </Card>
            <Card className="flex items-center justify-center p-6 flex-col w-2/3 mx-auto stroke-black">
                <NotebookPen size={100} className="stroke-1" />
                Pendaftaran
            </Card>
        </div>
    )
}