<template>
	<span
		class="text__item"
		:class="{
			current: isCurrent(),
			wrong: hasWrongClass(),
			success: isSuccess(),
		}"
	>
		{{ symbol }}
	</span>
</template>

<script>
export default {
	name: 'Symbol',
	props: {
		symbol: {
			type: String,
		},
		symbolIndex: {
			type: Number,
		},
		rowIndex: {
			type: Number,
		},
	},
	methods: {
		isCurrent() {
			return this.$store.state.currentRowIndex === this.rowIndex &&
				this.$store.state.currentSymbolIndex == this.symbolIndex;
		},
		isSuccess() {
			return this.$store.state.currentRowIndex === this.rowIndex &&
				this.$store.state.currentSymbolIndex > this.symbolIndex;
		},
		hasWrongClass() {
			return this.isCurrent() && this.$store.state.isWrong;
		},
	},
};
</script>
