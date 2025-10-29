import AccountInformation from "@/components/AccountInformation"
import ApplicantInformation from "@/components/ApplicantInformation"

export default function Dashboard() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <AccountInformation />
                {/* <RegistrantInformation /> */}
            <ApplicantInformation />
        </div>
    )
}