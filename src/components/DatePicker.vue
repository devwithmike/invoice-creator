<script setup>
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'

const df = new DateFormatter('af-ZA', {
  dateStyle: 'short',
})

const model = defineModel()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'justify-start hover:bg-white text-left font-normal w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6',
          !model && 'text-muted-foreground',
        )"
      >
        {{ model ? df.format(model.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="model" initial-focus />
    </PopoverContent>
  </Popover>
</template>
