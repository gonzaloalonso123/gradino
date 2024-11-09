import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideArrowBigLeft, StepBack } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex flex-col gap-6 p-10">
      <Link href="/admin/overview">
        <LucideArrowBigLeft size={24} />
      </Link>
      <h1 className="text-3xl font-bold">Settings</h1>
      Opening at
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 24 }, (_, i) => (
            <SelectItem value={i + ""} key={i}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      Closing at
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 24 }, (_, i) => (
            <SelectItem value={i + ""} key={i}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
