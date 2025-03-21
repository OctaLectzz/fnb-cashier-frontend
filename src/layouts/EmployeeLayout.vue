<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark text-white' : ''" class="text-dark q-py-sm" style="background-color: #ececf1" elevated>
      <NavbarComponent :profile="profile" :loading="loading" @sidebar="toggleDrawer" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-10'" class="text-white" bordered show-if-above>
      <q-list>
        <!-- Branch -->
        <div class="flex flex-center q-pa-sm">
          <q-btn-dropdown :dropdown-icon="miniState ? 'none' : undefined" :style="miniState ? 'max-width: 40px' : ''" rounded dense flat push no-caps>
            <template v-slot:label>
              <q-avatar v-if="!miniState" icon="store" text-color="white" class="q-mx-sm" />
              <div v-if="!miniState" class="text-left q-mx-sm">
                <div style="font-size: 11px">{{ $t('dashboard.outletText') }}</div>
                <q-skeleton v-if="branchLoading" width="80px" height="18px" />
                <div v-else>{{ selectedBranch.length > 14 ? selectedBranch.slice(0, 14) + '...' : selectedBranch }}</div>
              </div>
              <q-icon v-else name="store" text-color="white" size="35px" style="margin-left: 30px" />
            </template>

            <div class="q-pa-md">
              <div class="text-h6">{{ $t('dashboard.outletListText') }}</div>

              <q-input v-model="branchFilter" :placeholder="$t('public.searchText')" class="q-my-sm" debounce="300" outlined dense>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

              <q-separator class="q-my-md" />

              <div v-for="branch in branches" :key="branch.id">
                <q-radio v-model="selectBranch" :val="branch.id" :label="branch.name" @click="changeBranch(branch)" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>

        <q-separator dark />

        <q-scroll-area style="height: 86vh">
          <!-- MAIN -->
          <q-separator class="q-mb-md" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.employee.sidebar.mainGroup') }}</span>
          </div>

          <!-- Home -->
          <q-item :to="{ name: 'employee.home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="home" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.homeMenu') }}</q-item-section>
          </q-item>

          <!-- Role -->
          <q-item :to="{ name: 'employee.role' }" v-if="hasPermission('view roles')" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="switch_access_shortcut" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.roleMenu') }}</q-item-section>
          </q-item>

          <!-- Schedule -->
          <q-item :to="{ name: 'employee.schedule' }" v-if="hasPermission('view schedules')" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="schedule" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.scheduleMenu') }}</q-item-section>
          </q-item>

          <!-- Employee -->
          <q-item :to="{ name: 'employee.employee' }" v-if="hasPermission('view employees')" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="badge" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.employeeMenu') }}</q-item-section>
          </q-item>

          <!-- MANAGEMENT -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.employee.sidebar.managementGroup') }}</span>
          </div>
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
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { currentbranch } from '/src/boot/axios'
import NavbarComponent from '/src/components/NavbarComponent.vue'
import { useAuthStore } from '/src/stores/auth-store'
import { useEmployeeStore } from '/src/stores/employee/employee-store'
import { useBranchStore } from '/src/stores/main/branch-store'

const { t } = useI18n()

// Permissions
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Profile
const profile = ref({})
const loading = ref(false)
const getProfile = async () => {
  loading.value = true
  try {
    const res = await useEmployeeStore().profile()

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

// Branch
const branchLoading = ref(false)
const branchFilter = ref('')
const selectBranch = ref(currentbranch)
const selectedBranch = ref('')
const branches = ref([])
const getBranch = async () => {
  branchLoading.value = true
  try {
    const res = await useBranchStore().all()

    branches.value = res.data.data.filter((branch) => branch.status === 1)
    selectedBranch.value = branches.value.find((branch) => branch.id === currentbranch).name
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  branchLoading.value = false
}
onMounted(() => {
  getBranch()
})
const changeBranch = (branch) => {
  localStorage.setItem('branch', branch.id)
  selectedBranch.value = branch.name
  window.location.reload()
}
</script>
