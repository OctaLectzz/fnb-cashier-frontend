<template>
  <q-page class="q-my-xl">
    <hr class="q-my-md" />

    <!-- Form -->
    <q-form @submit="editProfile">
      <div class="row justify-center">
        <!-- Account details card -->
        <div class="col-md-8 col-xs-12 q-ma-md">
          <q-card style="height: 100%">
            <q-card-section class="bg-blue-grey-1">
              <div class="text-body1 text-bold">{{ $t('profile.changePasswordCard') }}</div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pa-md q-pb-xl">
              <div class="row justify-center">
                <!-- Current Password -->
                <div class="col-10 q-pa-sm">
                  <label class="small mb-1" for="current_password">
                    {{ $t('auth.currentPasswordForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </label>
                  <q-input
                    :type="passwordShow.current_password ? 'password' : 'text'"
                    v-model="data.current_password"
                    id="current_password"
                    :rules="rules.current_password"
                    outlined
                    dense
                    required
                    autofocus
                  >
                    <template v-slot:append>
                      <q-icon :name="passwordShow.current_password ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="passwordShow.current_password = !passwordShow.current_password" />
                    </template>
                  </q-input>
                </div>

                <!-- New Password -->
                <div class="col-10 q-pa-sm">
                  <label class="small mb-1" for="new_password">
                    {{ $t('auth.newPasswordForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </label>
                  <q-input :type="passwordShow.new_password ? 'password' : 'text'" v-model="data.new_password" id="new_password" :rules="rules.new_password" outlined dense required>
                    <template v-slot:append>
                      <q-icon :name="passwordShow.new_password ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="passwordShow.new_password = !passwordShow.new_password" />
                    </template>
                  </q-input>
                </div>

                <!-- Confirm Password -->
                <div class="col-10 q-pa-sm">
                  <label class="small mb-1" for="confirm_password">
                    {{ $t('auth.confirmNewPasswordForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </label>
                  <q-input :type="passwordShow.confirm_password ? 'password' : 'text'" v-model="data.confirm_password" id="confirm_password" :rules="rules.confirm_password" outlined dense required>
                    <template v-slot:append>
                      <q-icon :name="passwordShow.confirm_password ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="passwordShow.confirm_password = !passwordShow.confirm_password" />
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Save -->
              <q-btn type="submit" label="Simpan" color="primary" class="float-right q-ma-md" :loading="loading" :disable="disabledButton">
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <hr class="q-my-md" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useProfileStore } from '/src/stores/profile-store'

const { t } = useI18n()
const router = useRouter()
const data = ref({
  current_password: '',
  new_password: '',
  confirm_password: ''
})
const passwordShow = ref({
  current_password: true,
  new_password: true,
  confirm_password: true
})

// Validate
const rules = ref({
  current_password: [(v) => !!v || t('auth.validate.currentPasswordRequired'), (v) => v.length >= 8 || t('auth.validate.currentPasswordMinLength')],
  new_password: [(v) => !!v || t('auth.validate.newPasswordRequired'), (v) => v.length >= 8 || t('auth.validate.newPasswordMinLength')],
  confirm_password: [(v) => !!v || t('auth.validate.passwordConfirmationRequired'), (v) => v === data.value.new_password || t('auth.validate.passwordConfirmationSame')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.current_password || !data.value.new_password || !data.value.confirm_password)

// Edit
const editProfile = async () => {
  loading.value = true
  try {
    await useProfileStore().changepassword(data.value)

    toast.success(t('profile.successChangePasswordMsg'))
    router.back()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('profile.failedChangePasswordMsg'))
  }
  loading.value = false
}
</script>
