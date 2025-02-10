<template>
  <div>
    <q-form @submit="createData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.transaction.detailText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <div class="row justify-center">
            <div class="col-md-8 q-pa-md">
              <!-- Details card -->
              <q-card class="q-mb-md">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold">{{ $t('dashboard.transaction.detailCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-md">
                  <div class="row justify-center">
                    <!-- Money Amount -->
                    <div class="col-md-7 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.transaction.data.moneyAmount') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="format.money_amount" @input="updateRupiah('money_amount')" outlined dense required autofocus />
                    </div>

                    <!-- Discount -->
                    <div class="col-md-3 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.transaction.data.discount') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.discount" type="number" outlined dense>
                        <template v-slot:append>
                          <q-icon name="percent" />
                        </template>
                      </q-input>
                    </div>

                    <!-- Notes -->
                    <div class="col-md-10 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.transaction.data.notes') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.notes" type="textarea" outlined dense />
                    </div>
                  </div>
                </q-card-section>
              </q-card>

              <!-- Payment Details card -->
              <q-card class="q-mt-md">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold">{{ $t('dashboard.transaction.paymentDetailsCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-md">
                  <!-- Total Price -->
                  <div class="row q-my-sm">
                    <div class="col-5 text-body1 text-bold">{{ $t('dashboard.transaction.data.totalPrice') }}</div>
                    <div class="col-2">:</div>
                    <div class="col-5">{{ rupiah(data.total_price) }}</div>
                  </div>

                  <!-- Discount -->
                  <div class="row q-my-sm">
                    <div class="col-5 text-body1 text-bold">{{ $t('dashboard.transaction.data.discount') }}</div>
                    <div class="col-2">:</div>
                    <div class="col-5">{{ data.discount + '%' }}</div>
                  </div>

                  <!-- Payment Amount -->
                  <div class="row q-my-md">
                    <div class="col-5 flex items-center text-h6 text-bold">{{ $t('dashboard.transaction.data.paymentAmount') }}</div>
                    <div class="col-2 flex items-center">:</div>
                    <div class="col-5">
                      <div class="bg-blue-2 rounded-borders">
                        <div class="text-blue-8 text-h5 text-bold text-center q-pa-sm">{{ rupiah(data.payment_amount) }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Change Amount -->
                  <div class="row q-my-md">
                    <div class="col-5 flex items-center text-h6 text-bold">{{ $t('dashboard.transaction.data.changeAmount') }}</div>
                    <div class="col-2 flex items-center">:</div>
                    <div class="col-5">
                      <div class="bg-green-2 rounded-borders">
                        <div class="text-green-8 text-h5 text-bold text-center q-pa-sm">{{ rupiah(data.change_amount) }}</div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-md-3 q-pa-md">
              <!-- Note card -->
              <q-card class="q-pb-xl" style="height: 100%">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold">{{ $t('dashboard.transaction.noteCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section id="print-section" class="q-pa-md">
                  <!-- About -->
                  <div class="row justify-center">
                    <img :src="url + '/settings/' + setting.logo" :style="'width:' + setting.logo_size + 'px'" />
                  </div>
                  <div class="text-h6 text-center text-bold">{{ setting.title }}</div>
                  <div class="text-body2 text-center">{{ setting.address }}</div>

                  <q-separator class="q-my-md" />

                  <!-- Customer -->
                  <q-list dense>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.name') }}</q-item-section>
                      <q-item-section side>{{ data.name }}</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.paymentType') }}</q-item-section>
                      <q-item-section side>{{ data.payment_type }}</q-item-section>
                    </q-item>
                  </q-list>

                  <q-separator class="q-my-md" />

                  <!-- Product -->
                  <q-list dense>
                    <q-item v-for="detail in data.transactiondetails" :key="detail.id" class="column">
                      <q-item-section class="text-bold">{{ detail.name }}</q-item-section>
                      <div class="row">
                        <div class="col text-grey text-left">{{ rupiah(detail.purchase_price) }}</div>
                        <div class="col text-grey text-center">x{{ detail.quantity }}</div>
                        <div class="col text-grey text-right">{{ rupiah(detail.total_price) }}</div>
                      </div>
                    </q-item>
                  </q-list>

                  <q-separator class="q-my-md" />

                  <!-- Pricing -->
                  <q-list dense>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.totalPrice') }}</q-item-section>
                      <q-item-section side>{{ rupiah(data.total_price) }}</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.discount') }}</q-item-section>
                      <q-item-section side>{{ data.discount }}%</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.paymentAmount') }}</q-item-section>
                      <q-item-section side>{{ rupiah(data.payment_amount) }}</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.moneyAmount') }}</q-item-section>
                      <q-item-section side>{{ rupiah(data.money_amount) }}</q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>{{ t('dashboard.transaction.data.changeAmount') }}</q-item-section>
                      <q-item-section side>{{ rupiah(data.change_amount) }}</q-item-section>
                    </q-item>
                  </q-list>

                  <q-separator class="q-my-md" />

                  <div class="text-center text-caption text-grey">{{ t('dashboard.transaction.thankYouMsg') }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" :label="t('public.cancelText')" flat v-close-popup />
          <q-btn type="submit" color="primary" :label="t('dashboard.transaction.printNotaBtn')" :loading="loading" :disable="disabledButton" no-caps>
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useSettingStore } from '/src/stores/setting-store'
import { useTransactionStore } from '/src/stores/transaction-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['created'])
const data = ref({
  name: item.name,
  payment_type: item.payment_type,
  total_price: item.total_price,
  discount: 0,
  payment_amount: 0,
  money_amount: 0,
  change_amount: 0,
  notes: '',
  transactiondetails: item.transactiondetails
})

// Get Setting
const setting = ref({})
const getSetting = async () => {
  try {
    const res = await useSettingStore().show(1)

    setting.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getSetting()
})

// Payment Amount
const calculatePaymentAmount = () => {
  const discountValue = (data.value.discount / 100) * data.value.total_price
  data.value.payment_amount = data.value.total_price - discountValue
}

// Change Amount
const calculateChangeAmount = () => {
  data.value.change_amount = data.value.money_amount - data.value.payment_amount
}

watch(() => data.value.discount, calculatePaymentAmount)
watch(() => data.value.payment_amount, calculateChangeAmount)
watch(
  () => data.value.money_amount,
  () => {
    calculatePaymentAmount()
    calculateChangeAmount()
  }
)

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.money_amount)

