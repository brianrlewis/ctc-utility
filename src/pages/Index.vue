<template>
  <q-page class="" :class="$style.page" style="height: 100%">
    <transaction-table-parser />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TransactionTableParser from '../components/TransactionTableParser.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { TransactionTableParser },
});
</script>

<style lang="scss" module>
.page {
  //height: 100%;
  // border: 1px solid red;
}
</style>
