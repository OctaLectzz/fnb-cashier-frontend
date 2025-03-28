<template>
  <q-page class="q-pa-md">
    <q-form @submit="editProfile">
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" :title="$t('dashboard.employee.employee.step1') + $t('public.requiredText')" icon="settings" :done="step > 1" class="scroll" style="height: 70vh">
          <!-- Loading -->
          <div v-if="employeeLoading">
            <div class="q-my-xl">
              <q-skeleton type="QChip" width="100%" height="20px" class="bg-grey q-my-md" />
              <q-skeleton type="QChip" width="80%" height="13px" class="q-my-md" />
              <q-skeleton type="QChip" width="60%" height="13px" class="q-my-md" />
            </div>
            <div class="q-my-xl">
              <q-skeleton type="QChip" width="100%" height="20px" class="bg-grey q-my-md" />
              <q-skeleton type="QChip" width="80%" height="13px" class="q-my-md" />
              <q-skeleton type="QChip" width="60%" height="13px" class="q-my-md" />
            </div>
            <div class="q-my-xl">
              <q-skeleton type="QChip" width="100%" height="20px" class="bg-grey q-my-md" />
              <q-skeleton type="QChip" width="80%" height="13px" class="q-my-md" />
              <q-skeleton type="QChip" width="60%" height="13px" class="q-my-md" />
            </div>
          </div>

          <div v-else class="row justify-center">
            <!-- Avatar -->
            <div class="col-sm-10 col-xs-12 q-pa-sm">
              <div class="row">
                <div class="col-sm-2 col-xs-12">
                  <div class="text-body1 text-bold">
                    {{ $t('dashboard.employee.employee.data.avatar') }}
                    <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                  </div>
                </div>
                <div class="col-sm-10 col-xs-12 q-px-sm">
                  <div
                    class="squareDropzone cursor-pointer"
                    :class="{ 'active-dropzone': avatarActive, 'dropzone-image': data.avatar }"
                    :style="$q.dark.isActive ? 'border: 2px dashed #fff' : 'border: 2px dashed var(--q-primary)'"
                    @dragenter.prevent="avatarToggleActive(false)"
                    @dragleave.prevent="avatarToggleActive(false)"
                    @dragover.prevent="avatarToggleActive(true)"
                    @drop.prevent="avatarDrop"
                  >
                    <span v-if="!data.avatar" class="text-center cursor-pointer q-pa-md" @click="openAvatarInput">
                      <q-icon name="upload" size="sm" color="primary" />
                      <div class="text-primary text-bold q-my-md" style="font-size: 11px">{{ $t('public.chooseFile') }}</div>
                    </span>

                    <div v-if="data.avatar" class="relative-position">
                      <q-responsive :ratio="1 / 1" style="width: 170px">
                        <img :src="data.avatarPreview" alt="Avatar" class="dashboard-image" v-viewer />
                      </q-responsive>

                      <div class="absolute absolute-top-right">
                        <q-btn color="negative" icon="clear" @click="data.avatar = ''" flat dense />
                      </div>
                    </div>

                    <input type="file" id="avatarFile" class="dropzoneFile" @change="handleAvatarInput" />
                  </div>
                  <div class="text-grey-7 q-my-sm">{{ $t('public.recomendedFile') + $t('public.squareRatio') }}</div>
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="col-sm-10 col-xs-12 q-pa-sm">
              <div class="row">
                <div class="col-sm-2 col-xs-12">
                  <div class="text-body1 text-bold">
                    {{ $t('dashboard.employee.employee.data.name') }}
                    <span class="text-subtitle2 text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                </div>
                <div class="col-sm-10 col-xs-12 q-px-sm">
                  <q-input v-model="data.name" :placeholder="$t('public.exampleText') + 'Octa'" :rules="rules.name" outlined dense required />
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="col-sm-10 col-xs-12 q-pa-sm">
              <div class="row">
                <div class="col-sm-2 col-xs-12">
                  <div class="text-body1 text-bold">
                    {{ $t('dashboard.employee.employee.data.email') }}
                    <span class="text-subtitle2 text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                </div>
                <div class="col-sm-10 col-xs-12 q-px-sm">
                  <q-input v-model="data.email" type="email" :placeholder="$t('public.exampleText') + 'email@example.com'" :rules="rules.email" v-lowercase outlined dense required />
                </div>
              </div>
            </div>

            <!-- Phone Number -->
            <div class="col-sm-10 col-xs-12 q-pa-sm">
              <div class="row">
                <div class="col-sm-2 col-xs-12">
                  <div class="text-body1 text-bold">
                    {{ $t('dashboard.employee.employee.data.phoneNumber') }}
                    <span class="text-subtitle2 text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                </div>
                <div class="col-sm-10 col-xs-12 q-px-sm">
                  <q-input v-model="data.phone_number" :placeholder="$t('public.exampleText') + '0897 - 1234 - 4444'" mask="#### - #### - ######" :rules="rules.phoneNumber" outlined dense required />
                </div>
              </div>
            </div>

            <!-- PIN -->
            <div class="col-sm-10 col-xs-12 q-pa-sm">
              <div class="row">
                <div class="col-sm-2 col-xs-12">
                  <div class="text-body1 text-bold">
                    {{ $t('dashboard.employee.employee.data.pin') }}
                    <span class="text-subtitle2 text-red">{{ $t('public.requiredText') }}</span>
                  </div>
                </div>
                <div class="col-sm-10 col-xs-12 q-px-sm">
                  <q-input v-model="data.pin" :type="pinVisibility ? 'password' : 'text'" mask="######" :rules="rules.pin" :hint="t('public.defaultText') + '123456'" outlined dense required>
                    <template v-slot:append>
                      <q-icon :name="pinVisibility ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="pinVisibility = !pinVisibility" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
        </q-step>

        <q-step :name="2" :title="$t('dashboard.employee.employee.step2')" :caption="$t('public.optionalText')" icon="create_new_folder" :done="step > 2" class="scroll" style="height: 70vh">
          <!-- KTP -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.ktp') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.ktp" :placeholder="$t('public.exampleText') + '11 11 11 111111 0001'" mask="## ## ## ###### ####" outlined dense />
              </div>
            </div>
          </div>

          <!-- KTP Image -->
          <div class="col-sm-10 col-xs-12 q-pa-sm q-my-md">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.ktpImage') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <div
                  class="rectangleDropzone cursor-pointer"
                  :class="{ 'active-dropzone': ktpActive, 'dropzone-image': data.ktp }"
                  :style="$q.dark.isActive ? 'border: 2px dashed #fff' : 'border: 2px dashed var(--q-primary)'"
                  @dragenter.prevent="ktpToggleActive(false)"
                  @dragleave.prevent="ktpToggleActive(false)"
                  @dragover.prevent="ktpToggleActive(true)"
                  @drop.prevent="ktpDrop"
                >
                  <span v-if="!data.ktp_image" class="text-center cursor-pointer q-pa-md" @click="openKtpInput">
                    <q-icon name="upload" size="sm" color="primary" />
                    <div class="text-primary text-bold q-my-md" style="font-size: 11px">{{ $t('public.chooseFile') }}</div>
                  </span>

                  <div v-if="data.ktp_image" class="relative-position">
                    <q-responsive :ratio="16 / 9" style="width: 310px">
                      <img :src="data.ktpPreview" alt="KTP" class="dashboard-image" v-viewer />
                    </q-responsive>

                    <div class="absolute absolute-top-right">
                      <q-btn color="negative" icon="clear" @click="data.ktp_image = ''" flat dense />
                    </div>
                  </div>

                  <input type="file" id="ktpFile" class="dropzoneFile" @change="handleKtpInput" />
                </div>
                <div class="text-grey-7 q-my-sm">{{ $t('public.recomendedFile') + $t('public.rectangleRatio') }}</div>
              </div>
            </div>
          </div>

          <!-- DOB -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.dob') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.dob" mask="date" outlined dense>
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale" cover>
                        <q-date v-model="data.dob">
                          <div class="row items-center justify-end">
                            <q-btn label="Close" color="primary" v-close-popup flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <!-- Gender -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.gender') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-option-group
                  v-model="data.gender"
                  :options="[
                    { label: $t('dashboard.employee.employee.data.maleGender'), value: 'male' },
                    { label: $t('dashboard.employee.employee.data.femaleGender'), value: 'female' },
                    { label: $t('dashboard.employee.employee.data.otherGender'), value: 'other' }
                  ]"
                  inline
                />
              </div>
            </div>
          </div>

          <!-- Domicile -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.domicile') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.domicile" :placeholder="$t('public.exampleText') + 'Solo'" outlined dense />
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="col-sm-10 col-xs-12 q-pa-sm q-my-md">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.address') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.address" type="textarea" outlined dense />
              </div>
            </div>
          </div>
        </q-step>

        <q-step :name="3" :title="$t('dashboard.employee.employee.step3')" :caption="$t('public.optionalText')" icon="add_comment" :done="step > 3" class="scroll" style="height: 70vh">
          <!-- BPJS TK Number -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bpjsTkNumber') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.bpjs_tk_number" :placeholder="$t('public.exampleText') + '0001234567891'" mask="#############" outlined dense />
              </div>
            </div>
          </div>

          <!-- BPJS TK Card -->
          <div class="col-sm-10 col-xs-12 q-pa-sm q-my-md">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bpjsTkCard') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <div
                  class="rectangleDropzone cursor-pointer"
                  :class="{ 'active-dropzone': bpjsTkActive, 'dropzone-image': data.bpjsTk }"
                  :style="$q.dark.isActive ? 'border: 2px dashed #fff' : 'border: 2px dashed var(--q-primary)'"
                  @dragenter.prevent="bpjsTkToggleActive(false)"
                  @dragleave.prevent="bpjsTkToggleActive(false)"
                  @dragover.prevent="bpjsTkToggleActive(true)"
                  @drop.prevent="bpjsTkDrop"
                >
                  <span v-if="!data.bpjs_tk_card" class="text-center cursor-pointer q-pa-md" @click="openBpjsTkInput">
                    <q-icon name="upload" size="sm" color="primary" />
                    <div class="text-primary text-bold q-my-md" style="font-size: 11px">{{ $t('public.chooseFile') }}</div>
                  </span>

                  <div v-if="data.bpjs_tk_card" class="relative-position">
                    <q-responsive :ratio="16 / 9" style="width: 310px">
                      <img :src="data.bpjsTkPreview" alt="BPJS TK Card" class="dashboard-image" v-viewer />
                    </q-responsive>

                    <div class="absolute absolute-top-right">
                      <q-btn color="negative" icon="clear" @click="data.bpjs_tk_card = ''" flat dense />
                    </div>
                  </div>

                  <input type="file" id="bpjsTkFile" class="dropzoneFile" @change="handleBpjsTkInput" />
                </div>
                <div class="text-grey-7 q-my-sm">{{ $t('public.recomendedFile') + $t('public.rectangleRatio') }}</div>
              </div>
            </div>
          </div>

          <!-- BPJS Health Number -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bpjsHealthNumber') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.bpjs_health_number" :placeholder="$t('public.exampleText') + '0001234567891'" mask="#############" outlined dense />
              </div>
            </div>
          </div>

          <!-- BPJS Health Card -->
          <div class="col-sm-10 col-xs-12 q-pa-sm q-my-md">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bpjsHealthCard') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <div
                  class="rectangleDropzone cursor-pointer"
                  :class="{ 'active-dropzone': bpjsHealthActive, 'dropzone-image': data.bpjsHealth }"
                  :style="$q.dark.isActive ? 'border: 2px dashed #fff' : 'border: 2px dashed var(--q-primary)'"
                  @dragenter.prevent="bpjsHealthToggleActive(false)"
                  @dragleave.prevent="bpjsHealthToggleActive(false)"
                  @dragover.prevent="bpjsHealthToggleActive(true)"
                  @drop.prevent="bpjsHealthDrop"
                >
                  <span v-if="!data.bpjs_health_card" class="text-center cursor-pointer q-pa-md" @click="openBpjsHealthInput">
                    <q-icon name="upload" size="sm" color="primary" />
                    <div class="text-primary text-bold q-my-md" style="font-size: 11px">{{ $t('public.chooseFile') }}</div>
                  </span>

                  <div v-if="data.bpjs_health_card" class="relative-position">
                    <q-responsive :ratio="16 / 9" style="width: 310px">
                      <img :src="data.bpjsHealthPreview" alt="BPJS Health Card" class="dashboard-image" v-viewer />
                    </q-responsive>

                    <div class="absolute absolute-top-right">
                      <q-btn color="negative" icon="clear" @click="data.bpjs_health_card = ''" flat dense />
                    </div>
                  </div>

                  <input type="file" id="bpjsHealthFile" class="dropzoneFile" @change="handleBpjsHealthInput" />
                </div>
                <div class="text-grey-7 q-my-sm">{{ $t('public.recomendedFile') + $t('public.rectangleRatio') }}</div>
              </div>
            </div>
          </div>

          <div class="col-sm-11 col-xs-12 q-pa-sm">
            <q-separator class="q-my-md" />
          </div>

          <!-- Bank Name -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bankName') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.bank_name" :placeholder="$t('public.exampleText') + 'Bank Negara Indonesia'" outlined dense />
              </div>
            </div>
          </div>

          <!-- Bank Account Number -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.bankAccountNumber') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.bank_account_number" :placeholder="$t('public.exampleText') + '3778 - 04 - 007383 - 57 - 0'" outlined dense />
              </div>
            </div>
          </div>

          <!-- Account Holder Name -->
          <div class="col-sm-10 col-xs-12 q-pa-sm">
            <div class="row">
              <div class="col-sm-2 col-xs-12">
                <div class="text-body1 text-bold">
                  {{ $t('dashboard.employee.employee.data.accountHolderName') }}
                  <span class="text-subtitle2 text-grey">{{ $t('public.optionalText') }}</span>
                </div>
              </div>
              <div class="col-sm-10 col-xs-12 q-px-sm">
                <q-input v-model="data.account_holder_name" :placeholder="$t('public.exampleText') + 'Ilyas'" outlined dense />
              </div>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn v-if="!employeeLoading" color="primary" :label="$t('dashboard.employee.employee.backBtn')" class="q-mt-md" :disable="step == 1" @click="$refs.stepper.previous()" />
            <q-btn
              v-if="!employeeLoading && step != 3"
              color="primary"
              :label="$t('dashboard.employee.employee.continueBtn')"
              class="float-right q-mt-md"
              :disable="step == 3"
              @click="$refs.stepper.next()"
            />
            <q-btn v-if="!employeeLoading && step == 3" type="submit" color="primary" :label="t('public.saveText')" class="float-right q-mt-md" :loading="loading" :disable="disabledButton">
              <template v-slot:loading>
                <q-spinner-gears />
              </template>
            </q-btn>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import { url } from '/src/boot/axios'
