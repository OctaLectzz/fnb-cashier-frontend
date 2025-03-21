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
      :title="$t('dashboard.main.product.titleText')"
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
        <q-btn v-if="hasPermission('create products')" color="primary" :label="$t('dashboard.main.product.createText')" class="shadow-3 q-my-sm" @click="createItemDialog = true" no-caps />
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

      <!-- SKU -->
      <template #body-cell-sku="props">
        <q-td :props="props">
          <div class="rounded-borders" :class="$q.dark.isActive ? 'bg-blue-10' : 'bg-blue-2'">
            <div class="text-bold q-pa-xs" :class="$q.dark.isActive ? 'text-blue-2' : 'text-blue-8'">{{ props.row.sku }}</div>
          </div>
        </q-td>
      </template>

      <!-- Image -->
      <template #body-cell-image="props">
        <q-td :props="props">
          <q-responsive :ratio="1 / 1" style="width: 120px" v-viewer>
            <img :src="url + '/products/' + props.row.image" class="dashboard-image" />
          </q-responsive>
        </q-td>
      </template>

      <!-- Name -->
      <template #body-cell-name="props">
        <q-td :props="props">
          <div class="text-h6 text-bold">{{ props.row.name }}</div>
          <div class="text-subtitle2">{{ props.row.category }}</div>
        </q-td>
      </template>

      <!-- Price -->
      <template #body-cell-price="props">
        <q-td :props="props">
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.minPurchase') }} :</span>
            {{ props.row.min_purchase }}
          </div>
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.purchasePrice') }} :</span>
            {{ rupiah(props.row.purchase_price) }}
          </div>
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.sellingPrice') }} :</span>
            {{ rupiah(props.row.selling_price) ?? '-' }}
          </div>
        </q-td>
      </template>

      <!-- Volume -->
      <template #body-cell-volume="props">
        <q-td :props="props">
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.unit') }} :</span>
            {{ props.row.unit }}
          </div>
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.weight') }} :</span>
            {{ props.row.weight ?? '-' }}
          </div>
          <div class="text-body1 q-ma-sm">
            <span class="text-bold">{{ $t('dashboard.main.product.data.volume') }} {{ $t('dashboard.main.product.data.volumeDetail') }} :</span>
            {{ props.row.length ?? '-' }}cm x {{ props.row.width ?? '-' }}cm x {{ props.row.height ?? '-' }}cm
          </div>
        </q-td>
      </template>

      <!-- Status -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip v-if="props.row.status == 1" color="green" text-color="white" icon="task_alt" :label="$t('dashboard.main.product.data.statusActive')" />
          <q-chip v-if="props.row.status == 0" color="red" text-color="white" icon="warning" :label="$t('dashboard.main.product.data.statusInactive')" />
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn v-if="hasPermission('edit products')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn v-if="hasPermission('delete products')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="dashboard-card q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-9'" class="dashboard-card q-pa-md">
            <!-- Image -->
            <q-responsive :ratio="1 / 1" style="width: 100%" v-viewer>
              <img :src="url + '/products/' + props.row.image" class="dashboard-image" />
            </q-responsive>

            <!-- Name -->
            <div class="text-h6 text-bold text-center">{{ props.row.name }}</div>

            <!-- Category -->
            <div class="text-subtitle2 text-center">{{ props.row.category }}</div>

            <q-card-section class="q-pb-xl">
              <!-- Price -->
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.minPurchase') }} :</span>
                {{ rupiah(props.row.min_purchase) }}
              </div>
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.purchasePrice') }} :</span>
                {{ rupiah(props.row.purchase_price) }}
              </div>
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.sellingPrice') }} :</span>
                {{ rupiah(props.row.selling_price) ?? '-' }}
              </div>

              <!-- Volume -->
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.unit') }} :</span>
                {{ props.row.unit }}
              </div>
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.weight') }} :</span>
                {{ props.row.weight ?? '-' }}
              </div>
              <div class="text-body1 q-ma-sm">
                <span class="text-bold">{{ $t('dashboard.main.product.data.volumeDetail') }} :</span>
                {{ props.row.length ?? '-' }}cm x {{ props.row.width ?? '-' }}cm x {{ props.row.height ?? '-' }}cm
              </div>

              <!-- Status -->
              <div class="absolute absolute-bottom-right">
                <q-chip v-if="props.row.status == 1" color="green" text-color="white" icon="task_alt" :label="$t('dashboard.main.product.data.statusActive')" />
                <q-chip v-if="props.row.status == 0" color="red" text-color="white" icon="warning" :label="$t('dashboard.main.product.data.statusInactive')" />
              </div>

              <!-- Action -->
              <div class="absolute absolute-bottom-left">
                <q-btn v-if="hasPermission('edit products')" color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                  <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
                    <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                  </q-dialog>
                </q-btn>
                <q-btn v-if="hasPermission('delete products')" color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
              </div>
            </q-card-section>
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
import { url, currentbranch } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useAuthStore } from '/src/stores/auth-store'
import { useProductStore } from '/src/stores/main/product-store'
import CreateItem from './CreateProduct.vue'
import EditItem from './EditProduct.vue'

const $q = useQuasar()
const { t } = useI18n()
const router = useRouter()
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useProductStore().branch(currentbranch)

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
      await useProductStore().delete(row.id)

      toast.success(t('dashboard.main.product.successDeleteMsg'))
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)

      toast.error(error.response.data.message || t('dashboard.main.product.failedDeleteMsg'))
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
    name: 'sku',
    field: 'sku',
    label: t('dashboard.main.product.data.sku'),
    align: 'center',
    sortable: true
  },
  {
    name: 'image',
    field: 'image',
    label: t('dashboard.main.product.data.image'),
    align: 'center'
  },
  {
    name: 'name',
    field: 'name',
    label: t('dashboard.main.product.data.name'),
    align: 'left',
    sortable: true
  },
  {
    name: 'price',
    field: 'price',
    label: t('dashboard.main.product.data.price'),
    align: 'left'
  },
  {
    name: 'volume',
    field: 'volume',
    label: t('dashboard.main.product.data.volume'),
    align: 'left'
  },
  {
    name: 'status',
    field: 'status',
    label: t('dashboard.main.product.data.status'),
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
