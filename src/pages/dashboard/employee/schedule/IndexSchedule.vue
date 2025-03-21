<template>
  <q-page class="q-pa-lg">
    <!-- Breadcrumbs -->
    <q-breadcrumbs>
      <template v-slot:separator>
        <q-icon name="chevron_right" size="1.1rem" />
      </template>
      <q-breadcrumbs-el :label="$t('dashboard.employee.sidebar.homeMenu')" icon="home" :to="{ name: 'employee.home' }" :class="$q.dark.isActive ? 'text-white' : 'text-black'" class="text-bold" />
      <q-breadcrumbs-el :label="$t('dashboard.employee.sidebar.scheduleMenu')" />
    </q-breadcrumbs>

    <div class="row justify-between q-mt-xs q-mb-lg">
      <!-- Title -->
      <div class="col-sm-6 col-xs-12 flex items-center">
        <div class="text-h4 text-weight-bolder">{{ $t('dashboard.employee.sidebar.scheduleMenu') }}</div>
      </div>

      <!-- Create -->
      <div class="col-sm-6 col-xs-12">
        <q-btn v-if="hasPermission('create schedules')" color="primary" :label="$t('dashboard.employee.schedule.createText')" class="float-right" @click="createItemDialog = true" no-caps />
        <q-dialog v-model="createItemDialog" persistent>
          <CreateItem @created="itemCreated" />
        </q-dialog>
      </div>
    </div>

    <q-table
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 30]"
      :rows="currencyData"
      :columns="currencyColumns"
      :hide-header="grid"
      :grid="grid"
      :filter="filter"
      separator="cell"
      row-key="__index"
      class="dashboard-table"
      virtual-scroll
      flat
      bordered
      v-viewer
    >
      <!-- Top -->
      <template v-slot:top-right="props">
        <!-- Fullscreen -->
        <q-btn color="primary" :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="setFs(props)" flat round dense>
          <q-tooltip>{{ props.inFullscreen ? $t('dashboard.fullscreenExitBtn') : $t('dashboard.fullscreenBtn') }}</q-tooltip>
        </q-btn>

        <!-- Grid Switch -->
        <q-btn color="primary" :icon="grid ? 'list' : 'grid_on'" @click="grid = !grid" class="q-mr-sm" flat round dense>
          <q-tooltip>{{ grid ? $t('dashboard.listBtn') : $t('dashboard.gridBtn') }}</q-tooltip>
        </q-btn>

        <!-- Search -->
        <q-input v-model="filter" :placeholder="$t('public.searchText')" debounce="300" outlined dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Table -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" :class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-grey-2'" style="font-weight: bolder; font-size: 13px">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- No Data -->
      <template v-slot:no-data>
        <div class="text-body2 text-bold text-center q-pa-md">
          <q-icon name="warning_amber" size="25px" class="q-mx-sm" />
          {{ $t('dashboard.noDataText') }}
        </div>
      </template>

      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          {{ props.rowIndex + 1 }}
        </q-td>
      </template>

      <!-- Name -->
      <template #body-cell-name="props">
        <q-td :props="props">
          <div class="text-body1 text-bold">{{ props.row.name }}</div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn v-if="hasPermission('edit schedules')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn v-if="hasPermission('delete schedules')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="dashboard-card q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card class="dashboard-card q-pa-md">
            <q-card-section class="q-pb-xl">
              <!-- Name -->
              <div class="text-body1 q-my-md">
                <span class="text-bold">{{ $t('dashboard.employee.schedule.data.name') }} :</span>
                <span class="text-body1 q-mx-sm">{{ props.row.name }}</span>
              </div>
            </q-card-section>

            <!-- Action -->
            <div class="absolute absolute-bottom-right q-pa-md">
              <q-btn v-if="hasPermission('edit schedules')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                <q-dialog v-model="props.row.editItemDialog" persistent>
                  <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                </q-dialog>
              </q-btn>
              <q-btn v-if="hasPermission('delete schedules')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
            </div>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useQuasar } from 'quasar'
import { useAuthStore } from '/src/stores/auth-store'
import { useScheduleStore } from '/src/stores/employee/schedule-store'
import CreateItem from './CreateSchedule.vue'
import EditItem from './EditSchedule.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useScheduleStore().all()

    items.value = res.data.data
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

// Create
const createItemDialog = ref(false)
const itemCreated = () => {
  createItemDialog.value = false
  getItem()
}

// Edit
const itemEdited = (item) => {
  item.editItemDialog = false
  getItem()
}

// Delete
const deleteItemDialog = (row) => {
  $q.dialog({
    title: t('dashboard.warningTitle'),
    message: t('dashboard.warningText'),
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useScheduleStore().delete(row.id)

      toast.success(t('dashboard.employee.schedule.successDeleteMsg'))
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || t('dashboard.employee.schedule.failedDeleteMsg'))
    }
  })
}

// Table
const currencyData = items
const currencyColumns = [
  {
    name: 'id',
    field: 'id',
    label: 'No',
    align: 'center'
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.employee.schedule.data.name'),
    align: 'center',
    sortable: true
  },
  {
    name: 'start_time',
    field: 'start_time',
    label: t('dashboard.employee.schedule.data.startTime'),
    align: 'center',
    sortable: true
  },
  {
    name: 'end_time',
    field: 'end_time',
    label: t('dashboard.employee.schedule.data.endTime'),
    align: 'center',
    sortable: true
  },
  {
    name: 'action',
    field: 'action',
    label: t('dashboard.actionTable'),
    align: 'center'
  }
]
const filter = ref('')
const grid = ref(false)
const pagination = ref({})
const setFs = (props) => {
  props.toggleFullscreen()
}
</script>
