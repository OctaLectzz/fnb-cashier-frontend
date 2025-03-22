<template>
  <q-page class="q-pa-lg">
    <!-- Breadcrumbs -->
    <q-breadcrumbs>
      <template v-slot:separator>
        <q-icon name="chevron_right" size="1.1rem" />
      </template>
      <q-breadcrumbs-el :label="$t('dashboard.main.sidebar.homeMenu')" icon="home" :to="{ name: 'main.home' }" :class="$q.dark.isActive ? 'text-white' : 'text-black'" class="text-bold" />
      <q-breadcrumbs-el :label="$t('dashboard.main.sidebar.transactionHistoryMenu')" />
    </q-breadcrumbs>

    <div class="row justify-between q-mt-xs q-mb-lg">
      <!-- Title -->
      <div class="col-sm-6 col-xs-12 flex items-center">
        <div class="text-h4 text-weight-bolder">{{ $t('dashboard.main.sidebar.transactionHistoryMenu') }}</div>
      </div>

      <!-- Create -->
      <div class="col-sm-6 col-xs-12">
        <q-btn v-if="hasPermission('create transactions')" :to="{ name: 'main.transaction' }" color="primary" :label="$t('dashboard.main.transaction.createText')" class="float-right" no-caps />
      </div>
    </div>

    <!-- Loading -->
    <TableLoading v-if="loading" />

    <q-table
      v-else
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

      <!-- Invoice -->
      <template #body-cell-invoice="props">
        <q-td :props="props">
          <div class="rounded-borders" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
            <div class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.invoice }}</div>
          </div>
        </q-td>
      </template>

      <!-- Name -->
      <template #body-cell-name="props">
        <q-td :props="props">
          <div class="text-body1 text-bold">{{ props.row.name }}</div>
        </q-td>
      </template>

      <!-- Payment Type -->
      <template #body-cell-payment_type="props">
        <q-td :props="props">
          <div class="text-subtitle2">
            {{
              props.row.payment_type == 'cash'
                ? $t('dashboard.main.transaction.data.cash')
                : props.row.payment_type == 'qris'
                  ? $t('dashboard.main.transaction.data.qris')
                  : $t('dashboard.main.transaction.data.others')
            }}
          </div>
        </q-td>
      </template>

      <!-- Price -->
      <template #body-cell-price="props">
        <q-td :props="props">
          <div>{{ rupiah(props.row.payment_amount) }}</div>
        </q-td>
      </template>

      <!-- Notes -->
      <template #body-cell-notes="props">
        <q-td :props="props">
          <div class="text-long">
            {{ isExpanded[props.row.id] ? props.row.notes : truncatedText(props.row.notes) }}
            <span v-if="wordCount(props.row.notes) > 10" class="cursor-pointer text-primary text-link" @click="toggleExpand(props.row.id)">
              {{ isExpanded[props.row.id] ? $t('public.showLess') : $t('public.showMore') }}
            </span>
          </div>
        </q-td>
      </template>

      <!-- Created At -->
      <template #body-cell-created_at="props">
        <q-td :props="props">
          <div class="rounded-borders" :class="$q.dark.isActive ? 'bg-yellow-10' : 'bg-yellow-3'">
            <div class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-yellow-2' : 'text-yellow-9'">{{ props.row.created_at }}</div>
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="blue" field="show" icon="visibility" class="q-mx-xs" @click="props.row.showItemDialog = true" dense round>
            <q-dialog v-model="props.row.showItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <ShowItem :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn v-if="hasPermission('edit transactions')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn v-if="hasPermission('delete transactions')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="dashboard-card q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card class="dashboard-card q-pa-md">
            <q-card-section class="q-pb-xl">
              <!-- Invoice -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.invoice') }} :</span>
                {{ props.row.invoice }}
              </div>

              <!-- Name -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.name') }} :</span>
                {{ props.row.name }}
              </div>

              <!-- Price -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.price') }} :</span>
                {{ rupiah(props.row.payment_amount) }}
              </div>

              <!-- Payment Type -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.paymentType') }} :</span>
                {{
                  props.row.payment_type == 'cash'
                    ? $t('dashboard.main.transaction.data.cash')
                    : props.row.payment_type == 'qris'
                      ? $t('dashboard.main.transaction.data.qris')
                      : $t('dashboard.main.transaction.data.others')
                }}
              </div>

              <!-- Notes -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.notes') }} :</span>
                <span class="text-long q-mx-xs">
                  {{ isExpanded[props.row.id] ? props.row.notes : truncatedText(props.row.notes) }}
                  <span v-if="wordCount(props.row.notes) > 10" class="cursor-pointer text-primary text-link" @click="toggleExpand(props.row.id)">
                    {{ isExpanded[props.row.id] ? $t('public.showLess') : $t('public.showMore') }}
                  </span>
                </span>
              </div>

              <!-- Created At -->
              <div class="text-body1 q-my-sm">
                <span class="text-bold">{{ $t('dashboard.main.transaction.data.createdAt') }} :</span>
                {{ props.row.created_at }}
              </div>
            </q-card-section>

            <!-- Action -->
            <div class="absolute absolute-bottom-right q-pa-md">
              <q-btn color="blue" field="show" icon="visibility" class="q-mx-xs" @click="props.row.showItemDialog = true" dense round>
                <q-dialog v-model="props.row.showItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
                  <ShowItem :item="props.row" />
                </q-dialog>
              </q-btn>
              <q-btn v-if="hasPermission('edit transactions')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                <q-dialog v-model="props.row.editItemDialog" persistent>
                  <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                </q-dialog>
              </q-btn>
              <q-btn v-if="hasPermission('delete transactions')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
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
import { currentbranch } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useAuthStore } from '/src/stores/auth-store'
import { useTransactionStore } from '/src/stores/main/transaction-store'
import TableLoading from '/src/components/TableLoading.vue'
import EditItem from './EditHistory.vue'
import ShowItem from './ShowHistory.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Get
const items = ref([])
const loading = ref(false)
const getItem = async () => {
  loading.value = true
  try {
    const res = await useTransactionStore().branch(currentbranch)

    items.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)

    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
  loading.value = false
}
onMounted(() => {
  getItem()
})

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
      await useTransactionStore().delete(row.id)

      toast.success(t('dashboard.main.transaction.successDeleteMsg'))
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || t('dashboard.main.transaction.failedDeleteMsg'))
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
    name: 'invoice',
    field: 'invoice',
    label: t('dashboard.main.transaction.data.invoice'),
    align: 'center',
    sortable: true
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.main.transaction.data.name'),
    align: 'center',
    sortable: true
  },
  {
    name: 'payment_type',
    field: 'payment_type',
    label: t('dashboard.main.transaction.data.paymentType'),
    align: 'center',
    sortable: true
  },
  {
    name: 'price',
    field: 'payment_amount',
    label: t('dashboard.main.transaction.data.price'),
    align: 'left',
    sortable: true
  },
  {
    name: 'notes',
    field: 'notes',
    label: t('dashboard.main.transaction.data.notes'),
    align: 'left',
    sortable: true
  },
  {
    name: 'created_at',
    field: 'created_at',
    label: t('dashboard.main.transaction.data.createdAt'),
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

// Show More
const isExpanded = ref({})
const toggleExpand = (id) => {
  isExpanded.value[id] = !isExpanded.value[id]
}
const wordCount = (text) => (text ? text.split(' ').length : 0)
const truncatedText = (text) => {
  if (!text) return '-'
  const words = text.split(' ')
  return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text
}
</script>
