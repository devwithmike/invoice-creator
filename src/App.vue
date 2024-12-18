<script setup>
import Navigation from './components/Navigation.vue';
import { Splitpanes, Pane } from 'splitpanes'
import Invoice from './components/Invoice.vue';
import 'splitpanes/dist/splitpanes.css'
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";
import Form from './components/Form.vue';

const printRef = ref();

const { handlePrint } = useVueToPrint({
  content: printRef,
  documentTitle: "invoice",
  removeAfterPrint: true
});

const data = ref({
	senderAddress: '',
	invoiceNumber: '',
	billedTo: '',
	billedToAddress: '',
	invoiceDate: ''
})
const settings = ref({
	filename: 'invoice',
	currency: "South African Rand (ZAR)"
})

</script>

<template>
	<div class="min-h-dvh">
		<Navigation @download-invoice="handlePrint" />
		<splitpanes class="container mx-auto default-theme">
			<pane max-size="50" min-size="35" size="45">
				<Form :data="data" :settings="settings" />
			</pane>
			<pane min-size="50">
				<div ref="printRef">
					<Invoice :data="data" :settings="settings"/>
				</div>
			</pane>
		</splitpanes>
	</div>
</template>

<style>
.splitpanes.default-theme .splitpanes__pane {
	background-color: #fff;
}

.default-theme.splitpanes--vertical>.splitpanes__splitter, .default-theme .splitpanes--vertical>.splitpanes__splitter {
    border-right: 1px solid #eee !important;
	width: 10px !important;
    border-left: 1px solid #eee !important;
    margin-left: -1px !important;
}
</style>
