<script setup>
import { useInvoiceStore } from '@/stores/invoice';
import { currency } from '@/lib/utils';
import { Image } from 'lucide-vue-next'

const invoice = useInvoiceStore()

</script>

<template>
	<div class="max-w-[85rem] mx-auto my-4">
		<div class="mx-auto sm:w-11/12 lg:w-9/12">
			<div class="flex flex-col p-4 bg-white sm:py-10 rounded-xl">
				<div class="flex justify-between">
					<div>
						<div v-if="invoice.showLogo">
							<Image v-if="!invoice.logoURL" class="text-gray-800 w-14 h-14" aria-hidden="true" />
							<img v-else :src="invoice.logoURL" class="w-14 h-14" />
						</div>

						<h1 v-if="invoice.showBrand" class="mt-2 text-lg font-semibold text-gray-800 md:text-xl">{{
							invoice.invoiceBrand }}</h1>
					</div>

					<div class="text-end">
						<h2 class="text-2xl font-semibold text-gray-800 md:text-3xl">Invoice #</h2>
						<span class="block mt-1 text-gray-500">{{ invoice.invoiceNumber }}</span>

						<address class="mt-4 not-italic text-gray-800 whitespace-pre-line">
							{{ invoice.senderAddress }}
						</address>
						<br>
						<dl class="grid sm:grid-cols-5 gap-x-2">
							<dt class="col-span-3 font-semibold text-gray-800">VAT number:</dt>
							<dd class="col-span-2 text-gray-500">{{ invoice.vatNumber }}</dd>
						</dl>
						<br>
						<dl class="grid sm:grid-cols-5 gap-x-2">
							<dt class="col-span-3 font-semibold text-gray-800">Invoice date:</dt>
							<dd class="col-span-2 text-gray-500">{{ invoice.invoiceDate }}</dd>
						</dl>
					</div>
				</div>

				<div class="grid gap-3 mt-8 sm:grid-cols-2">
					<div>
						<h3 class="text-lg font-semibold text-gray-800">Bill to:</h3>
						<h3 class="text-lg font-semibold text-gray-800">{{ invoice.billedTo }}</h3>
						<address class="mt-2 not-italic text-gray-500 whitespace-pre-line">
							{{ invoice.billedToAddress }}
						</address>
					</div>
				</div>

				<div class="mt-6">
					<div class="p-4 space-y-4 border border-gray-200 rounded-lg">
						<div class="hidden sm:grid sm:grid-cols-5">
							<div class="text-xs font-medium text-gray-500 uppercase sm:col-span-2">Item
							</div>
							<div class="text-xs font-medium text-gray-500 uppercase text-start">Qty</div>
							<div class="text-xs font-medium text-gray-500 uppercase text-start">Rate</div>
							<div class="text-xs font-medium text-gray-500 uppercase text-end">Amount</div>
						</div>

						<div class="hidden border-b border-gray-200 sm:block"></div>

						<div v-for="item in invoice.items">
							<div class="grid grid-cols-3 gap-2 sm:grid-cols-5">
								<div class="col-span-full sm:col-span-2">
									<h5 class="text-xs font-medium text-gray-500 uppercase sm:hidden">Item</h5>
									<p class="font-medium text-gray-800">{{ item.item }}</p>
								</div>
								<div>
									<h5 class="text-xs font-medium text-gray-500 uppercase sm:hidden">Qty</h5>
									<p class="text-gray-800">{{ item.quanity }}</p>
								</div>
								<div>
									<h5 class="text-xs font-medium text-gray-500 uppercase sm:hidden">Rate</h5>
									<p class="text-gray-800">{{ currency(item.rate, invoice.currency) }}</p>
								</div>
								<div>
									<h5 class="text-xs font-medium text-gray-500 uppercase sm:hidden">Amount
									</h5>
									<p class="text-gray-800 sm:text-end">{{ currency(item.quanity * item.rate, invoice.currency) }}</p>
								</div>
							</div>
	
							<div class="border-b border-gray-200 sm:hidden"></div>
						</div>
					</div>
				</div>

				<div class="flex mt-8 sm:justify-end">
					<div class="w-full max-w-2xl space-y-2 sm:text-end">
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
							<dl class="grid sm:grid-cols-5 gap-x-2">
								<dt class="col-span-4 font-semibold text-gray-800">Total:</dt>
								<dd class="col-span-1 mr-4 text-gray-500">{{ currency(invoice.total, invoice.currency) }}</dd>
							</dl>
						</div>
					</div>
				</div>

				<div class="mt-8 sm:mt-12">
					<h4 v-if="invoice.showFirstAddition" class="text-lg font-semibold text-gray-800 whitespace-pre-line">{{ invoice.firstAddition }}</h4>
					<p v-if="invoice.showSecondAddition" class="text-gray-500 whitespace-pre-line">{{ invoice.secondAddition }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
