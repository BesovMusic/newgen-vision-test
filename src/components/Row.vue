<template>
	<div class="text" :class="{ success: isSuccessRow(), currentRow: isCurrentRow() }">
		<Symbol
			v-for="(textSymbol, index) in rowData"
			:key="index"
			:symbol="textSymbol"
			:symbolIndex="index"
			:rowIndex="this.rowIndex"
		/>
	</div>
</template>

<script>
import Symbol from './Symbol.vue';
export default {
	name: 'Row',
	props: {
		rowData: {
			type: Array,
		},
		rowIndex: {
			type: Number,
		},
	},
	components: {
		Symbol,
	},
	methods: {
		isSuccessRow() {
			return this.$store.state.currentRowIndex > this.rowIndex;
		},
		isCurrentRow() {
			return this.$store.state.currentRowIndex === this.rowIndex;
		}
	},
};
</script>
