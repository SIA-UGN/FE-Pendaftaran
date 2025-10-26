import AccountInformation from '@/components/AccountInformation'
import RegistrantInformation from '@/components/RegistrantInformation'
import ApplicantInformation from '@/components/ApplicantInformation'
import Statistics from '@/components/Statistics'
import Keuangan from '@/components/Keuangan'

export default function Page() {
  return (
    <>
        <AccountInformation />
        <RegistrantInformation />
        <ApplicantInformation />
        <Statistics />
        <Keuangan />
    </>
  )
}
