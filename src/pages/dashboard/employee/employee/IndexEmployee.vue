<template>
  <q-page class="q-pa-md">
    <q-table
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 30]"
      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'"
      :rows="currencyData"
      :columns="currencyColumns"
      :hide-header="grid"
      :grid="grid"
      :filter="filter"
      separator="cell"
      :title="$t('dashboard.employee.employee.titleText')"
      row-key="__index"
      class="dashboard-table"
      virtual-scroll
      flat
      bordered
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

      <!-- Create -->
      <template v-slot:top-left>
        <q-btn color="primary" :label="$t('dashboard.employee.employee.createText')" class="shadow-3 q-my-sm" @click="createItemDialog = true" no-caps />
        <q-dialog v-model="createItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height maximized persistent>
          <CreateItem @created="itemCreated" />
        </q-dialog>
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

      <!-- NIP -->
      <template #body-cell-nip="props">
        <q-td :props="props">
          <div class="flex flex-center">
            <div class="rounded-borders q-pa-xs q-mx-sm" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
              <div class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.nip }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Name -->
      <template #body-cell-name="props">
        <q-td :props="props">
          <q-item>
            <q-item-section avatar>
              <q-avatar size="50px">
                <img :src="url + '/employees/avatars/' + props.row.avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body1 text-bold">{{ props.row.name }}</div>
              <div class="text-subtitle2">{{ props.row.email }} | {{ props.row.phone_number }}</div>
            </q-item-section>
          </q-item>
        </q-td>
      </template>

      <!-- Schedule -->
      <template #body-cell-schedule="props">
        <q-td :props="props">
          <div class="text-body1 text-bold">{{ props.row.schedule.name }}</div>
          <div class="text-subtitle2">{{ props.row.schedule.start_time }} - {{ props.row.schedule.end_time }}</div>
        </q-td>
      </template>

      <!-- Employment Status -->
      <template #body-cell-employment_status="props">
        <q-td :props="props">
          <q-badge
            color="primary"
            :label="
              props.row.employment_status === 'permanent'
                ? $t('dashboard.employee.employee.data.permanentEmploymentStatus')
                : props.row.employment_status === 'contract'
                ? $t('dashboard.employee.employee.data.contractEmploymentStatus')
                : $t('dashboard.employee.employee.data.freelanceEmploymentStatus')
            "
            class="text-body2"
          />
        </q-td>
      </template>

      <!-- Status -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.status"
            :color="props.row.status === false ? 'red' : 'green'"
            size="lg"
            checked-icon="check"
            unchecked-icon="clear"
            :keep-color="props.row.status === false"
            :disable="props.row.isProcessing"
            @click="editStatus(props.row)"
          />
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height maximized persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="dashboard-card q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'" class="dashboard-card q-pa-md">
            <q-card-section class="q-pb-xl">
              <div class="row justify-center q-mb-xl">
                <!-- Avatar -->
                <div class="col-12 flex flex-center">
                  <q-avatar size="100px">
                    <img :src="url + '/employees/avatars/' + props.row.avatar" />
                  </q-avatar>
                </div>

                <!-- Name | Email | Phone Number -->
                <div class="col-12 text-center">
                  <div class="text-body1 text-bold">{{ props.row.name }}</div>
                  <div class="text-subtitle2">{{ props.row.email }}</div>
                  <div class="text-subtitle2">{{ props.row.phone_number }}</div>
                </div>
              </div>

              <!-- NIP -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">NIP :</span>
                <span class="rounded-borders q-pa-xs q-mx-sm" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
                  <span class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.nip }}</span>
                </span>
              </div>

              <!-- Position -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.position') }} :</div>
                <div class="text-body1">{{ props.row.position }}</div>
              </div>

              <!-- Schedule -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.schedule') }} :</div>
                <div class="text-body1">{{ props.row.schedule.name }} ({{ props.row.schedule.start_time }} - {{ props.row.schedule.end_time }})</div>
              </div>

              <!-- Domicile -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.domicile') }} :</div>
                <div class="text-body1">{{ props.row.domicile }}</div>
              </div>

              <!-- Date Joined -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.dateJoined') }} :</div>
                <div class="text-body1">{{ props.row.date_joined }}</div>
              </div>

              <!-- Employment Status -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.employmentStatus') }} :</div>
                <div class="text-body1">
                  <q-badge
                    color="primary"
                    :label="
                      props.row.employment_status === 'permanent'
                        ? $t('dashboard.employee.employee.data.permanentEmploymentStatus')
                        : props.row.employment_status === 'contract'
                        ? $t('dashboard.employee.employee.data.contractEmploymentStatus')
                        : $t('dashboard.employee.employee.data.freelanceEmploymentStatus')
                    "
                    class="text-body2"
                  />
                </div>
              </div>

              <!-- Status -->
              <div class="text-body1 q-my-sm">
                <div class="text-bold">{{ $t('dashboard.employee.employee.data.status') }} :</div>
                <div class="text-body1">
                  <q-toggle
                    v-model="props.row.status"
                    :color="props.row.status === false ? 'red' : 'green'"
                    size="lg"
                    checked-icon="check"
                    unchecked-icon="clear"
                    :keep-color="props.row.status === false"
                    :disable="props.row.isProcessing"
                    @click="editStatus(props.row)"
                  />
                </div>
              </div>
            </q-card-section>

            <!-- Action -->
            <div class="absolute absolute-bottom-right q-pa-md">
              <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                <q-dialog v-model="props.row.editItemDialog" persistent>
                  <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                </q-dialog>
              </q-btn>
              <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
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
import { url } from '/src/boot/axios'
import { useEmployeeStore } from '/src/stores/employee/employee-store'
import CreateItem from './CreateEmployee.vue'
import EditItem from './EditEmployee.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useEmployeeStore().all()

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

