<template>
  <div class="row justify-center q-ma-lg">
    <div class="col-md-8 col-xs-12 q-pa-sm">
      <q-card :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'" class="dashboard-card q-pa-md">
        <div class="row justify-center">
          <!-- Name -->
          <div class="col-md-6 col-xs-12 q-pr-md">
            <div class="text-bold">
              {{ $t('dashboard.transaction.data.name') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-input v-model="data.name" :placeholder="$t('dashboard.transaction.data.namePlaceholder')" outlined dense required autofocus />
          </div>

          <!-- Payment Type -->
          <div class="col-md-6 col-xs-12 q-pl-md">
            <div class="text-bold">
              {{ $t('dashboard.transaction.data.paymentType') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-select
              v-model="data.payment_type"
              :options="paymentTypeOptions"
              :placeholder="$t('dashboard.transaction.data.paymentTypePlaceholder')"
              @filter="paymentTypeFilter"
              input-debounce="0"
              use-input
              fill-input
              emit-value
              hide-selected
              outlined
              dense
              required
            />
          </div>
        </div>

        <!-- Checkout Button -->
        <q-btn color="primary" :label="t('dashboard.transaction.checkoutBtn')" :disable="disabledButton" class="full-width q-my-md" @click="detailItemDialog = true" no-caps>
          <q-dialog v-model="detailItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
            <DetailTransaction @created="itemCreated" :item="data" />
          </q-dialog>
        </q-btn>

        <div v-for="item in items" :key="item.id" class="q-my-sm">
          <!-- Category Name -->
          <div class="text-h6 text-bold">{{ item.name }}</div>

          <!-- Products -->
          <div class="row">
            <div v-for="product in item.products" :key="product.id" class="dashboard-card q-pa-sm col-xs-4 col-sm-3 col-md-2 col-lg-2 grid-style-transition" @click="addToCart(product)">
              <q-card :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" class="dashboard-transaction-card q-pa-sm" flat bordered>
                <!-- Image -->
                <q-responsive :ratio="1 / 1" style="width: 100%">
                  <img :src="url + '/products/' + product.image" class="dashboard-transaction-image" />
                </q-responsive>

                <!-- Name -->
                <div class="text-subtitle2 text-bold q-my-xs q-pb-md" style="line-height: 15px">{{ product.name }}</div>

                <!-- Price -->
                <div class="text-caption absolute absolute-bottom-left q-px-sm q-py-xs">{{ rupiah(product.purchase_price) }}</div>
              </q-card>
            </div>

            <!-- Product not available -->
            <div v-if="item.products.length == 0">
              <div class="text-h6 text-grey text-bold">{{ $t('dashboard.transaction.noProductText') }}</div>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div class="col-md-4 col-xs-12 q-pa-sm">
      <q-card :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'" class="dashboard-card q-pa-md">
        <!-- Reset Button -->
        <q-btn color="red" :label="t('dashboard.transaction.resetBtn')" :disable="data.transactiondetails == 0" class="full-width q-my-sm" no-caps @click="resetCart" />

        <!-- Transaction Details -->
        <q-card v-for="(item, index) in data.transactiondetails" :key="index" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'" class="q-my-xs" style="border-radius: 8px" flat>
          <q-card-section class="q-pa-sm" horizontal>
            <!-- Image -->
            <img :src="url + '/products/' + item.image" class="col-3" style="width: 60px; height: 60px; border-radius: 5px" />

            <q-card-section class="q-px-sm q-py-xs" style="line-height: 15px">
              <!-- Name -->
              <div class="text-body2">{{ item.name }}</div>

              <!-- Price -->
              <div class="text-caption">{{ rupiah(item.total_price) }}</div>
            </q-card-section>

            <!-- Quantity -->
            <div class="absolute absolute-bottom-right q-pa-sm">
              <q-btn color="primary" size="10px" icon="remove" @click="decreaseQuantity(item)" square dense />
              <span class="text-body1 q-mx-sm">{{ item.quantity }}</span>
              <q-btn color="primary" size="10px" icon="add" @click="increaseQuantity(item)" square dense />
            </div>
          </q-card-section>
        </q-card>

        <!-- Payment Amount -->
        <div class="text-h6 text-bold text-center q-my-md" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-separator />
          <div class="q-py-sm">{{ t('dashboard.transaction.totalPrice') }}: {{ rupiah(data.total_price) }}</div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useCategoryStore } from '/src/stores/category-store'
import DetailTransaction from './DetailCreate.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const data = ref({
  name: '',
  payment_type: '',
  total_price: 0,
  transactiondetails: []
})
const detailItemDialog = ref(false)

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useCategoryStore().all()
    items.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
}
onMounted(() => {
  getItem()
})

// Payment Type
const paymentType = ref([
  {
    label: t('dashboard.transaction.data.cash'),
    value: 'cash'
  },
  {
    label: t('dashboard.transaction.data.qris'),
    value: 'qris'
  },
  {
    label: t('dashboard.transaction.data.others'),
    value: 'others'
  }
])
const paymentTypeOptions = ref(paymentType)
const paymentTypeFilter = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    paymentTypeOptions.value = paymentType.value.filter((option) => {
      return option.value.toLowerCase().indexOf(needle) > -1
    })
  })
}

// Payment Amount
const updatePaymentAmount = () => {
  data.value.total_price = data.value.transactiondetails.reduce((sum, item) => sum + item.total_price, 0)
}

// Transaction Details
const addToCart = (product) => {
  const found = data.value.transactiondetails.find((item) => item.product_id === product.id)
  if (found) {
    found.quantity++
    found.total_price = found.quantity * product.purchase_price
  } else {
    data.value.transactiondetails.push({
      product_id: product.id,
      name: product.name,
      image: product.image,
      purchase_price: product.purchase_price,
      total_price: product.purchase_price,
      quantity: 1
    })
  }
  updatePaymentAmount()
}

// Quantity
const increaseQuantity = (item) => {
  item.quantity++
  item.total_price = item.quantity * item.purchase_price
  updatePaymentAmount()
}
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    item.total_price = item.quantity * item.purchase_price
  } else {
    data.value.transactiondetails = data.value.transactiondetails.filter((cartItem) => cartItem.product_id !== item.product_id)
  }
  updatePaymentAmount()
}
const resetCart = () => {
  data.value.transactiondetails = []
  updatePaymentAmount()
}

// Disabled Button
const disabledButton = computed(() => !data.value.name || !data.value.payment_type || data.value.transactiondetails == 0)

// Created
const itemCreated = () => {
  detailItemDialog.value = false
  data.value = {
    name: '',
    payment_type: '',
    total_price: 0,
    notes: '',
    transactiondetails: []
  }
}
</script>
