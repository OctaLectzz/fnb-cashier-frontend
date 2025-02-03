<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row justify-center q-my-sm">
        <img :src="url + '/settings/' + setting.logo" :style="'width:' + setting.logo_size + 'px'" />
      </div>

      <div class="text-h5 text-bold text-center q-mb-lg">{{ $t('auth.welcomeMsg') }} {{ setting.title }}</div>

      <q-form @submit="submitForm">
        <div class="row justify-center">
          <!-- Email -->
          <div class="col-sm-8 col-xs-11">
            <label for="email">
              {{ $t('auth.emailForm') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </label>
            <q-input type="email" v-model="email" placeholder="email@example.com" :rules="rules.email" v-lowercase outlined dense />
          </div>

          <!-- Password -->
          <div class="col-sm-8 col-xs-11">
            <label for="password">
              {{ $t('auth.passwordForm') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </label>
            <q-input type="password" v-model="password" placeholder="********" :rules="rules.password" outlined dense />
          </div>

          <!-- Submit -->
          <div class="col-sm-8 col-xs-11 q-mt-sm">
            <q-btn type="submit" color="primary" :label="$t('auth.loginText')" class="full-width q-mt-sm" :loading="loginloading" :disable="loginloading" @click="submitForm">
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                {{ $t('public.loadingText') }}
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>

      <!-- Terms -->
      <div class="q-mt-lg text-center text-grey-7" style="font-size: 11px">
        <div>{{ $t('auth.permissionText1') }}</div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission-link text-primary">{{ $t('auth.termsText') }}</a>
          {{ $t('auth.permissionText2') }}
        </div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission-link text-primary">{{ $t('auth.privacyText') }}</a>
          .
          <a href="#" target="_blank" rel="noopener noreferrer" class="permission-link text-primary">{{ $t('auth.noticeText') }}</a>
          .
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useSettingStore } from '/src/stores/setting-store'

const { t } = useI18n()
const loading = ref(true)

// Get Setting
const setting = ref({})
const getSetting = async () => {
  try {
    const res = await useSettingStore().show(1)

    setting.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getSetting()
})

// Data
const email = ref('')
const password = ref('')

// Validate
const rules = {
  email: [(v) => !!v || t('auth.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('auth.validate.emailFormat')],
  password: [(v) => !!v || t('auth.validate.passwordRequired'), (v) => v.length >= 8 || t('auth.validate.passwordMinLength')]
}

// Login
const loginloading = ref(false)
const submitForm = async () => {
  loginloading.value = true
  try {
    await useAuthStore().login(email.value, password.value)

    toast.success(t('auth.successLoginMsg'))
    window.location.reload()
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(t('auth.failedLoginMsg'))
  }
  loginloading.value = false
}
</script>
