<template>
  <q-page>
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
