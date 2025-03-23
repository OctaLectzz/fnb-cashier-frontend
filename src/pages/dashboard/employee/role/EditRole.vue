<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">{{ $t('dashboard.employee.role.editText') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <div class="row justify-center">
            <!-- Name -->
            <div class="col-8 q-pa-sm">
              <div class="text-bold">
                {{ $t('dashboard.employee.role.data.name') }}
                <span class="text-red">{{ $t('public.requiredText') }}</span>
              </div>
              <q-input v-model="data.name" :placeholder="$t('public.exampleText') + $t('dashboard.employee.role.data.namePlaceholder')" :rules="rules.name" outlined dense required autofocus />
            </div>

            <!-- Select All -->
            <div class="col-4 q-pa-sm">
              <div class="text-bold">
                {{ $t('dashboard.employee.role.data.selectAll') }}
                <span class="text-red">{{ $t('public.requiredText') }}</span>
              </div>
              <q-toggle v-model="data.selectAll" color="primary" size="xl" keep-color @click="selectAllPermissions" />
              <div class="text-body2">{{ $t('dashboard.employee.role.data.permissionsPlaceholder') }}</div>
            </div>

            <div class="col-12">{{ data.permissions }}</div>
          </div>

          <q-separator class="q-my-md" />

          <!-- Pages -->
          <div class="text-h5 text-weight-bolder">{{ $t('dashboard.employee.role.data.pagesSection') }}</div>
          <div v-for="(permissionPage, index) in permissionPages" :key="index" class="q-pa-sm">
            <span class="text-h6 text-bold">{{ permissionPage.title }}</span>
            <q-checkbox v-model="permissionPage.selectAll" :label="$t('dashboard.employee.role.data.selectAll')" @click="selectPermissionPages(permissionPage)" />

            <!-- Permissions -->
            <div class="row">
              <div v-for="(permission, index) in permissionPage.permissions" :key="index" class="col-sm-3 col-xs-12 q-pa-sm">
                <q-checkbox v-model="data.permissions" :val="permission.value" :label="$t(permission.label)" class="col-6" @update:model-value="updateSelections" />
              </div>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <!-- Resources -->
          <div class="text-h5 text-weight-bolder">{{ $t('dashboard.employee.role.data.resourcesSection') }}</div>
          <div v-for="(permissionResource, index) in permissionResources" :key="index" class="q-pa-sm">
            <span class="text-h6 text-bold">{{ permissionResource.title }}</span>
            <q-checkbox v-model="permissionResource.selectAll" :label="$t('dashboard.employee.role.data.selectAll')" @click="selectPermissionResources(permissionResource)" />

            <!-- Permissions -->
            <div class="row">
              <div v-for="(permissionMenu, index) in permissionResource.permissionMenus" :key="index" class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
                <q-list bordered class="rounded-borders">
                  <q-expansion-item default-opened>
                    <template v-slot:header>
                      <q-item-section class="text-body1 text-bold">{{ permissionMenu.name }}</q-item-section>

                      <q-item-section side>
                        <div class="row items-center">
                          <q-checkbox v-model="permissionMenu.selectAll" :label="$t('dashboard.employee.role.data.selectAll')" @click="selectPermissionResourceMenus(permissionMenu)" />
                        </div>
                      </q-item-section>
                    </template>

                    <q-separator />

                    <q-card>
                      <q-card-section class="row">
                        <q-checkbox
                          v-for="(permission, subIndex) in permissionMenu.permissions"
                          :key="subIndex"
                          v-model="data.permissions"
                          :val="permission.value"
                          :label="$t(permission.label)"
                          class="col-6"
                          @update:model-value="updateSelections"
                        />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
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
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { useRoleStore } from '/src/stores/employee/role-store'

const { t } = useI18n()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  name: item.name,
  permissions: item.permissions,
  selectAll: false
})

