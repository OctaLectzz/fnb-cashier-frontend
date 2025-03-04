<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.main.category.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <!-- Name -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.main.category.data.name') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-input v-model="data.name" placeholder="Makanan" :rules="rules.name" outlined dense required autofocus />
          </div>

          <!-- Description -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.main.category.data.description') }}
              <span class="text-grey">{{ $t('public.optionalText') }}</span>
            </div>
            <q-input v-model="data.description" type="textarea" outlined dense />
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
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useCategoryStore } from '/src/stores/category-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  name: item.name,
  description: item.description
})

// Get Category
const categories = ref([])
const getCategory = async () => {
  try {
    const res = await useCategoryStore().all()

    categories.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getCategory()
})

// Validate
const rules = ref({
  name: [
    (v) => !!v || t('dashboard.main.category.validate.nameRequired'),
    (v) => v.length <= 50 || t('dashboard.main.category.validate.nameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (categories.value) {
          return (
            !categories.value.some((category) => category.name.toLowerCase() === v.toLowerCase() && category.name.toLowerCase() !== item.name.toLowerCase()) ||
            t('dashboard.main.category.validate.nameAlready')
          )
        }
      }
      return true
    }
  ]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name)

// Edit
const editData = async () => {
  loading.value = true
  try {
    await useCategoryStore().edit(data.value)

    toast.success(t('dashboard.main.category.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.main.category.failedEditMsg'))
  }
  loading.value = false
}
</script>
