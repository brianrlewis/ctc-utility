<template>
  <div :class="$style.wrapper">
    <div :class="$style.input">
      <h5 class="q-ma-none">Raw Input</h5>
      <q-input v-model.trim="text" type="textarea" outlined />
    </div>
    <div :class="$style.output">
      <h5 class="q-ma-none">Transaction Amounts ({{ transactions.length }})</h5>
      <q-input v-model="transactionAmounts" type="textarea" outlined />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { parseTransactions } from '../util/transaction-parser';

const getTestInput = () => {
  try {
    return require('../util/test-input').testInput;
  } catch (e) {
    return '';
  }
};

export default defineComponent({
  name: 'TransactionTableParser',
  setup() {
    const transactions = ref([]);
    const text = ref('');
    const transactionAmounts = computed(() =>
      transactions.value.map(({ amount }) => amount).join('\n'),
    );

    watch(text, val => {
      transactions.value = parseTransactions(val);
    });

    if (process.env.DEV) {
      text.value = getTestInput();
    }

    return { text, transactions, transactionAmounts };
  },
});
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-columns: [col] auto;
  grid-template-rows: [row] 200px [row] auto;

  > div {
    margin: 10px;
  }
}
.output {
  textarea {
    height: calc(100vh - 350px);
  }
}
</style>
