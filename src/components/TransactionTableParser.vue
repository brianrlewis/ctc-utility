<template>
  <div :class="$style.wrapper">
    <div :class="$style.input">
      <h5 class="q-ma-none">Raw Input</h5>
      <q-input
        v-model.trim="text"
        type="textarea"
        outlined
        @focus="input => input.target.select()"
      />
    </div>
    <div :class="$style.output">
      <div class="flex justify-between q-pb-xs">
        <h5 class="q-ma-none">
          Transaction Amounts ({{ transactions.length }})
        </h5>
        <div>
          <q-btn color="grey-2" text-color="black" @click="reverse">
            Reverse
          </q-btn>
        </div>
      </div>
      <q-input v-model="transactionAmounts" type="textarea" outlined />
      <div class="q-mt-sm">
        <q-input
          outlined
          :model-value="total"
          label="Total"
          @focus="input => input.target.select()"
        />
      </div>
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

    const total = computed(() =>
      transactions.value
        .reduce((sum, { amount }) => sum + Number(amount), 0)
        .toFixed(4),
    );

    watch(text, val => {
      transactions.value = parseTransactions(val);
    });

    const reverse = () => {
      transactions.value = transactions.value.slice(0).reverse();
    };

    if (process.env.DEV) {
      text.value = getTestInput();
    }

    return { text, transactions, transactionAmounts, total, reverse };
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
    height: calc(100vh - 450px);
  }
}
</style>
