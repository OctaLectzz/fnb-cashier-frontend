<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.main.product.editText') }}</div>
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
                  <div class="text-body1 text-bold">{{ $t('dashboard.main.product.data.image') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="text-center q-pa-md">
                  <!-- Avatar -->
                  <div class="flex flex-center">
                    <q-responsive :ratio="1 / 1" class="col q-my-xs" style="width: 220px">
                      <img ref="image" :src="url + '/products/' + data.image" />
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
                  <div class="text-body1 text-bold">{{ $t('dashboard.main.product.detailCard') }}</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pa-md">
                  <div class="row justify-center">
                    <!-- Name -->
                    <div class="col-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.name') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="data.name" :placeholder="$t('public.exampleText') + 'Chocolate Cake'" :rules="rules.name" outlined dense required autofocus />
                    </div>

                    <!-- Category -->
                    <div class="col-md-6 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.category') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-select v-model="data.category" :options="categoryOptions" @filter="categoryFilter" input-debounce="0" use-input fill-input emit-value hide-selected outlined dense required />
                    </div>

                    <!-- SKU -->
                    <div class="col-md-6 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.sku') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="data.sku" :placeholder="$t('public.exampleText') + 'CS0001'" :rules="rules.sku" v-uppercase outlined dense required />
                    </div>

                    <!-- Min Purchase -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.minPurchase') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.min_purchase" type="number" placeholder="Default : 1" mask="####" outlined dense />
                    </div>

                    <!-- Selling Price -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.sellingPrice') }}
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="format.selling_price" @input="updateRupiah('selling_price')" outlined dense />
                    </div>

                    <!-- Purchase Price -->
                    <div class="col-md-4 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.purchasePrice') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="format.purchase_price" :rules="rules.purchase_price" @input="updateRupiah('purchase_price')" outlined dense required />
                    </div>

                    <!-- Length -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.length') }}(cm)
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.length" type="number" placeholder="20 cm" mask="###" outlined dense />
                    </div>

                    <!-- Width -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.width') }}(cm)
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.width" type="number" placeholder="20 cm" mask="###" outlined dense />
                    </div>

                    <!-- Height -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.height') }}(cm)
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.height" type="number" placeholder="20 cm" mask="###" outlined dense />
                    </div>

                    <!-- Unit -->
                    <div class="col-md-4 col-xs-12 q-pa-sm">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.unit') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-input v-model="data.unit" :rules="rules.unit" placeholder="Porsi" outlined dense required />
                    </div>

                    <!-- Weight -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.weight') }}(gram)
                        <span class="text-grey">{{ $t('public.optionalText') }}</span>
                      </div>
                      <q-input v-model="data.weight" type="number" placeholder="20 gram" mask="###" outlined dense />
                    </div>

                    <!-- Status -->
                    <div class="col-md-4 col-xs-12 q-pa-sm q-pb-lg">
                      <div class="text-bold">
                        {{ $t('dashboard.main.product.data.status') }}
                        <span class="text-red">{{ $t('public.requiredText') }}</span>
                      </div>
                      <q-btn v-model="data.status" color="green" :label="$t('dashboard.main.product.data.statusActive')" :outline="data.status == 0" class="q-mx-xs" @click="data.status = 1" />
                      <q-btn v-model="data.status" color="red" :label="$t('dashboard.main.product.data.statusInactive')" :outline="data.status == 1" class="q-mx-xs" @click="data.status = 0" />
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
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url, currentbranch } from '/src/boot/axios'
import { rupiah } from '/src/boot/rupiah'
import { useProductStore } from '/src/stores/main/product-store'
import { useCategoryStore } from '/src/stores/main/category-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  image: item.image,
  sku: item.sku,
  name: item.name,
  category_id: item.category_id,
  category: item.category,
  min_purchase: item.min_purchase,
  selling_price: item.selling_price,
  purchase_price: item.purchase_price,
  unit: item.unit,
  weight: item.weight,
  length: item.length,
  width: item.width,
  height: item.height,
  status: item.status
})

// Category
const categories = ref([])
const categoryOptions = ref([])
const getCategory = async () => {
  try {
    const res = await useCategoryStore().branch(currentbranch)

    categories.value = res.data.data.map((category) => ({
      id: category.id,
      label: category.name,
      value: category.name
    }))
    categoryOptions.value = [...categories.value]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const categoryFilter = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    categoryOptions.value = categories.value.filter((option) => {
      return option.value.toLowerCase().indexOf(needle) > -1
    })
  })
}
onMounted(() => {
  getCategory()
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
  name: [(v) => !!v || t('dashboard.main.product.validate.nameRequired'), (v) => v.length <= 255 || t('dashboard.main.product.validate.nameMaxLength')],
  category: [(v) => !!v || t('dashboard.main.product.validate.categoryRequired')],
  sku: [(v) => !!v || t('dashboard.main.product.validate.skuRequired'), (v) => v.length <= 10 || t('dashboard.main.product.validate.skuMaxLength')],
  purchase_price: [(v) => !!v || t('dashboard.main.product.validate.purchasePriceRequired')],
  unit: [(v) => !!v || t('dashboard.main.product.validate.unitRequired'), (v) => v.length <= 10 || t('dashboard.main.product.validate.unitMaxLength')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name || !data.value.sku || !data.value.category || !data.value.purchase_price)

// Edit
const editData = async () => {
  loading.value = true
  try {
    if (data.value.category) {
      data.value.category_id = categories.value.find((category) => category.label === data.value.category).id
    }

    await useProductStore().edit(data.value)

    toast.success(t('dashboard.main.product.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.main.product.failedEditMsg'))
  }
  loading.value = false
}

// Format Input
const format = ref({
  selling_price: computed({
    get() {
      return rupiah(data.value.selling_price)
    },
    set(value) {
      const numericValue = value.replace(/[^\d]/g, '')
      data.value.selling_price = parseInt(numericValue, 10) || 0
    }
  }),
  purchase_price: computed({
    get() {
      return rupiah(data.value.purchase_price)
    },
    set(value) {
      const numericValue = value.replace(/[^\d]/g, '')
      data.value.purchase_price = parseInt(numericValue, 10) || 0
    }
  })
})
const updateRupiah = (field) => {
  format.value[field] = rupiah(data.value[field])
}
</script>
