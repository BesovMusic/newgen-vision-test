<template>
    <div class="container">
        <div class="text">
            <span class="text__item" v-for="(symbol, index) in splitedText" :key="index" :class="{ current: currentSymbol == index }">{{ symbol }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            currentSymbol: 0,
        };
    },
    computed: {
        splitedText() {
            let splitedText = this.$store.state.text.split("");
            return splitedText;
        },
    },
    methods: {
        buttonPressed(e) {
            let currentSpan = document.querySelectorAll(".text__item");
            if (currentSpan[this.currentSymbol].innerText == "") {
                this.currentSymbol++;
            } else {
                if (e.key == currentSpan[this.currentSymbol].innerText) {
                    this.currentSymbol++;
                } else {
                    currentSpan[this.currentSymbol].classList.add("wrong");
                }
            }
        },
    },
    mounted() {
        this.$store.dispatch("GET_TEXT_FROM_API");
        document.addEventListener("keyup", this.buttonPressed);
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.text {
    font-size: 18px;
    font-family: monospace;
}
.current {
    background: green;
    color: white;
}
.wrong {
    background: red;
    color: white;
}
.success {
    color: green;
}
</style>
