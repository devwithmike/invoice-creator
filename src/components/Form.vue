<script setup>
import { useInvoiceStore } from '@/stores/invoice';

const invoice = useInvoiceStore()

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Trash2, Plus, Image } from 'lucide-vue-next'

import DatePicker from '@/components/DatePicker.vue';
import Select from '@/components/Select.vue';

const currencies = [
  { value: 'ZAR', label: 'South African Rand - ZAR' },
  { value: 'USD', label: 'United States Dollar - USD' },
]

function logoChange(e) {
	let file = e.target.files[0]
	invoice.logoURL = URL.createObjectURL(file)
}

function removeLogo() {
	const file = document.getElementById('logoFile')
	file.value = ''
	invoice.logoURL = null
}

</script>

<template>
	<div class="py-5 pl-6 pr-6 mx-auto xl:pl-24 mx-w-40">
		<Accordion type="multiple" collapsible :default-value="['settings']">
			<AccordionItem value="settings">
				<AccordionTrigger>Settings</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div>
							<label for="currency" class="block text-sm leading-6 text-gray-900">Currency</label>
							<div class="mt-2">
								<Select v-model="invoice.currency" :currencies="currencies" />
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="info">
				<AccordionTrigger>Information</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div>
							<label for="invoice-number" class="block text-sm leading-6 text-gray-900">Invoice
								Number</label>
							<div class="mt-2">
								<input type="text" name="invoice-number" id="invoice-number"
									v-model="invoice.invoiceNumber"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
						</div>
						<div>
							<label for="invoice-number" class="block text-sm leading-6 text-gray-900">Invoice
								Date</label>
							<div class="mt-2">
								<DatePicker v-model="invoice.invoiceDate" />
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="branding">
				<AccordionTrigger>Branding</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div class="flex items-center gap-2 group">
							<Checkbox v-model:checked="invoice.showLogo" id="logo" />
							<label for="logo" class="block text-sm leading-6 text-gray-900"><span
									class="hidden mr-2 text-xs text-gray-400 transition-all group-hover:inline">(Show/Hide
									Logo)</span>Company
								Logo</label>
						</div>
						<div class="flex items-center gap-5">
							<div
								class="flex items-center w-24 h-20 mt-2 border border-dashed rounded-lg border-gray-900/25">
								<Image v-if="!invoice.logoURL" class="w-12 h-12 mx-auto text-gray-300" aria-hidden="true" />
								<img v-else :src="invoice.logoURL" class="w-12 h-12 mx-auto" />
							</div>
							<label for="logoFile" class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Change Logo</label>
							<input id="logoFile" type="file" @change="logoChange" class="hidden" />
							<Button v-if="invoice.logoURL" variant="destructive" @click="removeLogo">Remove Logo</Button>
						</div>
						<div>
							<div class="flex items-center gap-2 group">
								<Checkbox v-model:checked="invoice.showBrand" id="invoice-brand" />
								<label for="invoice-brand" class="block text-sm leading-6 text-gray-900"><span
										class="hidden mr-2 text-xs text-gray-400 transition-all group-hover:inline">(Show/Hide
										Brand)</span>Company
									Name</label>
							</div>
							<div class="mt-2">
								<input type="text" v-model="invoice.invoiceBrand"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="sender">
				<AccordionTrigger>Sender Information</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div>
							<label for="about" class="block text-sm font-medium leading-6 text-gray-900">Sender
								Address</label>
							<div class="mt-2">
								<textarea id="about" name="about" rows="5" v-model="invoice.senderAddress"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
							<p class="mt-3 text-sm leading-6 text-gray-600">Press <kbd
									class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
								in order to seperate address into seperate lines</p>
						</div>
						<div>
							<label for="vat-number" class="block text-sm font-medium leading-6 text-gray-900">VAT
								Number</label>
							<div class="mt-2">
								<input type="text" name="vat-number" id="vat-number" v-model="invoice.vatNumber"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="receiver">
				<AccordionTrigger>Reciever Information</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div>
							<label for="billed-to" class="block text-sm font-medium leading-6 text-gray-900">Billed
								To</label>
							<div class="mt-2">
								<input type="text" name="billed-to" id="billed-to" v-model="invoice.billedTo"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
						</div>
						<div>
							<label for="about" class="block text-sm font-medium leading-6 text-gray-900">Billed To
								Address</label>
							<div class="mt-2">
								<textarea id="about" name="about" rows="5" v-model="invoice.billedToAddress"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
							<p class="mt-3 text-sm leading-6 text-gray-600">Press <kbd
									class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
								in order to seperate address into seperate lines</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="items">
				<AccordionTrigger>Items</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div v-for="(item, index) in invoice.items">
							<div class="flex items-center gap-5">
								<div class="grid flex-1 grid-cols-2 gap-3">
									<div class="col-span-2">
										<label for="item-name" class="block text-sm leading-6 text-gray-900">Item
											Name</label>
										<div class="mt-2">
											<input type="text" name="item-name" id="item-name" v-model="item.item"
												class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
										</div>
									</div>
									<div class="col-span-1">
										<label for="item-qty" class="block text-sm leading-6 text-gray-900">Item
											Quanity</label>
										<div class="mt-2">
											<input type="number" name="item-qty" id="item-qty" v-model="item.quanity"
												class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
										</div>
									</div>
									<div class="col-span-1">
										<label for="item-rate" class="block text-sm leading-6 text-gray-900">Item
											Rate</label>
										<div class="mt-2">
											<input type="text" name="item-rate" id="item-rate" v-model="item.rate"
												class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
										</div>
									</div>
								</div>
								<Button variant="outline" size="icon" @click="invoice.removeItem(index)">
									<Trash2 class="w-4 h-4" />
								</Button>
							</div>
							<Separator class="mt-4" v-show="index != invoice.items.length - 1" />
						</div>
						<Separator class="my-2" />
						<Button variant="outline" @click="invoice.addItem">
							<Plus class="w-4 h-4" /> Add Item
						</Button>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="additions">
				<AccordionTrigger>Additions</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-4 mb-4">
						<div>
							<div class="flex items-center gap-2 group">
								<Checkbox v-model:checked="invoice.showFirstAddition" id="addition-1" />
								<label for="addition-1" class="block text-sm leading-6 text-gray-900"><span
										class="hidden mr-2 text-xs text-gray-400 transition-all group-hover:inline">(Show/Hide
										First Addition)</span>First Addition</label>
							</div>
							<div class="mt-2">
								<textarea rows="5" v-model="invoice.firstAddition"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
							<p class="mt-3 text-sm leading-6 text-gray-600">Press <kbd
									class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
								in order to seperate address into seperate lines</p>
						</div>
						<div>
							<div class="flex items-center gap-2 group">
								<Checkbox v-model:checked="invoice.showSecondAddition" id="addition-2" />
								<label for="addition-2" class="block text-sm leading-6 text-gray-900"><span
										class="hidden mr-2 text-xs text-gray-400 transition-all group-hover:inline">(Show/Hide
										Second Addition)</span>Second Addition</label>
							</div>
							<div class="mt-2">
								<textarea id="addition-2" name="addition-2" rows="5" v-model="invoice.secondAddition"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
							</div>
							<p class="mt-3 text-sm leading-6 text-gray-600">Press <kbd
									class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
								in order to seperate address into seperate lines</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
</template>