// Edit Status
const editStatus = async (item) => {
  if (item.isProcessing) return
  item.isProcessing = true

  $q.dialog({
    title: t('dashboard.warningTitle'),
    message: item.status === false ? t('dashboard.employee.employee.unactiveText') : t('dashboard.employee.employee.activeText'),
    cancel: true,
    persistent: true
  })
    .onOk(async () => {
      try {
        item.status = item.status === true ? 1 : 0
        item.date_joined = item.date_joined_edit

        await useEmployeeStore().edit(item)

        toast.success(t('dashboard.employee.employee.successEditStatusMsg'))
        getItem()
      } catch (error) {
        console.error('Error submitting form:', error)

        toast.error(error.response.data.message || t('dashboard.employee.employee.failedEditStatusMsg'))
      }
    })
    .onCancel(() => {
      getItem()
    })

  item.isProcessing = false
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
      await useEmployeeStore().delete(row.id)

      toast.success(t('dashboard.employee.employee.successDeleteMsg'))
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || t('dashboard.employee.employee.failedDeleteMsg'))
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
    name: 'nip',
    field: 'nip',
    label: t('dashboard.employee.employee.data.nip'),
    align: 'center',
    sortable: true
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.employee.employee.data.name'),
    align: 'left'
  },
  {
    name: 'position',
    field: 'position',
    label: t('dashboard.employee.employee.data.position'),
    align: 'center',
    sortable: true
  },
  {
    name: 'schedule',
    field: 'schedule',
    label: t('dashboard.employee.employee.data.schedule'),
    align: 'center'
  },
  {
    name: 'domicile',
    field: 'domicile',
    label: t('dashboard.employee.employee.data.domicile'),
    align: 'left',
    sortable: true
  },
  {
    name: 'date_joined',
    field: 'date_joined',
    label: t('dashboard.employee.employee.data.dateJoined'),
    align: 'center',
    sortable: true
  },
  {
    name: 'employment_status',
    field: 'employment_status',
    label: t('dashboard.employee.employee.data.employmentStatus'),
    align: 'center',
    sortable: true
  },
  {
    name: 'status',
    field: 'status',
    label: t('dashboard.employee.employee.data.status'),
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
