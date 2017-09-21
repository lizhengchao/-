<template>
    <div>
        <pulldown>
            <div class="outer-container"></div>
        </pulldown>
    </div>
</template>

<script>
    import pulldown from 'components/pulldown.vue'
    export default {
        name: 'contact',
        components: {
            pulldown
        }
    }
</script>

<style scoped>
    .outer-container {
        min-height: 500px;
        background-color: green;
    }
</style>