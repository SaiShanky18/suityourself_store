"use client"

import * as React from "react"
import { addDays, addMonths, format, eachDayOfInterval, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ReserveDatesProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  date: DateRange | undefined,
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>,
  disabledDates: Date[],
  setError: React.Dispatch<React.SetStateAction<string>>
}

const ReserveDates = ({ className, date, setDate, disabledDates, setError }: ReserveDatesProps) => {
  const handleSelect = (range: DateRange | undefined) => {
    if (!range || !range.from || !range.to) {
      setDate(range);
      setError('');
      return;
    }

    const selectedDates = eachDayOfInterval({ start: range.from, end: range.to });
    const isRangeValid = selectedDates.every(
      (selectedDate) => !disabledDates.some((disabledDate) => isSameDay(disabledDate, selectedDate))
    );

    if (isRangeValid) {
      setDate(range);
      setError('');
    } else {
      setError('Selected range includes unavailable dates. Please select a different date range.');
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-black text-white",
              !date && "text-white"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            fromDate={addDays(new Date(), 2)}
            toDate={addMonths(new Date(), 1)}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ReserveDates
