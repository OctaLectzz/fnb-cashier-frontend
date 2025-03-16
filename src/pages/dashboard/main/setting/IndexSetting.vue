<template>
  <q-page class="q-pa-md">
    <q-form @submit="editData">
      <q-card flat>
        <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-2'" class="q-py-md">
          <div class="text-h6 text-bold text-center">{{ $t('dashboard.main.setting.titleText') }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row justify-between">
            <div class="col-sm-4 col-xs-10 q-pa-md">
              <q-card class="q-pb-xl">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-9' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold text-center">{{ $t('dashboard.main.setting.photoCard') }}</div>
                </q-card-section>

                <q-separator />

                <!-- Logo -->
                <q-card-section class="text-center q-pa-lg">
                  <div class="text-body1 text-bold">{{ $t('dashboard.main.setting.data.logo') }}</div>
                  <div class="q-pa-md q-my-sm" style="border: 1px solid var(--q-primary); border-radius: 20px">
                    <img ref="logo" :src="url + '/settings/' + data.logo" :style="'width:' + data.logo_size + 'px'" style="height: auto" />
                  </div>

                  <div class="text-subtitle2 text-grey-7">{{ $t('public.imageType') }}</div>
                  <q-btn color="primary" class="q-my-md" :label="$t('public.uploadBtn')" @click="$refs.logoInput.click()" no-caps />
                  <input type="file" ref="logoInput" id="logoInput" style="display: none" accept="image/*" @change="logoChange" />
                </q-card-section>

                <!-- Logo Size -->
                <q-card-section class="q-pa-lg">
                  <div class="col-5 q-pa-sm">
                    <div class="text-bold">{{ $t('dashboard.main.setting.data.bigLogo') }}</div>
                    <q-input v-model="data.logo_size" type="number" :rules="rules.logo_size" outlined dense>
                      <template #append>
                        <div class="text-h6 text-bold">px</div>
                      </template>
                    </q-input>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Header -->
            <div class="col-sm-8 col-xs-10 q-pa-md">
              <q-card class="q-pb-xl" style="height: 100%">
                <q-card-section :class="$q.dark.isActive ? 'bg-blue-grey-9' : 'bg-blue-grey-1'">
                  <div class="text-body1 text-bold text-center">{{ $t('dashboard.main.setting.headerCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-md">
                  <!-- Title -->
                  <div class="col-10 q-pa-sm">
                    <div class="text-bold">{{ $t('dashboard.main.setting.data.settingName') }}</div>
                    <q-input v-model="data.title" :rules="rules.title" outlined dense />
                  </div>

                  <!-- Description -->
                  <div class="col-10 q-pa-sm">
                    <div class="text-bold">{{ $t('dashboard.main.setting.data.description') }}</div>
                    <q-input type="textarea" v-model="data.description" outlined dense />
                  </div>

                  <!-- Address -->
                  <div class="col-10 q-pa-sm">
                    <div class="text-bold">{{ $t('dashboard.main.setting.data.address') }}</div>
                    <q-input type="textarea" v-model="data.address" outlined dense />
                  </div>

                  <!-- About -->
                  <div class="col-10 q-pa-sm">
                    <div class="text-bold">{{ $t('dashboard.main.setting.data.aboutUs') }}</div>
                    <q-editor v-model="data.about" :toolbar="toolbar" :fonts="fonts" style="width: 100%; min-height: 470px" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center" class="text-primary q-py-md">
          <q-btn type="submit" color="primary" :label="$t('public.saveText')" :loading="loading" :disable="disabledButton" style="letter-spacing: 5px">
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { useSettingStore } from '/src/stores/setting-store'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const data = ref({
  id: 1,
  title: '',
  description: '',
  address: '',
  logo: '',
  logo_size: null,
  about: ''
})

// Get
const getItem = async () => {
  try {
    const res = await useSettingStore().show(1)

    data.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)

    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
}
onMounted(() => {
  getItem()
})

// Form Editor
const toolbar = ref([
  ['left', 'center', 'right', 'justify'],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'cut'],
  ['print', 'fullscreen'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: ['default_font', 'poppins', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
  ['undo', 'redo'],
  ['viewsource']
])
const fonts = ref({
  poppins: 'Poppins',
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
})

// Logo
const logo = ref(null)
const logoChange = async (e) => {
  e.preventDefault()

  const logoImage = e.target.files[0]
  data.value.logo = e.target.files[0]
  if (logoImage) {
    const reader = new FileReader()
    reader.onload = () => {
      logo.value.src = reader.result
    }
    reader.readAsDataURL(logoImage)
  }
}

// Validate
const rules = ref({
  title: [(v) => !!v || t('dashboard.main.setting.validate.titleRequired')],
  logo_size: [(v) => !!v || t('dashboard.main.setting.validate.logoSizeRequired')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value)

// Create
const editData = async () => {
  loading.value = true
  try {
    await useSettingStore().edit(data.value)

    toast.success(t('dashboard.main.setting.successEditMsg'))
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.main.setting.failedEditMsg'))
  }
  loading.value = false
}
</script>
