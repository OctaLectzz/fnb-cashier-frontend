<template>
  <q-page class="q-py-md">
    <!-- Loading -->
    <q-form v-if="loading" @submit="editProfile">
      <div class="row justify-center">
        <!-- Avatar card -->
        <div class="col-md-3 col-xs-12 q-ma-md">
          <q-skeleton width="100%" height="500px" />
        </div>

        <!-- Account details card -->
        <div class="col-md-8 col-xs-12 q-ma-md">
          <q-skeleton width="100%" height="500px" />
        </div>
      </div>

      <!-- Save -->
      <q-skeleton width="90px" height="38px" class="float-right q-mx-xl" />
      <hr class="q-my-md" />
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
                <img ref="avatar" :src="url + '/avatars/' + data.avatar" />
              </q-avatar>
              <div class="text-subtitle2 text-grey-7">{{ $t('profile.imageType') }}</div>
              <q-btn color="primary" class="q-my-md" :label="$t('profile.uploadBtn')" @click="$refs.avatarInput.click()" no-caps />
              <input type="file" ref="avatarInput" id="avatarInput" style="display: none" accept="image/*" @change="avatarChange" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Account details card -->
        <div class="col-md-8 col-xs-11 q-pa-md">
          <q-card class="q-pb-xl" style="height: 100%">
            <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
              <div class="text-body1 text-bold">{{ $t('profile.accountDetailsCard') }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-sm">
              <div class="row justify-center">
                <!-- Name -->
                <div class="col-10 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.nameForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                  <q-input v-model="data.name" placeholder="Octavyan Putra" :rules="rules.name" outlined dense required autofocus />
                </div>

                <!-- Email -->
                <div class="col-10 q-pa-sm">
                  <div class="text-bold">
                    {{ $t('auth.emailForm') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                  <q-input v-model="data.email" type="email" placeholder="email@example.com" :rules="rules.email" v-lowercase outlined dense required />
                </div>

                <!-- Phone Number -->
                <div class="col-10 q-pa-sm">
                  <div class="text-bold">{{ $t('auth.phoneNumberForm') }}</div>
                  <q-input v-model="data.phone_number" placeholder="0897 - 1234 - 4444" mask="#### - #### - ######" outlined dense />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Save -->
      <q-btn type="submit" :label="t('public.saveText')" color="primary" class="float-right q-mx-xl" :loading="saveloading" :disable="disabledButton">
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>
      <hr class="q-my-md" />
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
  phone_number: ''
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
