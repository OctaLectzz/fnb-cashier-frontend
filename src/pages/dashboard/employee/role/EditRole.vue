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

            <div class="col-12">
              <q-separator class="q-my-md" />
              <div class="q-my-sm">Data : {{ data.permissions }}</div>
              <q-separator class="q-my-md" />
            </div>

            <!-- Permission Groups -->
            <div v-for="(permissionGroup, index) in permissionGroups" :key="index" class="col-12 q-pa-sm">
              <span class="text-h6 text-bold">{{ permissionGroup.title }}</span>
              <q-checkbox v-model="permissionGroup.selectAll" :label="$t('dashboard.employee.role.data.selectAll')" @click="selectGroupPermissions(permissionGroup)" />

              <!-- Permissions -->
              <div class="row">
                <div v-for="(permissionMenu, index) in permissionGroup.permissionMenus" :key="index" class="col-md-4 col-xs-12 q-pa-sm">
                  <q-list bordered class="rounded-borders">
                    <q-expansion-item default-opened>
                      <template v-slot:header>
                        <q-item-section class="text-h6">{{ permissionMenu.name }}</q-item-section>

                        <q-item-section side>
                          <div class="row items-center">
                            <q-checkbox v-model="permissionMenu.selectAll" :label="$t('dashboard.employee.role.data.selectAll')" @click="selectMenuPermissions(permissionMenu)" />
                          </div>
                        </q-item-section>
                      </template>

                      <q-separator />

                      <q-card class="q-py-lg">
                        <q-card-section class="row">
                          <q-checkbox
                            v-for="(permission, subIndex) in permissionMenu.permissions"
                            :key="subIndex"
                            v-model="data.permissions"
                            :val="permission.value"
                            :label="$t(permission.label)"
                            class="col"
                          />
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
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
import { ref, computed } from 'vue'
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

// Permissions
const permissionGroups = ref([
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
      },
      {
        name: t('dashboard.main.sidebar.transactionHistoryMenu'),
        permissions: [
          { value: 'view transactionhistories', label: 'dashboard.employee.role.data.viewText' },
          { value: 'create transactionhistories', label: 'dashboard.employee.role.data.createText' },
          { value: 'edit transactionhistories', label: 'dashboard.employee.role.data.editText' },
          { value: 'delete transactionhistories', label: 'dashboard.employee.role.data.deleteText' }
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
    permissionGroups.value.forEach((group) => {
      group.permissionMenus.forEach((menu) => {
        menu.selectAll = true
        menu.permissions.forEach((permission) => {
          if (!data.value.permissions.includes(permission.value)) {
            data.value.permissions.push(permission.value)
          }
        })
      })
    })
  } else {
    permissionGroups.value.forEach((group) => {
      group.permissionMenus.forEach((menu) => {
        menu.selectAll = false
        menu.permissions.forEach((permission) => {
          const index = data.value.permissions.indexOf(permission.value)
          if (index > -1) {
            data.value.permissions.splice(index, 1)
          }
        })
      })
    })
  }
}

// Select Permissions per Group
const selectGroupPermissions = (permissionGroup) => {
  if (permissionGroup.selectAll) {
    permissionGroup.permissionMenus.forEach((menu) => {
      menu.selectAll = true
      menu.permissions.forEach((permission) => {
        if (!data.value.permissions.includes(permission.value)) {
          data.value.permissions.push(permission.value)
        }
      })
    })
  } else {
    permissionGroup.permissionMenus.forEach((menu) => {
      menu.selectAll = false
      menu.permissions.forEach((permission) => {
        const index = data.value.permissions.indexOf(permission.value)
        if (index > -1) {
          data.value.permissions.splice(index, 1)
        }
      })
    })
  }

  data.value.selectAll = permissionGroups.value.every((group) => {
    return group.selectAll
  })
}

// Select Permissions per Menu
const selectMenuPermissions = (permissionMenu) => {
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
  permissionGroups.value.forEach((permissionGroup) => {
    permissionGroup.selectAll = permissionGroup.permissionMenus.every((menu) => menu.selectAll)
  })
  data.value.selectAll = permissionGroups.value.every((group) => {
    return group.permissionMenus.every((menu) => menu.selectAll)
  })
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
