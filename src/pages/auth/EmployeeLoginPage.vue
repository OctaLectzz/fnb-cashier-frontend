<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="border-radius: 30px">
      <div class="row justify-center q-my-sm">
        <img :src="url + '/settings/' + setting.logo" :style="'width:' + setting.logo_size + 'px'" />
      </div>

      <div class="text-h5 text-bold text-center">{{ $t('auth.employeeWelcomeMsg') }}</div>
      <div class="text-body1 text-center q-mb-lg">{{ $t('auth.employeeDescriptionMsg') }}</div>

      <q-form @submit="submitForm">
        <div class="row justify-center">
          <!-- NIP -->
          <div class="col-sm-8 col-xs-11">
            <label for="nip">
              {{ $t('auth.nipForm') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </label>
            <q-input v-model="nip" placeholder="1234567890" :rules="rules.nip" mask="####################" outlined dense required autofocus />
          </div>

          <!-- PIN -->
          <div class="col-sm-8 col-xs-11">
            <label for="pin">
              {{ $t('auth.pinForm') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </label>
            <q-input type="password" v-model="pin" placeholder="********" :rules="rules.pin" mask="######" outlined dense required />
          </div>

          <!-- Submit -->
          <div class="col-sm-8 col-xs-11 q-mt-sm">
            <q-btn type="submit" color="primary" :label="$t('auth.signInText')" class="full-width q-mt-sm" :loading="loginloading" :disable="loginloading" @click="submitForm">
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
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-link text-primary">{{ $t('auth.termsText') }}</a>
          {{ $t('auth.permissionText2') }}
        </div>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-link text-primary">{{ $t('auth.privacyText') }}</a>
          .
          <a href="#" target="_blank" rel="noopener noreferrer" class="text-link text-primary">{{ $t('auth.noticeText') }}</a>
          .
        </div>
      </div>
    </q-card>
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
const nip = ref('')
const pin = ref('')

// Validate
const rules = {
  nip: [(v) => !!v || t('auth.validate.nipRequired')],
  pin: [(v) => !!v || t('auth.validate.pinRequired')]
}

// Login
const loginloading = ref(false)
const submitForm = async () => {
  loginloading.value = true
  try {
    await useAuthStore().employee(nip.value, pin.value)

    toast.success(t('auth.successEmployeeLoginMsg'))
    window.location.reload()
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(t('auth.failedEmployeeLoginMsg'))
  }
  loginloading.value = false
}
</script>
