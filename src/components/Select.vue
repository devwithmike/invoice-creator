<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

const open = ref(false)
const model = defineModel()
const props = defineProps(['currencies'])
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="justify-between w-full font-normal hover:bg-white"
      >
        {{ model
          ? props.currencies.find((currency) => currency.value === model)?.label
          : "Select currency" }}
        <ChevronDown class="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 min-w-[200px]">
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="currency in props.currencies"
              :key="currency.value"
              :value="currency.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  model = ev.detail.value
                }
                open = false
              }"
            >
              {{ currency.label }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  model === currency.value ? 'opacity-100' : 'opacity-0',
                )"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
