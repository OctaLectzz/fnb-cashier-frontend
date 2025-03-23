<template>
  <div>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center q-py-sm">
        <div class="text-h6">{{ $t('dashboard.main.transaction.detailText') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll" style="height: 77vh">
        <div class="row justify-center">
          <div class="col-lg-8 col-sm-7 col-xs-12 q-pa-md">
            <!-- Details card -->
            <q-card class="q-mb-md">
              <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                <div class="text-body1 text-bold">{{ $t('dashboard.main.transaction.detailCard') }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section class="q-pa-md">
                <!-- Transaction Details -->
                <div class="text-body1 text-bold">{{ $t('dashboard.main.transaction.data.transactiondetails') }}</div>
                <div class="row">
                  <div v-for="(item, index) in data.transactiondetails" :key="index" class="col-sm-6 col-xs-12 q-pa-xs">
                    <q-card :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" class="q-my-xs" style="border-radius: 8px" flat>
                      <q-card-section class="q-pa-sm" horizontal>
                        <!-- Image -->
                        <img :src="url + '/products/' + item.product_image" class="col-3" style="width: 60px; height: 60px; border-radius: 5px" />

                        <q-card-section class="q-px-sm q-py-xs" style="line-height: 15px">
                          <!-- Name -->
                          <div class="text-body2">{{ item.product_name }} x {{ item.quantity }}</div>

                          <!-- Price -->
                          <div class="text-caption">{{ rupiah(item.total_price) }}</div>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Payment Details card -->
            <q-card class="q-mt-md">
              <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                <div class="text-body1 text-bold">{{ $t('dashboard.main.transaction.paymentDetailsCard') }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section class="q-pa-md">
                <!-- Total Price -->
                <div class="row q-my-sm">
                  <div class="col-5 text-body1 text-bold">{{ $t('dashboard.main.transaction.data.totalPrice') }}</div>
                  <div class="col-2">:</div>
                  <div class="col-5">{{ rupiah(data.total_price) }}</div>
                </div>

                <!-- Discount -->
                <div class="row q-my-sm">
                  <div class="col-5 text-body1 text-bold">{{ $t('dashboard.main.transaction.data.discount') }}</div>
                  <div class="col-2">:</div>
                  <div class="col-5">{{ data.discount + '%' }}</div>
                </div>

                <!-- Payment Amount -->
                <div class="row q-my-md">
                  <div class="col-5 flex items-center text-h6 text-bold">{{ $t('dashboard.main.transaction.data.paymentAmount') }}</div>
                  <div class="col-2 flex items-center">:</div>
                  <div class="col-5">
                    <div class="rounded-borders" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
                      <div class="text-h5 text-bold text-center q-pa-sm" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ rupiah(data.payment_amount) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Change Amount -->
                <div class="row q-my-md">
                  <div class="col-5 flex items-center text-h6 text-bold">{{ $t('dashboard.main.transaction.data.changeAmount') }}</div>
                  <div class="col-2 flex items-center">:</div>
                  <div class="col-5">
                    <div class="rounded-borders" :class="$q.dark.isActive ? 'bg-green-10' : 'bg-green-2'">
                      <div class="text-h5 text-bold text-center q-pa-sm" :class="$q.dark.isActive ? 'text-green-2' : 'text-green-8'">{{ rupiah(data.change_amount) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Notes -->
                <div class="row q-my-md">
                  <div class="col-5 text-text-body1 text-bold">{{ $t('dashboard.main.transaction.data.notes') }}</div>
                  <div class="col-2">:</div>
                  <div class="col-5">{{ data.notes ?? '-' }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-lg-3 col-sm-4 col-xs-12 q-pa-md">
            <!-- Note card -->
            <q-card class="q-pb-xl" style="height: 100%">
              <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                <div class="text-body1 text-bold">{{ $t('dashboard.main.transaction.noteCard') }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section id="print-section" class="q-pa-md">
                <!-- About -->
                <div class="text-h6 text-center text-bold">{{ branch.name }}</div>
                <div class="text-body2 text-center">{{ branch.address }}</div>

                <q-separator class="q-my-md" />

                <!-- Customer -->
                <q-list dense>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.invoice') }}</q-item-section>
                    <q-item-section class="text-subtitle2" side>{{ data.invoice }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.createdAt') }}</q-item-section>
                    <q-item-section class="text-subtitle2" side>{{ data.created_at }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.name') }}</q-item-section>
                    <q-item-section side>{{ data.name }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.paymentType') }}</q-item-section>
                    <q-item-section side>{{ data.payment_type }}</q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <!-- Product -->
                <q-list dense>
                  <q-item v-for="detail in data.transactiondetails" :key="detail.id" class="column">
                    <q-item-section class="text-bold">{{ detail.product_name }}</q-item-section>
                    <div class="row">
                      <div class="col text-grey text-left">{{ rupiah(detail.product_price) }} x {{ detail.quantity }}</div>
                      <div class="col text-grey text-right">{{ rupiah(detail.total_price) }}</div>
                    </div>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <!-- Pricing -->
                <q-list dense>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.totalPrice') }}</q-item-section>
                    <q-item-section side>{{ rupiah(data.total_price) }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.discount') }}</q-item-section>
                    <q-item-section side>{{ data.discount }}%</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.paymentAmount') }}</q-item-section>
                    <q-item-section side>{{ rupiah(data.payment_amount) }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.moneyAmount') }}</q-item-section>
                    <q-item-section side>{{ rupiah(data.money_amount) }}</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>{{ t('dashboard.main.transaction.data.changeAmount') }}</q-item-section>
                    <q-item-section side>{{ rupiah(data.change_amount) }}</q-item-section>
                  </q-item>
                </q-list>

                <q-separator class="q-my-md" />

                <div class="text-center text-caption text-grey">{{ t('dashboard.main.transaction.thankYouMsg') }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary">
        <q-btn color="primary" :label="t('public.cancelText')" flat v-close-popup />
        <q-btn color="primary" :label="t('dashboard.main.transaction.printNotaBtn')" @click="printReceipt" no-caps>
          <template v-slot:loading>
            <q-spinner-gears />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { url, currentbranch } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useBranchStore } from '/src/stores/main/branch-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const data = ref({
  invoice: item.invoice,
  name: item.name,
  payment_type: item.payment_type,
  total_price: item.total_price,
  discount: item.discount,
  payment_amount: item.payment_amount,
  money_amount: item.money_amount,
  change_amount: item.change_amount,
  notes: item.notes,
  created_at: item.created_at,
  transactiondetails: item.transactiondetails
})

// Get Branch
const branch = ref({})
const getBranch = async () => {
  try {
    const res = await useBranchStore().show(currentbranch)

    branch.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getBranch()
})

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
