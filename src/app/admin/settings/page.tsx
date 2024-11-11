"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveLeft, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSettings, updateOneSettings } from "@/server/firestore";
import { DaySchedule, Settings } from "@/types/types";
import Logout from "../_components/logout";

const defaultSettings: Settings = {
  lunch: {
    monday: { startTime: 10, endTime: 16, opens: true },
    tuesday: { startTime: 10, endTime: 16, opens: true },
    wednesday: { startTime: 10, endTime: 16, opens: true },
    thursday: { startTime: 10, endTime: 16, opens: true },
    friday: { startTime: 10, endTime: 16, opens: true },
    saturday: { startTime: 10, endTime: 16, opens: true },
    sunday: { startTime: 10, endTime: 16, opens: true },
  },
  dinner: {
    monday: { startTime: 16, endTime: 22, opens: true },
    tuesday: { startTime: 16, endTime: 22, opens: true },
    wednesday: { startTime: 16, endTime: 22, opens: true },
    thursday: { startTime: 16, endTime: 22, opens: true },
    friday: { startTime: 16, endTime: 22, opens: true },
    saturday: { startTime: 16, endTime: 22, opens: true },
    sunday: { startTime: 16, endTime: 22, opens: true },
  },
  slotDuration: 15,
  tables: [
    { id: 1, numberOfSits: 2 },
    { id: 2, numberOfSits: 4 },
  ],
};

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getSettings().then((data) => {
      if (data) {
        setSettings(data);
      }
    });
  }, []);

  const updateSettings = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    updateOneSettings(key, value);
    toast({
      title: "Settings updated",
      description: `${key} has been updated.`,
    });
  };

  const updateSchedule = (
    meal: "lunch" | "dinner",
    day: string,
    field: keyof DaySchedule,
    value: number | boolean
  ) => {
    const updatedSchedule = {
      ...settings[meal],
      [day]: { ...settings[meal][day], [field]: value },
    };
    updateSettings(meal, updatedSchedule);
  };

  const addTable = () => {
    const newTable = { id: settings.tables.length + 1, numberOfSits: 2 };
    updateSettings("tables", [...settings.tables, newTable]);
  };

  const updateTable = (id: number, numberOfSits: string) => {
    let numberOfSitsAsNumber = parseInt(numberOfSits);
    const updatedTables = settings.tables.map((table) =>
      table.id === id ? { ...table, numberOfSits: numberOfSitsAsNumber } : table
    );
    updateSettings("tables", updatedTables);
    console.log(updatedTables);
  };

  const deleteTable = (id: number) => {
    const updatedTables = settings.tables.filter((table) => table.id !== id);
    updateSettings("tables", updatedTables);
  };

  return (
    <div className="min-h-screen w-full  dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-28 px-4 lg:py-8  lg:px-8 ">
        <h1 className="font-bold text-2xl mb-10 hidden lg:flex">Settings</h1>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="lunch">
                <TabsList>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                </TabsList>
                <TabsContent value="lunch">
                  <ScheduleSettings
                    meal="lunch"
                    settings={settings}
                    updateSchedule={updateSchedule}
                  />
                </TabsContent>
                <TabsContent value="dinner">
                  <ScheduleSettings
                    meal="dinner"
                    settings={settings}
                    updateSchedule={updateSchedule}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Slot Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Label htmlFor="slot-duration">Duration (minutes)</Label>
                <Input
                  id="slot-duration"
                  type="number"
                  min="5"
                  step="5"
                  value={settings.slotDuration}
                  onChange={(e) =>
                    updateSettings("slotDuration", parseInt(e.target.value, 10))
                  }
                  className="w-20"
                />
              </div>
            </CardContent>
          </Card> */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Table Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table ID</TableHead>
                    <TableHead>Number of Seats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.tables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell>{table.id}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={table.numberOfSits}
                          onChange={(e) =>
                            updateTable(table.id, e.target.value)
                          }
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTable(table.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={addTable} className="mt-4">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Table
              </Button>
            </CardContent>
          </Card>
        </div>
        <Logout />
      </main>
    </div>
  );
}

type ScheduleSettingsProps = {
  meal: "lunch" | "dinner";
  settings: Settings;
  updateSchedule: (
    meal: "lunch" | "dinner",
    day: string,
    field: keyof DaySchedule,
    value: number | boolean
  ) => void;
};

function ScheduleSettings({
  meal,
  settings,
  updateSchedule,
}: ScheduleSettingsProps) {
  return (
    <div className="space-y-4">
      {daysOfWeek.map((day) => (
        <div key={day} className="flex items-center space-x-4">
          <div className="w-24 font-medium capitalize">{day}</div>
          <Switch
            checked={settings[meal][day].opens}
            onCheckedChange={(checked) =>
              updateSchedule(meal, day, "opens", checked)
            }
          />
          <Input
            type="number"
            min="0"
            max="23"
            value={settings[meal][day].startTime}
            onChange={(e) =>
              updateSchedule(
                meal,
                day,
                "startTime",
                parseInt(e.target.value, 10)
              )
            }
            className="w-20"
            disabled={!settings[meal][day].opens}
          />
          <span>to</span>
          <Input
            type="number"
            min="0"
            max="23"
            value={settings[meal][day].endTime}
            onChange={(e) =>
              updateSchedule(meal, day, "endTime", parseInt(e.target.value, 10))
            }
            className="w-20"
            disabled={!settings[meal][day].opens}
          />
        </div>
      ))}
    </div>
  );
}
