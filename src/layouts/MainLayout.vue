<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark text-white' : ''" class="text-dark q-py-sm" style="background-color: #ececf1" :elevated="!$q.dark.isActive">
      <NavbarComponent :profile="profile" :loading="loading" @sidebar="toggleDrawer" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-10'" class="text-white" bordered show-if-above>
      <q-list>
        <!-- Branch -->
        <SwitchBranches :miniState="miniState" />

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
          <q-item v-if="hasPermission('view branches')" :to="{ name: 'main.branch' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="business" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.branchMenu') }}</q-item-section>
          </q-item>

          <!-- Cashier -->
          <q-item v-if="hasPermission('view cashier')" :to="{ name: 'main.cashier' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="point_of_sale" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.cashierMenu') }}</q-item-section>
          </q-item>

          <!-- MANAGEMENT -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.main.sidebar.managementGroup') }}</span>
          </div>

          <!-- Category -->
          <q-item v-if="hasPermission('view categories')" :to="{ name: 'main.category' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="category" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.categoryMenu') }}</q-item-section>
          </q-item>

          <!-- Product -->
          <q-item v-if="hasPermission('view products')" :to="{ name: 'main.product' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="restaurant_menu" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.productMenu') }}</q-item-section>
          </q-item>

          <!-- Transaction -->
          <q-item v-if="hasPermission('view transactions')" :to="{ name: 'main.transaction' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="receipt_long" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.transactionMenu') }}</q-item-section>
          </q-item>

          <!-- Discount -->
          <!-- <q-item v-if="hasPermission('view discounts')" :to="{ name: 'main.discount' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="discount" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.discountMenu') }}</q-item-section>
          </q-item> -->

          <!-- Sales Report -->
          <!-- <q-item v-if="hasPermission('view salesreports')" :to="{ name: 'main.salesreport' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="pie_chart" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.main.sidebar.salesReportMenu') }}</q-item-section>
          </q-item> -->
        </q-scroll-area>
      </q-list>
    </q-drawer>

    <q-page-container :class="$q.dark.isActive ? 'bg-dark-page' : 'bg-grey-3'" style="min-height: 100vh">
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
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import NavbarComponent from '/src/components/NavbarComponent.vue'
import { useAuthStore } from '/src/stores/auth-store'
import { useProfileStore } from '/src/stores/profile-store'
import SwitchBranches from '/src/components/SwitchBranches.vue'

const { t } = useI18n()

// Permissions
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Profile
const profile = ref({})
const loading = ref(false)
const getProfile = async () => {
  loading.value = true
  try {
    const res = await useProfileStore().employeeprofile()

    profile.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)

    toast.error(t('auth.expiredMsg'))
    localStorage.removeItem('token')
    localStorage.removeItem('employeetoken')
    localStorage.removeItem('branch')
    window.location.reload()
  }
  loading.value = false
}
onMounted(() => {
  getProfile()
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
