<template>
  <q-toolbar>
    <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />

    <!-- Menu -->
    <div class="q-mx-md">
      <router-link
        v-if="hasPermission('dashboard main')"
        :to="{ name: 'main.home' }"
        class="nav-link q-mx-xs"
        :class="{ 'active-tab': isMainRoute, 'text-white': !isMainRoute && $q.dark.isActive, 'text-black': !isMainRoute && !$q.dark.isActive }"
      >
        {{ $t('dashboard.menu.mainMenu') }}
      </router-link>

      <router-link
        v-if="hasPermission('dashboard employee')"
        :to="{ name: 'employee.home' }"
        class="nav-link q-mx-xs"
        :class="{ 'active-tab': isEmployeeRoute, 'text-white': !isEmployeeRoute && $q.dark.isActive, 'text-black': !isEmployeeRoute && !$q.dark.isActive }"
      >
        {{ $t('dashboard.menu.employeeMenu') }}
      </router-link>
    </div>

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
            <img :src="url + '/employees/avatars/' + profile.avatar" />
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { lang, languages, languageNames } from '/src/boot/i18n'
import { useAuthStore } from '/src/stores/auth-store'

const $q = useQuasar()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { profile, loading } = defineProps(['profile', 'loading'])
const emits = defineEmits(['sidebar'])
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

const toggleDrawer = () => {
  emits('sidebar')
}

// Menu
const isMainRoute = computed(() => route.path.startsWith('/main'))
const isEmployeeRoute = computed(() => route.path.startsWith('/employee'))

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
