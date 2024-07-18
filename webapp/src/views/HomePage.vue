<template>
    <div>
        <InputSearch />
        <ItemList />
    </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue';
import InputSearch from '@/components/InputSearch.vue';
export default {
    name: 'HomePage',
    components: {
        ItemList,
        InputSearch
    }
}
</script>

<style scoped>
</style>