// Permission Pages
const permissionPages = ref([
  {
    title: t('dashboard.employee.role.data.homeMenu'),
    selectAll: false,
    permissions: [
      { value: 'home attendance', label: 'dashboard.employee.role.data.attendanceText' },
      { value: 'home cashier', label: 'dashboard.employee.role.data.cashierText' },
      { value: 'home sales', label: 'dashboard.employee.role.data.salesText' },
      { value: 'home report', label: 'dashboard.employee.role.data.reportText' }
    ]
  },
  {
    title: t('dashboard.employee.role.data.dashboardMenu'),
    selectAll: false,
    permissions: [
      { value: 'change branches', label: 'dashboard.employee.role.data.changeBranchesText' },
      { value: 'dashboard main', label: 'dashboard.menu.mainMenu' },
      { value: 'dashboard employee', label: 'dashboard.menu.employeeMenu' },
      { value: 'dashboard inventory', label: 'dashboard.menu.inventoryMenu' },
      { value: 'dashboard accounting', label: 'dashboard.menu.accountingMenu' }
    ]
  }
])

// Permission Resources
const permissionResources = ref([
  {
    title: t('dashboard.menu.mainMenu'),
    selectAll: false,
    permissionMenus: [
      {
        name: t('dashboard.main.sidebar.branchMenu'),
        permissions: [
          { value: 'view branches', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create branches', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit branches', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete branches', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      },
      {
        name: t('dashboard.main.sidebar.cashierMenu'),
        permissions: [{ value: 'view cashier', label: 'dashboard.employee.role.data.viewText' }],
        selectAll: false
      },
      {
        name: t('dashboard.main.sidebar.categoryMenu'),
        permissions: [
          { value: 'view categories', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create categories', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit categories', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete categories', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      },
      {
        name: t('dashboard.main.sidebar.productMenu'),
        permissions: [
          { value: 'view products', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create products', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit products', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete products', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      },
      {
        name: t('dashboard.main.sidebar.transactionMenu'),
        permissions: [
          { value: 'view transactions', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create transactions', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit transactions', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete transactions', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      }
    ]
  },
  {
    title: t('dashboard.menu.employeeMenu'),
    selectAll: false,
    permissionMenus: [
      {
        name: t('dashboard.employee.sidebar.roleMenu'),
        permissions: [
          { value: 'view roles', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create roles', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit roles', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete roles', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      },
      {
        name: t('dashboard.employee.sidebar.scheduleMenu'),
        permissions: [
          { value: 'view schedules', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create schedules', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit schedules', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete schedules', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      },
      {
        name: t('dashboard.employee.sidebar.employeeMenu'),
        permissions: [
          { value: 'view employees', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create employees', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit employees', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete employees', label: 'dashboard.employee.role.data.deleteText' }
        ],
        selectAll: false
      }
    ]
  }
])

// Select All Permissions
const selectAllPermissions = () => {
  if (data.value.selectAll) {
    // Permission Resources
    permissionResources.value.forEach((permissionResource) => {
      permissionResource.selectAll = true
      permissionResource.permissionMenus.forEach((menu) => {
        menu.selectAll = true
        menu.permissions.forEach((permission) => {
          if (!data.value.permissions.includes(permission.value)) {
            data.value.permissions.push(permission.value)
          }
        })
      })
    })

    // Permission Pages
    permissionPages.value.forEach((permissionPage) => {
      permissionPage.selectAll = true
      permissionPage.permissions.forEach((permission) => {
        if (!data.value.permissions.includes(permission.value)) {
          data.value.permissions.push(permission.value)
        }
      })
    })
  } else {
    // Permission Resources
    permissionResources.value.forEach((permissionResource) => {
      permissionResource.selectAll = false
      permissionResource.permissionMenus.forEach((menu) => {
        menu.selectAll = false
        menu.permissions.forEach((permission) => {
          const index = data.value.permissions.indexOf(permission.value)
          if (index > -1) {
            data.value.permissions.splice(index, 1)
          }
        })
      })
    })

    // Permission Pages
    permissionPages.value.forEach((permissionPage) => {
      permissionPage.selectAll = false
      permissionPage.permissions.forEach((permission) => {
        const index = data.value.permissions.indexOf(permission.value)
        if (index > -1) {
          data.value.permissions.splice(index, 1)
        }
      })
    })
  }
}

// Update Selections
const updateSelections = () => {
  // Permission Resources
  permissionResources.value.forEach((permissionResource) => {
    permissionResource.permissionMenus.forEach((menu) => {
      menu.selectAll = menu.permissions.every((permission) => data.value.permissions.includes(permission.value))
    })
    permissionResource.selectAll = permissionResource.permissionMenus.every((menu) => menu.selectAll)
  })
  data.value.selectAll = permissionResources.value.every((permissionResource) => permissionResource.selectAll)

  // Permission Pages
  permissionPages.value.forEach((permissionPage) => {
    permissionPage.selectAll = permissionPage.permissions.every((permission) => data.value.permissions.includes(permission.value))
  })

  data.value.selectAll = permissionPages.value.every((permissionPage) => permissionPage.selectAll) && permissionResources.value.every((permissionResource) => permissionResource.selectAll)
}
onMounted(() => {
  updateSelections()
})

// Select Permission Pages
const selectPermissionPages = (permissionPage) => {
  if (permissionPage.selectAll) {
    permissionPage.selectAll = true
    permissionPage.permissions.forEach((permission) => {
      if (!data.value.permissions.includes(permission.value)) {
        data.value.permissions.push(permission.value)
      }
    })
  } else {
    permissionPage.selectAll = false
    permissionPage.permissions.forEach((permission) => {
      const index = data.value.permissions.indexOf(permission.value)
      if (index > -1) {
        data.value.permissions.splice(index, 1)
      }
    })
  }

  data.value.selectAll =
    permissionPages.value.length > 0 &&
    permissionResources.value.length > 0 &&
    permissionPages.value.every((permissionPage) => permissionPage.selectAll) &&
    permissionResources.value.every((permissionResource) => permissionResource.selectAll)
}

// Select Permission Resources
const selectPermissionResources = (permissionResource) => {
  if (permissionResource.selectAll) {
    permissionResource.permissionMenus.forEach((menu) => {
      menu.selectAll = true
      menu.permissions.forEach((permission) => {
        if (!data.value.permissions.includes(permission.value)) {
          data.value.permissions.push(permission.value)
        }
      })
    })
  } else {
    permissionResource.permissionMenus.forEach((menu) => {
      menu.selectAll = false
      menu.permissions.forEach((permission) => {
        const index = data.value.permissions.indexOf(permission.value)
        if (index > -1) {
          data.value.permissions.splice(index, 1)
        }
      })
    })
  }

  data.value.selectAll =
    permissionPages.value.length > 0 &&
    permissionResources.value.length > 0 &&
    permissionPages.value.every((permissionPage) => permissionPage.selectAll) &&
    permissionResources.value.every((permissionResource) => permissionResource.selectAll)
}

// Select Permission Resources per Menu
const selectPermissionResourceMenus = (permissionMenu) => {
  if (permissionMenu.selectAll) {
    permissionMenu.permissions.forEach((permission) => {
      if (!data.value.permissions.includes(permission.value)) {
        data.value.permissions.push(permission.value)
      }
    })
  } else {
    permissionMenu.permissions.forEach((permission) => {
      const index = data.value.permissions.indexOf(permission.value)
      if (index > -1) {
        data.value.permissions.splice(index, 1)
      }
    })
  }

  permissionMenu.selectAll = permissionMenu.permissions.every((permission) => data.value.permissions.includes(permission.value))
  permissionResources.value.forEach((permissionResource) => {
    permissionResource.selectAll = permissionResource.permissionMenus.every((menu) => menu.selectAll)
  })
  data.value.selectAll =
    permissionPages.value.length > 0 &&
    permissionResources.value.length > 0 &&
    permissionPages.value.every((permissionPage) => permissionPage.selectAll) &&
    permissionResources.value.every((permissionResource) => permissionResource.selectAll)
}

// Validate
const rules = ref({
  name: [(v) => !!v || t('dashboard.employee.role.validate.nameRequired'), (v) => v.length <= 255 || t('dashboard.employee.role.validate.nameMaxLength')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name)

// Edit
const editData = async () => {
  loading.value = true
  try {
    await useRoleStore().edit(data.value)

    toast.success(t('dashboard.employee.role.successEditMsg'))
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(error.response.data.message || t('dashboard.employee.role.failedEditMsg'))
  }
  loading.value = false
}
</script>
