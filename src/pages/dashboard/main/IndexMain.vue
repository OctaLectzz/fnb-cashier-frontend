<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md q-my-sm">
      <!-- Header Text -->
      <div class="q-px-md">
        <div class="text-h5 text-bold">{{ $t('dashboard.main.home.dashboardText') }}</div>
        <div class="text-body1">{{ $t('dashboard.main.home.welcomeText') }} {{ setting.title }}</div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="row justify-between">
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
          <q-skeleton height="100px" />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
          <q-skeleton height="100px" />
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
          <q-skeleton height="100px" />
        </div>
      </div>

      <!-- Data Count -->
      <div v-else class="row justify-center">
        <!-- Product -->
        <div class="col-md-4 col-sm-12 q-pa-sm">
          <q-card class="dashboard-card q-pa-sm" style="border-right: 5px solid #000" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="restaurant_menu" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.productCountText') }}</div>
                <div class="text-h5 text-bold q-mt-xs">{{ item.total_products }}</div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <!-- Transaction -->
        <div class="col-md-4 col-sm-12 q-pa-sm">
          <q-card class="dashboard-card q-pa-sm" style="border-right: 5px solid #000" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="point_of_sale" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.todayTransactionText') }}</div>
                <div class="text-h5 text-bold q-mt-xs">{{ rupiah(item.total_today) }}</div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <!-- Category -->
        <div class="col-md-4 col-sm-12 q-pa-sm">
          <q-card class="dashboard-card q-pa-sm" style="border-right: 5px solid #000" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="category" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.categoryCountText') }}</div>
                <div class="text-h5 text-bold q-mt-xs">{{ item.total_categories }}</div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="q-px-md">
      <q-card class="dashboard-card q-pa-sm q-my-sm">
        <q-card-section>
          <!-- Title -->
          <div class="text-h4 text-bold">{{ $t('dashboard.main.home.salesCard') }}</div>
          <div class="text-body1 q-my-xs">
            <q-icon name="today" size="23px" class="q-mr-sm" />
            {{ todayDate }}
          </div>

          <q-separator class="q-my-lg" />

          <!-- Filter -->
          <div class="row">
            <q-select v-model="filter" :options="filteroptions" option-value="id" option-label="desc" class="col-md-4 col-sm-7 col-xs-12" outlined dense />
          </div>

          <q-separator class="q-my-lg" />

          <!-- Data -->
          <div class="row items-center">
            <!-- Total Sales -->
            <div class="col-md-5 col-xs-10 q-pa-sm">
              <div class="text-h6 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.totalSalesText') }}</div>
              <div class="text-h4 text-bold q-mt-xs">{{ rupiah(item.total_today) }}</div>
            </div>
            <q-separator vertical />

            <!-- Reception -->
            <div class="col-md-2 col-xs-10 q-pa-sm">
              <div class="text-body1 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.receptionText') }}</div>
              <div class="text-subtitle1 text-bold q-mt-xs">{{ rupiah(item.total_today) }}</div>
            </div>
            <q-separator vertical />

            <!-- Products Sold -->
            <div class="col-md-2 col-xs-10 q-pa-sm">
              <div class="text-body1 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.productText') }}</div>
              <div class="text-subtitle1 text-bold q-mt-xs">{{ item.products_sold }}</div>
            </div>

            <!-- Transaction -->
            <q-separator vertical />
            <div class="col-md-2 col-xs-10 q-pa-sm">
              <div class="text-body1 text-bold text-primary" style="line-height: 18px">{{ $t('dashboard.main.home.transactionText') }}</div>
              <div class="text-subtitle1 text-bold q-mt-xs">{{ item.transactions_today }}</div>
            </div>
          </div>

          <q-separator class="q-my-lg" />

          <!-- Sales Chart -->
          <div class="text-body1 q-my-xs">
            <q-icon name="analytics" size="30px" class="q-mr-sm" />
            {{ $t('dashboard.main.home.salesChartText') }}
          </div>
          <q-skeleton height="400px" />
        </q-card-section>

        <q-card-section></q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { rupiah } from '/src/boot/rupiah'
import { useSettingStore } from '/src/stores/setting-store'
import { useProfileStore } from '/src/stores/profile-store'
import { useDashboardStore } from '/src/stores/dashboard-store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const loading = ref(true)

// Get
const item = ref({})
const getItem = async () => {
  loading.value = true
  try {
    const res = await useDashboardStore().main()

    item.value = res.data
  } catch (error) {
    console.error('Error fetching data:', error)

    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
  loading.value = false
}
watchEffect(() => {
  if (route.name == 'main.home') {
    getItem()
  }
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

// Profile
const profile = ref({})
const getProfile = async () => {
  try {
    const res = await useProfileStore().profile()

    profile.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getProfile()
})

// Get Today Date
const lang = localStorage.getItem('lang') || 'en'
const todayDate = ref(new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(new Date()))

// Sales Filter
const filter = ref('Day')
const filteroptions = [
  {
    id: 'day',
    desc: t('dashboard.main.home.dayFilter')
  },
  {
    id: 'month',
    desc: t('dashboard.main.home.monthFilter')
  }
]
</script>

<style>
.badge-color {
  background-color: #a9a8a860;
}
</style>