import { useProfileStore } from '/src/stores/profile-store'
import { useEmployeeStore } from '/src/stores/employee/employee-store'

const { t } = useI18n()
const router = useRouter()
const step = ref(1)
const data = ref({
  id: null,
  nip: '',
  avatar: '',
  avatarPreview: '',
  name: '',
  email: '',
  phone_number: '',
  position: '',
  role_id: null,
  role: '',
  pin: '123456',
  branch_id: null,
  branch: '',
  schedule_id: null,
  schedule: '',
  ktp: '',
  ktp_image: '',
  ktpPreview: '',
  dob: '',
  gender: '',
  domicile: '',
  address: '',
  employment_status: '',
  date_joined: '',
  end_date: '',
  bpjs_tk_number: '',
  bpjs_tk_card: '',
  bpjsTkPreview: '',
  bpjs_health_number: '',
  bpjs_health_card: '',
  bpjsHealthPreview: '',
  bank_name: '',
  bank_account_number: '',
  account_holder_name: '',
  status: true
})
const pinVisibility = ref(true)

// Profile
const employeeLoading = ref(false)
const getProfile = async () => {
  employeeLoading.value = true
  try {
    const res = await useProfileStore().employeeprofile()

    data.value = {
      ...res.data.data,
      role: res.data.data.role.name,
      branch: res.data.data.branch.name,
      schedule: res.data.data.schedule.name + ' (' + res.data.data.schedule.start_time + ' - ' + res.data.data.schedule.end_time + ')',
      avatarPreview: url + '/employees/avatars/' + res.data.data.avatar,
      ktpPreview: url + '/employees/ktps/' + res.data.data.ktp_image,
      bpjsTkPreview: url + '/employees/bpjstks/' + res.data.data.bpjs_tk_card,
      bpjsHealthPreview: url + '/employees/bpjshealthes/' + res.data.data.bpjs_health_card,
      date_joined: res.data.data.date_joined_edit
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  employeeLoading.value = false
}
onMounted(() => {
  getProfile()
})

// Avatar
const avatarActive = ref(false)
const avatarToggleActive = (state) => {
  avatarActive.value = state
}
const openAvatarInput = () => {
  document.getElementById('avatarFile').click()
}
const avatarDrop = (e) => {
  avatarActive.value = false
  handleAvatar(e.dataTransfer.files[0])
}
const handleAvatarInput = (e) => handleAvatar(e.target.files[0])
const handleAvatar = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('public.imageType'))
    return
  }

  data.value.avatarPreview = URL.createObjectURL(file)
  data.value.avatar = file
}

