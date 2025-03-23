<template>
  <div class="flex flex-center q-pa-sm">
    <q-btn-dropdown :dropdown-icon="miniState ? 'none' : undefined" :style="miniState ? 'max-width: 40px' : ''" :disable="!hasPermission('change branches')" rounded dense flat push no-caps>
      <template v-slot:label>
        <q-avatar v-if="!miniState" icon="store" text-color="white" class="q-mx-sm" />
        <div v-if="!miniState" class="text-left q-mx-sm">
          <div style="font-size: 11px">{{ $t('dashboard.outletText') }}</div>
          <q-skeleton v-if="branchLoading" width="80px" height="18px" />
          <div v-else>{{ selectedBranch.length > 14 ? selectedBranch.slice(0, 14) + '...' : selectedBranch }}</div>
        </div>
        <q-icon v-else name="store" text-color="white" size="35px" style="margin-left: 30px" />
      </template>

      <div class="q-pa-md">
        <div class="text-h6">{{ $t('dashboard.outletListText') }}</div>

        <q-input v-model="branchFilter" :placeholder="$t('public.searchText')" class="q-my-sm" debounce="300" outlined dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-separator class="q-my-md" />

        <div v-for="branch in branches" :key="branch.id">
          <q-radio v-model="selectBranch" :val="branch.id" :label="branch.name" @click="changeBranch(branch)" />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { currentbranch } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useBranchStore } from '/src/stores/main/branch-store'

const { miniState } = defineProps(['miniState'])

// Permissions
const hasPermission = (permission) => useAuthStore().hasPermission(permission)

// Branch
const branchLoading = ref(false)
const branchFilter = ref('')
const selectBranch = ref(currentbranch)
const selectedBranch = ref('')
const branches = ref([])
const getBranch = async () => {
  branchLoading.value = true
  try {
    const res = await useBranchStore().all()

    branches.value = res.data.data.filter((branch) => branch.status === 1)
    selectedBranch.value = branches.value.find((branch) => branch.id === currentbranch).name
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  branchLoading.value = false
}
onMounted(() => {
  getBranch()
})
const changeBranch = (branch) => {
  localStorage.setItem('branch', branch.id)
  selectedBranch.value = branch.name
  window.location.reload()
}
</script>
