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
          <q-item v-if="hasPermission('view roles')" :to="{ name: 'employee.role' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="switch_access_shortcut" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.roleMenu') }}</q-item-section>
          </q-item>

          <!-- Schedule -->
          <q-item v-if="hasPermission('view schedules')" :to="{ name: 'employee.schedule' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="schedule" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.scheduleMenu') }}</q-item-section>
          </q-item>

          <!-- Employee -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.employee' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
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

          <!-- Attendance -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.attendance' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="history" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.attendanceMenu') }}</q-item-section>
          </q-item>

          <!-- Leave -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.leave' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="logout" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.leaveMenu') }}</q-item-section>
          </q-item>

          <!-- Overtime -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.overtime' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="alarm" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.overtimeMenu') }}</q-item-section>
          </q-item>

          <!-- SALARY -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.employee.sidebar.salaryGroup') }}</span>
          </div>

          <!-- Salary Setting -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.salary-setting' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="attach_money" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.salarySettingMenu') }}</q-item-section>
          </q-item>

          <!-- Calculate Salary -->
          <q-item v-if="hasPermission('view employees')" :to="{ name: 'employee.calculate-salary' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text">
            <q-item-section avatar>
              <q-icon name="calculate" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.employee.sidebar.calculateSalaryMenu') }}</q-item-section>
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
