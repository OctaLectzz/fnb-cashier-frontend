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
      :title="$t('dashboard.employee.role.titleText')"
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
        <q-btn color="primary" :label="$t('dashboard.employee.role.createText')" class="shadow-3 q-my-sm" @click="createItemDialog = true" no-caps />
        <q-dialog v-model="createItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
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

      <!-- Name -->
      <template #body-cell-name="props">
        <q-td :props="props">
          <div class="text-body1 text-bold">{{ props.row.name }}</div>
        </q-td>
      </template>

      <!-- Permissions -->
      <template #body-cell-permissions="props">
        <q-td :props="props">
          <div class="flex flex-center">
            <div class="rounded-borders q-pa-xs q-mx-sm" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
              <div class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.permissions.length }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
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
              <!-- Name -->
              <div class="text-body1 q-my-md">
                <span class="text-bold">{{ $t('dashboard.employee.role.data.name') }} :</span>
                <span class="text-body1 q-mx-sm">{{ props.row.name }}</span>
              </div>

              <!-- Permissions -->
              <div class="text-body1 q-my-md">
                <span class="text-bold">{{ $t('dashboard.employee.role.data.permissions') }} :</span>
                <span class="rounded-borders q-pa-xs q-mx-sm" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
                  <span class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.permissions.length }}</span>
                </span>
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
import { useRoleStore } from '/src/stores/employee/role-store'
import CreateItem from './CreateRole.vue'
import EditItem from './EditRole.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useRoleStore().all()

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
      await useRoleStore().delete(row.id)

      toast.success(t('dashboard.employee.role.successDeleteMsg'))
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || t('dashboard.employee.role.failedDeleteMsg'))
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
    label: t('dashboard.employee.role.data.name'),
    align: 'left',
    sortable: true
  },
  {
    name: 'permissions',
    field: 'permissions',
    label: t('dashboard.employee.role.data.permissions'),
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
