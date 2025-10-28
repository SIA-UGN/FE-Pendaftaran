'use client'

import AccountInformation from '@/components/AccountInformation'
import RegistrantInformation from '@/components/RegistrantInformation'
import ApplicantInformation from '@/components/ApplicantInformation'
import Statistics from '@/components/Statistics'
import Keuangan from '@/components/Keuangan'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <AccountInformation />
        <RegistrantInformation />
        <ApplicantInformation />
        <Statistics />
        <Keuangan />
    </div>
  )
}
