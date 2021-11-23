<template>
<div class="row infoWrapper">
	<div class="col-sm-6 col-lg-3 col-12 mb-2 mb-lg-0">
		<div class="infoWrapper__item">
			<div class="row">
				<div class="col-4 infoWrapper__icon" @click="fastEnd"><i class="bi bi-bullseye"></i></div>
				<div class="col-8 infoWrapper__content">
					<p>Точность</p>
					<span>{{accurancy}}%</span>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-lg-3 col-12 mb-2 mb-lg-0">
		<div class="infoWrapper__item">
			<div class="row">
				<div class="col-4 infoWrapper__icon"><i class="bi bi-speedometer"></i></div>
				<div class="col-8 infoWrapper__content">
					<p>Скорость</p>
					<span>{{typingSpeed}} зн/мин.</span>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-lg-3 col-12 mb-2 mb-lg-0">
		<div class="infoWrapper__item">
			<div class="row">
				<div class="col-4 infoWrapper__icon"><i class="bi bi-exclamation-circle"></i></div>
				<div class="col-8 infoWrapper__content">
					<p>Ошибки</p>
					<span>{{this.$store.state.errorCounter}}</span>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-6 col-lg-3 col-12 mb-2 mb-lg-0">
		<div class="infoWrapper__item infoWrapper__item--restart" @click="restart">
			<span>Начать заново <i class="bi bi-arrow-clockwise"></i></span>
		</div>
	</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Info',
	computed: {
		...mapGetters(['text', 'errors', 'enteredСharacters', 'currentTime']),
		accurancy() {
			let symbols = this.text.split('').length;
			let accurancy = Math.floor(((symbols - this.errors) / symbols) * 100); 
			return accurancy;
		},
		typingSpeed() {
			let typingSpeed = Math.floor(this.enteredСharacters / (this.currentTime / 60))
			return typingSpeed;
		}
	},
	methods: {
		restart() {
			this.$emit('restart');
		},
		fastEnd() {
			this.$emit('fastEnd');
		}
	},
}
</script>

<style lang="scss">
.infoWrapper {
	& p {
		margin-bottom: 0;
	}
	&__item {
		padding: 3px;
		min-height: 60px;
		font-size: 18px;
		font-weight: 600;
		border-radius: 10px;
		box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
		&--restart {
			cursor: pointer;
			background-color: #b6f3ea;
			box-shadow: none;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: box-shadow .1s linear;
			&:hover {
				box-shadow: 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
			}
			&:active {
				box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
			}
		}
	}
	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
	&__content {
		text-align: center;
	}
}
</style>