<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.main.transaction.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <!-- Name -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.main.transaction.data.name') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-input v-model="data.name" placeholder="Makanan" :rules="rules.name" outlined dense required autofocus />
          </div>

          <!-- Payment Type -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.main.transaction.data.paymentType') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-select
              v-model="data.payment_type"
              :options="paymentTypeOptions"
              :placeholder="$t('dashboard.main.transaction.data.paymentTypePlaceholder')"
              @filter="paymentTypeFilter"
              input-debounce="0"
              use-input
              fill-input
              emit-value
              hide-selected
              outlined
              dense
              required
            />
          </div>

          <!-- Notes -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.main.transaction.data.notes') }}
              <span class="text-grey">{{ $t('public.optionalText') }}</span>
            </div>
            <q-input v-model="data.notes" type="textarea" outlined dense />
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
import { useTransactionStore } from '/src/stores/transaction-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  name: item.name,
  payment_type: item.payment_type,
  notes: item.notes
})

// Payment Type
const paymentType = ref([
  {
    label: t('dashboard.main.transaction.data.cash'),
    value: 'cash'
  },
  {
    label: t('dashboard.main.transaction.data.qris'),
    value: 'qris'
  },
  {
    label: t('dashboard.main.transaction.data.others'),
    value: 'others'
  }
])
const paymentTypeOptions = ref(paymentType)
const paymentTypeFilter = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    paymentTypeOptions.value = paymentType.value.filter((option) => {
      return option.value.toLowerCase().indexOf(needle) > -1
    })
  })
}

// Validate
const rules = ref({
  name: [(v) => !!v || t('dashboard.main.transaction.validate.nameRequired'), (v) => v.length <= 255 || t('dashboard.main.transaction.validate.nameMaxLength')],
  payment_type: [(v) => !!v || t('dashboard.main.transaction.validate.paymentTypeRequired')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name || !data.value.payment_type)

// Edit
const editData = async () => {
  loading.value = true
  try {
    await useTransactionStore().edit(data.value)

    toast.success(t('dashboard.main.transaction.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.main.transaction.failedEditMsg'))
  }
  loading.value = false
}
</script>