// KTP Image
const ktpActive = ref(false)
const ktpToggleActive = (state) => {
  ktpActive.value = state
}
const openKtpInput = () => {
  document.getElementById('ktpFile').click()
}
const ktpDrop = (e) => {
  ktpActive.value = false
  handleKtp(e.dataTransfer.files[0])
}
const handleKtpInput = (e) => handleKtp(e.target.files[0])
const handleKtp = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('public.imageType'))
    return
  }

  data.value.ktpPreview = URL.createObjectURL(file)
  data.value.ktp_image = file
}

// NPJS TK Image
const bpjsTkActive = ref(false)
const bpjsTkToggleActive = (state) => {
  bpjsTkActive.value = state
}
const openBpjsTkInput = () => {
  document.getElementById('bpjsTkFile').click()
}
const bpjsTkDrop = (e) => {
  bpjsTkActive.value = false
  handleBpjsTk(e.dataTransfer.files[0])
}
const handleBpjsTkInput = (e) => handleBpjsTk(e.target.files[0])
const handleBpjsTk = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('public.imageType'))
    return
  }

  data.value.bpjsTkPreview = URL.createObjectURL(file)
  data.value.bpjs_tk_card = file
}

// NPJS Health Image
const bpjsHealthActive = ref(false)
const bpjsHealthToggleActive = (state) => {
  bpjsHealthActive.value = state
}
const openBpjsHealthInput = () => {
  document.getElementById('bpjsHealthFile').click()
}
const bpjsHealthDrop = (e) => {
  bpjsHealthActive.value = false
  handleBpjsHealth(e.dataTransfer.files[0])
}
const handleBpjsHealthInput = (e) => handleBpjsHealth(e.target.files[0])
const handleBpjsHealth = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(file.type)) {
    toast.error(t('public.imageType'))
    return
  }

  data.value.bpjsHealthPreview = URL.createObjectURL(file)
  data.value.bpjs_health_card = file
}

