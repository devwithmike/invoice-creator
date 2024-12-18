<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const props = defineProps(['finalDialogOpen', 'finalDialogOpenEvent'])
</script>

<template>
  <Dialog v-model:open="props.finalDialogOpen" @update:open="props.finalDialogOpenEvent">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Thank you for using the app.</DialogTitle>
      </DialogHeader>
      <div class="grid grid-cols-5 gap-4">
		<p class="col-span-3">If you enjoy using the application consider supporting me by buying me a coffee 😁</p>
		<Button class="col-span-2 font-bold rounded-full p-7 bg-coffee hover:bg-coffee" size="lg" variant="secondary" as-child><a href="https://buymeacoffee.com/withmike">☕ Buy Me A Coffee</a></Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
