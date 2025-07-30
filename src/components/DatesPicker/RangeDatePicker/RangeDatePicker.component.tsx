import { Button } from "@/components/Button/Button.component";
import { Calendar } from "@/components/Calendar/Calendar.component";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/Popover/Popover.component";
import { ChevronDownIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";
import type { DateRange, DayPicker } from "react-day-picker";

type RangeDatePickerProps = ComponentProps<typeof DayPicker> & {
  rangeDate: DateRange | undefined;
  onSelectDate: (date?: DateRange) => void;
  placeholder?: string;
};

export function RangeDatePicker({
  rangeDate,
  onSelectDate,
  placeholder = "Selecionar data"
}: RangeDatePickerProps) {
  const [open, setOpen] = useState(false);
  const rangeSelected = rangeDate && rangeDate.from && rangeDate.to;
  const placeholderText = `${
    rangeSelected ? rangeDate.from?.toLocaleDateString() : placeholder
  } - ${rangeSelected ? rangeDate.to?.toLocaleDateString() : ""}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {placeholderText}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          className="w-auto bg-background"
          selected={rangeDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            onSelectDate(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