// Edit
const createData = async () => {
  loading.value = true
  try {
    await useTransactionStore().create(data.value)

    toast.success(t('dashboard.transaction.successCreateMsg'))
    emits('created')
    printReceipt()
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.transaction.failedCreateMsg'))
  }
  loading.value = false
}

// Format Input
const format = ref({
  money_amount: computed({
    get() {
      return rupiah(data.value.money_amount)
    },
    set(value) {
      const numericValue = value.replace(/[^\d]/g, '')
      data.value.money_amount = parseInt(numericValue, 10) || 0
    }
  })
})
const updateRupiah = (field) => {
  format.value[field] = rupiah(data.value[field])
}

// Print
const printReceipt = () => {
  const receiptContent = document.getElementById('print-section').innerHTML
  const printWindow = window.open('', '', 'width=80mm,height=auto')

  printWindow.document.write(`
  <html>
    <head>
      <title>Print Receipt</title>
      <link href="https://cdn.jsdelivr.net/npm/quasar@latest/dist/quasar.min.css" rel="stylesheet">
      <style>
        @page { size: 80mm auto; margin: 0; }
        body { margin: 0; font-family: Arial, sans-serif; }
        .receipt-print { width: 80mm; padding: 10px; }
      </style>
    </head>
    <body>
      ${receiptContent}
    </body>
  </html>
`)

  printWindow.document.close()
  printWindow.onload = () => {
    printWindow.print()
  }
}
</script>
