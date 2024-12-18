<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
</script>

<template>
	<div class="border-b">
		<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex items-center flex-shrink-0">
						<span class="text-2xl">🧾</span>
						<span class="ml-2 text-lg font-semibold">Invoice Creator</span>
					</div>
				</div>
				<div class="flex items-center">
					<div class="flex items-center gap-6">
						<button type="button" @click="$emit('downloadInvoice')"
							class="relative inline-flex items-center gap-x-1.5 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800">
							Download Invoice
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
