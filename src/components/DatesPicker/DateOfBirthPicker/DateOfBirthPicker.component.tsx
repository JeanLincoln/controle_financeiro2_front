import { Button } from "@/components/Button/Button.component";
import { Calendar } from "@/components/Calendar/Calendar.component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface DateOfBirthPickerProps {
  date: Date | undefined;
  onSelectDate: (date?: Date) => void;
}

export function DateOfBirthPicker({
  date,
  onSelectDate
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
          {date ? date.toLocaleDateString() : "Selecionar data"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          className="w-auto bg-background"
          selected={date}
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
