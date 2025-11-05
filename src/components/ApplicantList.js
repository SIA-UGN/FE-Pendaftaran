import { Input } from "@/components/ui/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {ApplicantTable} from '@/components/ApplicantTable'

export default function ApplicantList() {
    return (
        <>     
            <div className="flex gap-5 my-6 w-full">
                <InputGroup>
                    <InputGroupInput placeholder="Cari berdasarkan nama, nomor peserta, dsb.." />
                    <InputGroupAddon>
                    <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={"outline"}>
                            Cari Akun Berdasarkan Data
                        </Button>
                    </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Fahmi</DropdownMenuItem>
                    <DropdownMenuItem>Faradis</DropdownMenuItem>
                    <DropdownMenuItem>Khay</DropdownMenuItem>
                    <DropdownMenuItem>Riris</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ApplicantTable/>
        </>
    )
}