<template>
    <div class="container">
        <div class="text">
            <span class="text__item" v-for="(symbol, index) in splitedText" :key="index">{{ symbol }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    computed: {
        splitedText() {
            let splitedText = this.$store.state.text.split("");
            return splitedText;
        },
    },
    mounted() {
        this.$store.dispatch("GET_TEXT_FROM_API");
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
</style>
