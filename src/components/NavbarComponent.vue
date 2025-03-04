<template>
  <q-toolbar>
    <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />

    <!-- Menu -->
    <q-tabs v-model="dashboardmenu" class="q-mx-lg">
      <q-route-tab :to="{ name: 'main.home' }" name="main" :label="$t('dashboard.menu.mainMenu')" exact replace />
      <q-route-tab :to="{ name: 'employee.home' }" name="employee" :label="$t('dashboard.menu.employeeMenu')" exact replace />
    </q-tabs>

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
            <img :src="url + '/users/avatars/' + profile.avatar" />
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

            <q-item class="q-pr-lg" @click="navigateTo('main.profile')" clickable v-close-popup dense>
              <q-item-section>
                <div>
                  <q-icon name="manage_accounts" size="15px" class="q-pb-xs q-mx-xs" />
                  {{ $t('dashboard.editProfileMenu') }}
                </div>
              </q-item-section>
            </q-item>

            <q-item class="q-pr-lg" @click="navigateTo('main.changepassword')" clickable v-close-popup dense>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useQuasar } from 'quasar'
import { url, token } from '/src/boot/axios'
import { lang, languages, languageNames } from '/src/boot/i18n'
import { useProfileStore } from '/src/stores/profile-store'
import { useAuthStore } from '/src/stores/auth-store'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const emits = defineEmits(['sidebar'])
const dashboardmenu = ref('main')

const toggleDrawer = () => {
  emits('sidebar')
}

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
