<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark text-white' : ''" class="text-dark q-py-sm" style="background-color: #ececf1" elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Switch Languages -->
          <q-btn-dropdown color="primary" class="q-mx-sm" dense flat>
            <template v-slot:label>
              <img :src="'/img/lang/' + lang + '.png'" width="20" />
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-list>
                  <q-item v-for="lang in languages" :key="lang" @click="changeLanguage(lang)" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>
                        <img :src="'/img/lang/' + lang + '.png'" width="20" />
                        {{ languageNames[lang] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-btn-dropdown>

          <!-- Switch Mode -->
          <q-btn color="primary" :icon="$q.dark.isActive ? 'brightness_7' : 'brightness_4'" class="q-mx-sm" @click="toggleSwitchMode" flat round dense />

          <!-- Refresh -->
          <q-btn color="primary" icon="refresh" class="q-mx-sm" @click="$router.go()" round dense flat />

          <!-- FullScreen -->
          <q-btn v-if="$q.screen.gt.sm" color="primary" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" class="q-mx-sm" @click="$q.fullscreen.toggle()" round dense flat />

          <!-- Profile Menu -->
          <q-btn-dropdown color="primary" class="q-mx-sm" rounded dense flat push no-caps>
            <template v-slot:label>
              <q-skeleton v-if="loading" type="QAvatar" size="30px" />

              <q-avatar v-else size="30px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div>
              <q-list class="nav-profile">
                <q-item class="q-pr-lg" @click="navigateTo('home')" clickable v-close-popup dense>
                  <q-item-section>
                    <div>
                      <q-icon name="home" size="15px" class="q-pb-xs q-mx-xs" />
                      {{ $t('dashboard.homeMenu') }}
                    </div>
                  </q-item-section>
                </q-item>

                <q-item class="q-pr-lg" @click="navigateTo('dashboard.profile')" clickable v-close-popup dense>
                  <q-item-section>
                    <div>
                      <q-icon name="manage_accounts" size="15px" class="q-pb-xs q-mx-xs" />
                      {{ $t('dashboard.editProfileMenu') }}
                    </div>
                  </q-item-section>
                </q-item>

                <q-item class="q-pr-lg" @click="navigateTo('dashboard.changepassword')" clickable v-close-popup dense>
                  <q-item-section>
                    <div>
                      <q-icon name="key" size="15px" class="q-pb-xs q-mx-xs" />
                      {{ $t('dashboard.changepasswordMenu') }}
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item class="q-pr-lg" @click="logout" clickable v-close-popup dense>
                  <q-item-section>
                    <div class="text-red">
                      <q-icon name="power_settings_new" size="15px" class="q-pb-xs q-mx-xs" />
                      {{ $t('public.logoutText') }}
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
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
            <span v-if="!miniState">{{ $t('dashboard.sidebar.mainGroup') }}</span>
          </div>

          <!-- Home -->
          <q-item :to="{ name: 'dashboard.home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="home" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.homeMenu') }}</q-item-section>
          </q-item>

          <!-- Home -->
          <q-item :to="{ name: 'dashboard.branch' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="business" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.branchMenu') }}</q-item-section>
          </q-item>

          <!-- MANAGEMENT -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.sidebar.managementGroup') }}</span>
          </div>

          <!-- Category -->
          <q-item :to="{ name: 'dashboard.category' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="category" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.categoryMenu') }}</q-item-section>
          </q-item>

          <!-- Product -->
          <q-item :to="{ name: 'dashboard.product' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="restaurant_menu" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.productMenu') }}</q-item-section>
          </q-item>

          <!-- Tax & Discount -->
          <q-item :to="{ name: 'dashboard.tax-discount' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="discount" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.taxDiscountMenu') }}</q-item-section>
          </q-item>

          <!-- CASHIER -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.sidebar.cashierGroup') }}</span>
          </div>

          <!-- Transaction -->
          <q-item :to="{ name: 'dashboard.transaction' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="point_of_sale" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.transactionMenu') }}</q-item-section>
          </q-item>

          <!-- Transaction History -->
          <q-item :to="{ name: 'dashboard.transaction-history' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="receipt_long" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.transactionHistoryMenu') }}</q-item-section>
          </q-item>

          <!-- Sales Report -->
          <q-item :to="{ name: 'dashboard.sales-report' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="pie_chart" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.salesReportMenu') }}</q-item-section>
          </q-item>

          <!-- EMPLOYEE MANAGEMENT -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.sidebar.employeeManagementGroup') }}</span>
          </div>

          <!-- COMPANY -->
          <q-separator class="q-mb-md q-mt-sm" />
          <div class="menu-text-header q-mx-md q-mb-sm" style="font-size: 11px">
            <span v-if="!miniState">{{ $t('dashboard.sidebar.companyGroup') }}</span>
          </div>

          <!-- Setting -->
          <q-item :to="{ name: 'dashboard.setting' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="language" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.settingMenu') }}</q-item-section>
          </q-item>

          <!-- Back -->
          <q-item :to="{ name: 'home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click menu-text q-py-md">
            <q-item-section avatar>
              <q-icon name="reply" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t('dashboard.sidebar.backMenu') }}</q-item-section>
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useQuasar } from 'quasar'
import { url, token } from '/src/boot/axios'
import { lang, languages, languageNames } from '/src/boot/i18n'
import { useSettingStore } from '/src/stores/setting-store'
import { useProfileStore } from '/src/stores/profile-store'
import { useAuthStore } from '/src/stores/auth-store'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()

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
const loading = ref(false)
const getProfile = async () => {
  loading.value = true
  try {
    const res = await useProfileStore().profile()

    profile.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)

    toast.error(t('auth.expiredMsg'))
    localStorage.removeItem('token')
    window.location.reload()
  }
  loading.value = false
}
onMounted(() => {
  if (token) getProfile()
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

// Change Language
const changeLanguage = (newLocale) => {
  localStorage.setItem('lang', newLocale)
  window.location.reload()
}

// Switch Mode
const darkmode = localStorage.getItem('darkmode') || 'false'
const isDarkMode = ref(JSON.parse(darkmode))
$q.dark.set(isDarkMode.value)
const toggleSwitchMode = () => {
  const newMode = !isDarkMode.value
  $q.dark.set(newMode)

  isDarkMode.value = newMode
  localStorage.setItem('darkmode', newMode)
}

// Navigate
const navigateTo = (name, params) => {
  router.push({ name: name, params: params })
}

// Logout
const logout = async () => {
  $q.dialog({
    title: t('public.logoutText'),
    message: t('auth.confirmLogoutText'),
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useAuthStore().logout()

      toast.success(t('auth.successLogoutMsg'))
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(t(error.response.data.message || 'auth.failedLogoutMsg'))
    }
  })
}
</script>