// Validate
const rules = ref({
  name: [(v) => !!v || t('dashboard.employee.employee.validate.nameRequired'), (v) => v.length <= 50 || t('dashboard.employee.employee.validate.nameMaxLength')],
  nip: [(v) => !!v || t('dashboard.employee.employee.validate.nipRequired'), (v) => v.length <= 20 || t('dashboard.employee.employee.validate.nipMaxLength')],
  email: [(v) => !!v || t('dashboard.employee.employee.validate.emailRequired'), (v) => /.+@.+/.test(v) || t('dashboard.employee.employee.validate.emailFormat')],
  phoneNumber: [(v) => !!v || t('dashboard.employee.employee.validate.phoneNumberRequired')],
  position: [(v) => !!v || t('dashboard.employee.employee.validate.positionRequired')],
  pin: [(v) => !!v || t('dashboard.employee.employee.validate.pinRequired')]
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.name || !data.value.nip || !data.value.email || !data.value.phone_number || !data.value.position || !data.value.pin)

// Edit
const editProfile = async () => {
  loading.value = true
  try {
    data.value.status = data.value.status === true ? 1 : 0

    await useEmployeeStore().edit(data.value)

    toast.success(t('profile.successProfileEditMsg'))
    router.back()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('Error submitting form:', error)

    toast.error(t('profile.errorProfileEditMsg'))
  }
  loading.value = false
}
</script>
