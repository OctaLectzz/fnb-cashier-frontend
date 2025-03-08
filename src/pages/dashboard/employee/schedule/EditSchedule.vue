<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.employee.schedule.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <!-- Name -->
          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="text-bold">
              {{ $t('dashboard.employee.schedule.data.name') }}
              <span class="text-red">{{ $t('public.requiredText') }}</span>
            </div>
            <q-input v-model="data.name" :placeholder="$t('dashboard.employee.schedule.data.namePlaceholder')" :rules="rules.name" outlined dense required autofocus />
          </div>

          <div class="col-md-10 col-xs-12 q-pa-sm">
            <div class="row justify-center">
              <!-- Start Time -->
              <div class="col-md-6 col-xs-12 q-pa-sm">
                <div class="text-bold">
                  {{ $t('dashboard.employee.schedule.data.startTime') }}
                  <span class="text-red">{{ $t('public.requiredText') }}</span>
                </div>
                <q-input v-model="data.start_time" :rules="rules.start_time" mask="time" outlined dense required>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="data.start_time">
                          <div class="row items-center justify-end">
                            <q-btn color="primary" label="Close" flat v-close-popup />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <!-- End Time -->
              <div class="col-md-6 col-xs-12 q-pa-sm">
                <div class="text-bold">
                  {{ $t('dashboard.employee.schedule.data.endTime') }}
                  <span class="text-red">{{ $t('public.requiredText') }}</span>
                </div>
                <q-input v-model="data.end_time" :rules="rules.end_time" mask="time" outlined dense required>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="data.end_time">
                          <div class="row items-center justify-end">
                            <q-btn color="primary" label="Close" flat v-close-popup />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
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
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useScheduleStore } from '/src/stores/employee/schedule-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  name: item.name,
  start_time: item.start_time,
  end_time: item.end_time
})

// Get Schedule
const schedules = ref([])
const getSchedule = async () => {
  try {
    const res = await useScheduleStore().all()

    schedules.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getSchedule()
})

// Validate
const rules = ref({
  name: [
    (v) => !!v || t('dashboard.employee.schedule.validate.nameRequired'),
    (v) => v.length <= 50 || t('dashboard.employee.schedule.validate.nameMaxLength'),
    (v) => {
      if (typeof v === 'string') {
        if (schedules.value) {
          return (
            !schedules.value.some((schedule) => schedule.name.toLowerCase() === v.toLowerCase() && schedule.name.toLowerCase() !== item.name.toLowerCase()) ||
            t('dashboard.employee.schedule.validate.nameAlready')
          )
        }
      }
      return true
    }
  ],
  start_time: [(v) => !!v || t('dashboard.employee.schedule.validate.startTimeRequired')],
  end_time: [(v) => !!v || t('dashboard.employee.schedule.validate.endTimeRequired')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name || !data.value.start_time || !data.value.end_time)

// Edit
const editData = async () => {
  loading.value = true
  try {
    await useScheduleStore().edit(data.value)

    toast.success(t('dashboard.employee.schedule.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.employee.schedule.failedEditMsg'))
  }
  loading.value = false
}
</script>
