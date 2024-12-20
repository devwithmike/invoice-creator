import { defineStore } from 'pinia'
import {
	today,
	getLocalTimeZone,
  } from '@internationalized/date'

export const useInvoiceStore = defineStore('invoice', {
	state: () => ({ 
		invoiceNumber: 3682303,
		invoiceDate: today(getLocalTimeZone()),
		showLogo: true,
		showBrand: true,
		invoiceBrand: "Company Name",
		senderAddress: "88 Sapphire St,\nFarrarmere,\nBenoni,\n1501",
		senderVATNumber: "4999999999",
		showSenderVATNumber: true,
		receiverVATNumber: "5999999999",
		showReceiverVATNumber: true,
		billedTo: "Sara Williams",
		billedToAddress: "85 Sapphire St,\nFarrarmere,\nBenoni,\n1501",
		firstAddition: "Thank you!",
		showFirstAddition: true,
		secondAddition: "If you have any questions concerning this invoice, use the following contact information:\n\nexample@site.com\n+27 (011) 111-1111",
		showSecondAddition: true,
		currency: "ZAR",
		logoURL: null,
		items: [
			{
				item: "Design UX and UI",
				quanity: 1,
				rate: 500
			},
			{
				item: "Web project",
				quanity: 1,
				rate: 1250
			},
			{
				item: "SEO",
				quanity: 2,
				rate: 500
			}
		]
	}),
	getters: {
		total: (state) => state.items.reduce((accumulator, currentValue) => {
			return accumulator + (currentValue.quanity * currentValue.rate)
		}, 0)
	},
	actions: {
		addItem() {
			this.items.push({
				item: "",
				quanity: 0,
				rate: 0
			})
		},
		removeItem(index) {
			this.items = this.items.slice(0, index).concat(this.items.slice(index + 1))
		}
	}
})
