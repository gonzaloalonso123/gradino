import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSettings, updateSettings } from "@/server/firestore";
import { LucideArrowBigLeft, StepBack } from "lucide-react";
import Link from "next/link";

export default async function Settings() {
  const settings = await getSettings();
  const updateOneSettings = async (key: string, value: any) => {
    await updateSettings({ ...settings, [key]: value });
  };
  
  return (
    <div className="flex flex-col gap-6 p-10">
      <Link href="/admin/overview">
        <LucideArrowBigLeft size={24} />
      </Link>
      <h1 className="text-3xl font-bold">Settings</h1>
      <h2>Lunch</h2>
      Opening at
      <HourSelect value={settings.lunch.startTime} setValue={(value) => updateOneSettings("lunch", { ...settings.lunch, startTime: value })} />
      Closing at
      <HourSelect value={settings.lunch.endTime} setValue={(value) => updateOneSettings("lunch", { ...settings.lunch, endTime: value })} />
      <h2>Dinner</h2>
      Opening at
      <HourSelect value={settings.dinner.startTime} setValue={(value) => updateOneSettings("dinner", { ...settings.dinner, startTime: value })} />
      Closing at
      <HourSelect value={settings.dinner.endTime} setValue={(value) => updateOneSettings("dinner", { ...settings.dinner, endTime: value })} />
    </div>
  );
}

const HourSelect = ({ value, setValue }: { value: number; setValue: (value: number) => void }) => (
  <Select value={value + ""} onValueChange={(val) => setValue(parseInt(val))}>
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
);
