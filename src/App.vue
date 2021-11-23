<template>
	<div class="page">
		<div class="container" >
			<transition name="fade" mode="out-in">
				<div class="contentWrapper shadow" v-if="!gameStarted">
					<div class="startScreen">
						<h1 style="font-weight: bold;">Тренажер слепой печати</h1>
						<p>Перед началом игры, не забудте поменять раскладку клавиатуры на <b>ENG</b></p>
						<button class="btn btn-success btn-lg" @click="startGame">Начать печатать</button>
					</div>
				</div>
				<div class="contentWrapper shadow" v-else>
					<div class="gameScreen">
						<h2 class="endgameTitle" v-show="gameEnded">Ваш результат:</h2>
						<Info @restart="restart" @fastEnd="fastEnd"/>
						<div class="textWrapper" v-show="!gameEnded">
							<Row
								v-for="(row, index) in rows"
								:key="index"
								:rowData="row"
								:rowIndex="index"
							/>
						</div>
						
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { GET_TEXT } from './store/index';
import { mapGetters } from 'vuex';
import Row from './components/Row.vue';
import Info from './components/Info.vue';

export default {
	name: 'App',
	components: {
		Row,
		Info
	},
	data() {
		return {
			gameStarted: false,
			gameEnded: false,
			interval: null,
		}
	},
	computed: {
		...mapGetters(['text', 'currentSymbolIndex', 'currentRowIndex']),
		rows() {
			let rows = this.text.split('  ');
			return rows.map((row) => {
				const rowData = row.split('');
				return rowData;
			});
		},
		currentSymbol() {
			return this.currentRow[this.currentSymbolIndex];
		},
		currentRow() {
			return this.rows[this.currentRowIndex];
		},
	},
	methods: {
		buttonPressCallback({ key }) {
			if (key === 'Shift') {
				return;
			}
			if (!(key === this.currentSymbol)) {
				this.$store.state.isWrong = true;
				this.$store.state.errorCounter++
				return;
			}
			this.$store.state.currentSymbolIndex++;
			this.$store.state.isWrong = false;
			this.$store.state.enteredСharacters++
			if (
				this.$store.state.currentSymbolIndex ===
				this.currentRow.length
			) {
				this.endgameCallback();
			}
			if (
				this.$store.state.currentRowIndex === this.rows.length &&
				this.$store.state.currentSymbolIndex === 0
			) {
				this.game = false;
				this.stopGame();
			}
		},
		endgameCallback(isRestore = false) {
			this.$store.state.currentRowIndex = isRestore
				? 0
				: this.$store.state.currentRowIndex + 1;
			this.$store.state.currentSymbolIndex = 0;
		},
		restart() {
			this.$store.dispatch(GET_TEXT);
			this.endgameCallback(true);
			this.$store.state.errorCounter = 0;
			this.$store.state.isWrong = false;
			this.$store.state.enteredСharacters = 0;
			this.gameEnded = false;
			this.startGame();
		},
		fastEnd() {
			this.$store.state.currentRowIndex = this.rows.length - 1;
			this.$store.state.currentSymbolIndex = this.currentRow.length -1;
		},
		startGame() {
			this.$store.state.currentTime = 0;
			this.interval = setInterval(this.tick, 1000);
			document.addEventListener('keyup', this.buttonPressCallback);
			this.gameStarted = true;
		},
		stopGame() {
			clearInterval(this.interval);
			document.removeEventListener('keyup', this.buttonPressCallback);
			this.gameEnded = true;
		},
		tick() {
			this.$store.state.currentTime++
		},
	},
	created() {
		this.$store.dispatch(GET_TEXT);
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css");


.fade-enter-active, .fade-leave-active {
  transition: opacity .6s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.page {
	padding-top: 10vh;
	padding-bottom: 10vh;
	background-color: #e8ebff;
	min-height: 100vh;
}
.contentWrapper {
	border-radius: 10px;
	padding: 20px;
	width: 80%;
	margin: 0 auto;
	background-color: #fff;
}
.endgameTitle {
	padding-bottom: 5px;
	font-weight: bold;
}
.textWrapper {
	margin-top: 20px;
}
.text {
	padding: 2px;
	font-size: 18px;
	font-family: 'Roboto Mono', monospace;
	opacity: 0.5;
	border-radius: 10px;
	transition: opacity .2s ease-in-out, background .2s ease-in-out, transform .2s ease-in-out;
	transform: scale(0.95);
}
.text__item {
	border-radius: 4px;
}
.currentRow {
	box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
	opacity: 1;
	background: #e8ebff;
	transform: scale(1);
}
.current {
	background: #5bc538;
	color: white;
	padding: 0 3px;
}
.wrong {
	background: red;
	color: white;
}
.success {
	color: #5bc538;
}
</style>
