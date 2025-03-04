<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark text-white' : ''" class="text-dark q-py-sm" style="background-color: #ececf1" elevated>
      <NavbarComponent @sidebar="toggleDrawer" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-10'" class="text-white" bordered show-if-above>
      <q-list>
        <!-- Brand -->
        <q-item class="row justify-center">
          <q-item-section avatar>
            <div v-if="!miniState" class="text-h4 text-center text-bold text-uppercase q-py-lg" style="letter-spacing: 5px">{{ setting.title }}</div>
            <img v-if="miniState" :src="url + '/settings/' + setting.logo" width="50" class="q-pa-xs" />
          </q-item-section>
        </q-item>

        <q-separator dark />

        <q-scroll-area style="height: 86vh">
          <!-- MAIN -->
          <q-separator class="q-mb-md" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.main.sidebar.mainGroup') }}</span>
          </div>

          <!-- Home -->
          <q-item :to="{ name: 'main.home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="home" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.homeMenu') }}</q-item-section>
          </q-item>

          <!-- Branch -->
          <q-item :to="{ name: 'main.branch' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="business" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.branchMenu') }}</q-item-section>
          </q-item>

          <!-- MANAGEMENT -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.main.sidebar.managementGroup') }}</span>
          </div>

          <!-- Category -->
          <q-item :to="{ name: 'main.category' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="category" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.categoryMenu') }}</q-item-section>
          </q-item>

          <!-- Product -->
          <q-item :to="{ name: 'main.product' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="restaurant_menu" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.productMenu') }}</q-item-section>
          </q-item>

          <!-- Discount -->
          <!-- <q-item :to="{ name: 'main.discount' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="discount" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.discountMenu') }}</q-item-section>
          </q-item> -->

          <!-- CASHIER -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.main.sidebar.cashierGroup') }}</span>
          </div>

          <!-- Transaction -->
          <q-item :to="{ name: 'main.transaction' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="point_of_sale" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.transactionMenu') }}</q-item-section>
          </q-item>

          <!-- Transaction History -->
          <q-item :to="{ name: 'main.transactionhistory' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="receipt_long" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.transactionHistoryMenu') }}</q-item-section>
          </q-item>

          <!-- Sales Report -->
          <!-- <q-item :to="{ name: 'main.salesreport' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="pie_chart" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.salesReportMenu') }}</q-item-section>
          </q-item> -->

          <!-- COMPANY -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.main.sidebar.companyGroup') }}</span>
          </div>

          <!-- Setting -->
          <q-item :to="{ name: 'main.setting' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="language" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.settingMenu') }}</q-item-section>
          </q-item>

          <!-- Back -->
          <q-item :to="{ name: 'home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="reply" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.backMenu') }}</q-item-section>
          </q-item>
        </q-scroll-area>
      </q-list>
    </q-drawer>

    <q-page-container :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-3'" style="min-height: 100vh">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { url } from '/src/boot/axios'
import NavbarComponent from '/src/components/NavbarComponent.vue'
import { useSettingStore } from '/src/stores/setting-store'

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

// Sidebar
const leftDrawerOpen = ref(false)
const miniState = ref(false)
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth > 1023
}
const toggleDrawer = () => {
  if (desktop.value) {
    miniState.value = !miniState.value
  } else {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
}
onMounted(() => {
  detectDesktop()
  window.addEventListener('resize', detectDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDesktop)
})
</script>
