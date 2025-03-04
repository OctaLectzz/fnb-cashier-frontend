<template>
  <q-page class="q-py-md">
    <!-- Loading -->
    <q-form v-if="loading" @submit="editProfile">
      <div class="row justify-center">
        <!-- Avatar card -->
        <div class="col-md-3 col-xs-11 q-pa-md">
          <q-skeleton width="100%" height="400px" />
        </div>

        <!-- Profile Account Information card -->
        <div class="col-md-8 col-xs-11 q-pa-md">
          <q-skeleton width="100%" height="400px" />
        </div>

        <!-- Personal Data Information card -->
        <div class="col-md-11 col-xs-11 q-pa-md">
          <q-skeleton width="100%" height="500px" />
        </div>
      </div>

      <!-- Save -->
      <q-skeleton width="90px" height="38px" class="float-right q-mx-xl" />
    </q-form>

    <!-- Form -->
    <q-form v-else @submit="editProfile">
      <div class="row justify-center">
        <!-- Avatar card -->
        <div class="col-md-3 col-xs-11 q-pa-md">
          <q-card class="q-pb-xl">
            <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
              <div class="text-body1 text-bold">{{ $t('profile.profilePictureCard') }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="text-center q-pa-md">
              <!-- Avatar -->
              <q-avatar size="100px" class="q-my-md">
                <img ref="avatar" :src="url + '/users/avatars/' + data.avatar" />
              </q-avatar>
              <div class="text-subtitle2 text-grey-7">{{ $t('public.imageType') }}</div>
              <q-btn color="primary" class="q-my-md" :label="$t('public.uploadBtn')" @click="$refs.avatarInput.click()" no-caps />
              <input type="file" ref="avatarInput" id="avatarInput" style="display: none" accept="image/*" @change="avatarChange" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Profile Account Information card -->
        <div class="col-md-8 col-xs-11 q-pa-md">
          <q-card class="q-pb-xl" style="height: 100%">
            <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
              <div class="text-body1 text-bold">{{ $t('profile.profileAccountInformationCard') }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-sm">
              <div class="row justify-center">
                <!-- Name -->
                <div class="col-11 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.nameForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                  <q-input v-model="data.name" placeholder="Octavyan Putra" :rules="rules.name" outlined dense required autofocus />
                </div>

                <!-- Email -->
                <div class="col-11 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.emailForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                  <q-input v-model="data.email" type="email" placeholder="email@example.com" :rules="rules.email" v-lowercase outlined dense required />
                </div>

                <!-- Phone Number -->
                <div class="col-11 q-pa-sm">
                  <div class="text-bold">{{ $t('auth.phoneNumberForm') }}</div>
                  <q-input v-model="data.phone_number" placeholder="0897 - 1234 - 4444" mask="#### - #### - ######" outlined dense />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Personal Data Information Card -->
        <div class="col-11 q-pa-md">
          <q-card class="q-pb-xl" style="height: 100%">
            <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
              <div class="text-body1 text-bold">{{ $t('profile.personalDataInformationCard') }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-sm">
              <div class="row justify-center">
                <!-- ktp -->
                <div class="col-md-5 col-xs-11 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.ktpForm') }}
                  </div>
                  <q-input v-model="data.ktp" :placeholder="$t('public.exampleText') + '3311040404040004'" mask="################" outlined dense />
                </div>

                <!-- npwp -->
                <div class="col-md-5 col-xs-11 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.npwpForm') }}
                  </div>
                  <q-input v-model="data.npwp" :placeholder="$t('public.exampleText') + '11.111.111.1.111'" mask="##.###.###.#.###" outlined dense />
                </div>

                <!-- KTP Image -->
                <div class="col-md-5 col-xs-11 text-center q-pa-sm">
                  <div class="text-bold q-mt-md">
                    {{ $t('auth.ktpPhotoForm') }}
                  </div>
                  <img ref="ktp_image" :src="url + '/users/ktps/' + data.ktp_image" width="200" />
                  <div class="text-subtitle2 text-grey-7">{{ $t('public.imageType') }}</div>
                  <q-btn color="primary" class="q-my-md" :label="$t('public.uploadBtn')" @click="$refs.ktpInput.click()" no-caps />
                  <input type="file" ref="ktpInput" id="ktpInput" style="display: none" accept="image/*" @change="ktpChange" />
                </div>

                <!-- NPWP Image -->
                <div class="col-md-5 col-xs-11 text-center q-pa-sm">
                  <div class="text-bold q-mt-md">
                    {{ $t('auth.npwpPhotoForm') }}
                  </div>
                  <img ref="npwp_image" :src="url + '/users/npwps/' + data.npwp_image" width="200" />
                  <div class="text-subtitle2 text-grey-7">{{ $t('public.imageType') }}</div>
                  <q-btn color="primary" class="q-my-md" :label="$t('public.uploadBtn')" @click="$refs.npwpInput.click()" no-caps />
                  <input type="file" ref="npwpInput" id="npwpInput" style="display: none" accept="image/*" @change="npwpChange" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Save -->
      <q-btn type="submit" :label="t('public.saveText')" color="primary" class="float-right q-mx-xl q-mb-xl" :loading="saveloading" :disable="disabledButton">
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { useProfileStore } from '/src/stores/profile-store'
import { useUserStore } from '/src/stores/user-store'

const { t } = useI18n()
const router = useRouter()
const loading = ref(true)
const data = ref({
  id: null,
  avatar: '',
  name: '',
  email: '',
  phone_number: '',
  ktp: '',
  ktp_image: '',
  npwp: '',
  npwp_image: ''
})

// Profile
const getProfile = async () => {
  loading.value = true
  try {
    const res = await useProfileStore().profile()

    data.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getProfile()
})

// Get User
const users = ref([])
const getUser = async () => {
  try {
    const res = await useUserStore().all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getUser()
})

// Avatar
const avatar = ref(null)
const avatarChange = async (e) => {
  e.preventDefault()

  const avatarImage = e.target.files[0]
  data.value.avatar = avatarImage
  if (avatarImage) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value.src = reader.result
    }
    reader.readAsDataURL(avatarImage)
  }
}

// KTP
const ktp_image = ref(null)
const ktpChange = async (e) => {
  e.preventDefault()

  const ktpImage = e.target.files[0]
  data.value.ktp_image = ktpImage
  if (ktpImage) {
    const reader = new FileReader()
    reader.onload = () => {
      ktp_image.value.src = reader.result
    }
    reader.readAsDataURL(ktpImage)
  }
}

// NPWP
const npwp_image = ref(null)
const npwpChange = async (e) => {
  e.preventDefault()

  const npwpImage = e.target.files[0]
  data.value.npwp_image = npwpImage
  if (npwpImage) {
    const reader = new FileReader()
    reader.onload = () => {
      npwp_image.value.src = reader.result
    }
    reader.readAsDataURL(npwpImage)
  }
}

// Validate
const rules = ref({
  name: [(v) => !!v || t('auth.validate.nameRequired'), (v) => v.length <= 50 || t('auth.validate.nameMaxLength')],
  email: [
    (v) => !!v || t('auth.validate.emailRequired'),
    (v) => /.+@.+/.test(v) || t('auth.validate.emailFormat'),
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          return !users.value.some((user) => user.email.toLowerCase() === v.toLowerCase() && user.id !== data.value.id) || t('auth.validate.emailAlready')
        }
      }
      return true
    }
  ]
})

// Disabled Button
const saveloading = ref(false)
const disabledButton = computed(() => saveloading.value || !data.value.name || !data.value.email)

// Edit
const editProfile = async () => {
  saveloading.value = true
  try {
    await useProfileStore().editprofile(data.value)

    toast.success(t('auth.successProfileEditMsg'))
    router.back()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.success(t('auth.successProfileEditMsg'))
  }
  saveloading.value = false
}
</script>
