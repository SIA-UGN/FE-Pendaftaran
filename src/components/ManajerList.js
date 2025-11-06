import { Input } from "@/components/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ManajerTable } from "@/components/ManajerTable";

export default function ManajerList() {
  return (
    <>
      <div className="flex gap-5 my-6 w-full">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <DropdownMenu>
          <Button variant="outline" className={"rounded-lg"}>
            <DropdownMenuTrigger>
              Cari Akun Berdasarkan Data
            </DropdownMenuTrigger>
          </Button>
          <DropdownMenuContent>
            <DropdownMenuItem>Fahmi</DropdownMenuItem>
            <DropdownMenuItem>Faradis</DropdownMenuItem>
            <DropdownMenuItem>Khay</DropdownMenuItem>
            <DropdownMenuItem>Riris</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ManajerTable />
    </>
  );
}
