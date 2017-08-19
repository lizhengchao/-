<template>
    <div>
        <div class="search-bar-container">
            <div class="search-input-container">
                <img src="../../assets/search2.png" class="search-img">
                <input class="search-input" type="text" v-model="searchText">
            </div>
            <div class="cancel-btn" @click="cancel">取消</div>
        </div>
        <div class="result-contianer">{{searchText}}</div>
    </div>
</template>

<script>
    export default {
        name: 'newsSearch',
        data () {
            return {
                searchText: ''
            }
        },
        components: {
        },
        methods: {
            cancel () {
                this.$router.goBack();
            }
        }
    }
</script>

<style scoped>
    .search-bar-container {
        padding: 10px;
        display: flex;
        height: 30px;
    }

    .search-input-container {
        flex-grow: 1;
        background-color: #eee;
        border-radius: 5px;
        height: 100%;
        display: flex;
    }

    .search-img {
        width: 27px;
        height: 100%;
        display: inline-block;
    }

    .search-input {
        background-color: #eee;
        height: 100%;
        flex-grow: 1;
    }

    .cancel-btn {
        width: 55px;
        line-height: 30px;
        background-color: white;
        text-align: center;
    }

    .result-contianer {
        height: 500px;
        background-color: white;
    }
</style>