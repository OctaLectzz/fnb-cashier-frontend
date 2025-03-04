<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.main.branch.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <div class="row justify-center">
            <!-- Image card -->
            <div class="col-lg-2 col-md-3 q-pa-md">
              <q-card class="q-pb-xl">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold">{{ $t('dashboard.main.branch.data.image') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="text-center q-pa-md">
                  <!-- Avatar -->
                  <div class="flex flex-center">
                    <q-responsive :ratio="4 / 3" class="col q-my-xs" style="width: 220px">
                      <img ref="image" :src="url + '/branches/' + data.image" />
                    </q-responsive>
                  </div>
                  <div class="text-subtitle2 text-grey-7">
                    {{ $t('public.imageType') }}
                    <span class="text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                  <q-btn color="primary" class="q-my-md" :label="$t('public.uploadBtn')" @click="$refs.imageInput.click()" no-caps />
                  <input type="file" ref="imageInput" style="display: none" accept="image/*" @change="imageChange" />
                </q-card-section>
              </q-card>
            </div>

            <!-- Details card -->
            <div class="col-lg-9 col-md-8 q-pa-md">
              <q-card class="q-pb-xl" style="height: 100%">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold">{{ $t('dashboard.main.branch.detailCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-sm">
                  <div class="row justify-center">
                    <!-- Name -->
                    <div class="col-md-5 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.branch.data.name') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="data.name" placeholder="Wine POS Solo" :rules="rules.name" outlined dense required autofocus />
                    </div>

                    <!-- Email -->
                    <div class="col-md-5 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.branch.data.email') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.email" type="email" placeholder="email@example.com" :rules="rules.email" v-lowercase outlined dense />
                    </div>

                    <!-- Phone Number -->
                    <div class="col-md-5 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.branch.data.phoneNumber') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.phone_number" placeholder="0897 - 1234 - 4444" mask="#### - #### - ######" outlined dense />
                    </div>

                    <!-- Status -->
                    <div class="col-md-5 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.branch.data.status') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-btn v-model="data.status" color="green" :label="$t('dashboard.main.branch.data.statusActive')" :outline="data.status == 0" class="q-mx-sm" @click="data.status = 1" />
                      <q-btn v-model="data.status" color="red" :label="$t('dashboard.main.branch.data.statusInactive')" :outline="data.status == 1" class="q-mx-sm" @click="data.status = 0" />
                    </div>

                    <!-- Address -->
                    <div class="col-md-10 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.branch.data.address') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.address" type="textarea" outlined dense />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" :label="t('public.cancelText')" flat v-close-popup />
          <q-btn type="submit" color="primary" :label="t('public.editText')" :loading="loading" :disable="disabledButton">
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { useBranchStore } from '/src/stores/branch-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  image: item.image,
  name: item.name,
  email: item.email,
  phone_number: item.phone_number,
  address: item.address,
  status: item.status
})

// Image
const image = ref(null)
const imageChange = async (e) => {
  e.preventDefault()

  const imageImage = e.target.files[0]
  data.value.image = e.target.files[0]
  if (imageImage) {
    const reader = new FileReader()
    reader.onload = () => {
      image.value.src = reader.result
    }
    reader.readAsDataURL(imageImage)
  }
}

// Validate
const rules = ref({
  name: [(v) => !!v || t('dashboard.main.branch.validate.nameRequired'), (v) => v.length <= 255 || t('dashboard.main.branch.validate.nameMaxLength')],
  email: [(v) => /.+@.+/.test(v) || t('dashboard.main.branch.validate.emailFormat')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name)

// Edit
const editData = async () => {
  loading.value = true
  try {
    await useBranchStore().edit(data.value)

    toast.success(t('dashboard.main.branch.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.main.branch.failedEditMsg'))
  }
  loading.value = false
}
</script>
