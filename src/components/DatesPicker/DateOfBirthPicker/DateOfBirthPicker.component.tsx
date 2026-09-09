import { useState, type ComponentProps } from "react";
import type { DayPicker } from "react-day-picker";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/Button/Button.component";
import { Calendar } from "@/components/Calendar/Calendar.component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";

type DateOfBirthPickerProps = ComponentProps<typeof DayPicker> & {
  date: Date | undefined;
  onSelectDate: (date?: Date) => void;
  placeholder?: string;
};

export function DateOfBirthPicker({
  date,
  onSelectDate,
  placeholder = "Selecionar data"
}: DateOfBirthPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : placeholder}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          className="bg-background w-auto"
          selected={date}
          defaultMonth={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            onSelectDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
