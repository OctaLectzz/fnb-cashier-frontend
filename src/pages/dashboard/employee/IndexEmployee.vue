<template>
  <!-- Loading -->
  <q-page v-if="loading" class="q-pa-sm">
    <q-card class="q-pa-md q-my-sm">
      <!-- Header Text -->
      <q-card-section>
        <div class="text-h5 text-bold">Dashboard Employee</div>
        <div class="text-body1">Selamat datang di {{ setting.title }}</div>
      </q-card-section>

      <!-- Card -->
      <q-card-section>
        <div class="row justify-between">
          <div class="col-md-3 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
          <div class="col-md-5 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Stats -->
    <q-card class="q-pa-md q-my-sm">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="insert_chart" size="80px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h4 text-bold">Statistik</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <q-skeleton height="400px" />
      </q-card-section>
    </q-card>
  </q-page>

  <!-- Pages -->
  <q-page v-else class="q-pa-sm">
    <q-card class="q-pa-md q-my-sm">
      <!-- Header Text -->
      <q-card-section>
        <div class="text-h5 text-bold">Dashboard</div>
        <div class="text-body1">Selamat datang di Yaumi</div>
      </q-card-section>

      <!-- Card -->
      <q-card-section>
        <div v-if="loading" class="row justify-between">
          <div class="col-md-3 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
          <div class="col-md-5 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12 q-ma-sm">
            <q-skeleton height="220px" />
          </div>
        </div>
        <div v-else class="row justify-between">
          <div class="col-md-3 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm">
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="account_box" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-grey-5" style="line-height: 18px">TOTAL KARYAWAN</div>
                <div class="text-h4 text-bold text-white q-mt-xs">{{ item.employee }}</div>
              </q-item-section>
            </q-item>
            <q-icon name="badge" color="white" size="90px" class="q-pa-sm q-px-lg" />
          </div>
          <div class="col-md-5 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm">
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="badge" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-grey-5" style="line-height: 18px">PERSENTASE TEPAT WAKTU</div>
                <div class="text-h4 text-bold text-white q-mt-xs">{{ item.ontimePercentage }}%</div>
              </q-item-section>
            </q-item>
            <q-icon name="alarm" color="white" size="90px" class="q-pa-sm q-px-lg" />
            <!-- Percetage Circle -->
            <q-circular-progress color="secondary" track-color="white" size="150px" :value="item.ontimePercentage" :thickness="0.15" class="float-right q-pa-md q-mx-lg" style="margin-top: -35px" />
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm">
            <q-item>
              <q-item-section avatar>
                <q-avatar text-color="white" icon="person" size="70px" class="badge-color" rounded />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-bold text-grey-5" style="line-height: 18px">TOTAL PENGGUNA</div>
                <div class="text-h4 text-bold text-white q-mt-xs">{{ item.user }}</div>
              </q-item-section>
            </q-item>
            <q-icon name="group" color="white" size="90px" class="q-pa-sm q-px-lg" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Stats -->
    <q-card class="q-pa-md q-my-sm">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="insert_chart" size="80px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h4 text-bold">Statistik Absensi</div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '/src/stores/setting-store'

// const route = useRoute()
// const router = useRouter()
const loading = ref(true)

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

// Get
// const item = ref({})
// const getItem = async () => {
//   loading.value = true
//   try {
//     const res = await useSettingStore().index()

//     item.value = res.data
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     if (error.response.data.status === 'failed') {
//       router.push('/notfound')
//     }
//   }
//   loading.value = false
// }
// watchEffect(() => {
//   if (route.name == 'dashboard.home') {
//     getItem()
//   }
// })
</script>

<style>
.badge-color {
  background-color: #a9a8a860;
}
</style>
