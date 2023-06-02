<script setup lang="ts">
import {
   IonInput,
   IonLabel,
   onIonViewDidEnter,
   onIonViewWillEnter,
} from '@ionic/vue'
import { nextTick, ref, toRef, watch } from 'vue'
import { eye, eyeStriped } from '../../utils/svg'
import CustomIcon from './Icon.vue'

import terminal from 'virtual:terminal'
import { TextFieldTypes } from '@ionic/core'
interface IProps {
   label: string
   inputValue: string | number
   inputMode?: any
   type?: any
   disabled?: any
   useForPassword?: boolean
   errorState?:
      | {
           optional?: boolean
           isError: boolean
           message: string
        }
      | any
}

const props = withDefaults(defineProps<IProps>(), {
   inputMode: {
      default: 'text',
   },
   type: {
      default: 'text',
   },
   errorState: {
      isError: false,
      message: '',
   },
})

const emit = defineEmits(['update:inputValue', 'validateInput'])
const isTouched = ref(false)
const inputType = ref(props.type)
const showPassword = ref(false)
const passwordIcon = ref(eyeStriped)

function validateInput(event: any) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}

function toggleShowPassword() {
   console.log('toggleShowPassword clicked')
   showPassword.value = !showPassword.value
   if (showPassword.value) {
      passwordIcon.value = eye
      inputType.value = 'text'
   } else {
      passwordIcon.value = eyeStriped
      inputType.value = 'password'
   }

   console.log(inputType.value)
}

watch(
   () => inputType.value,
   (value) => {
      console.log(value)
   }
)
</script>
<template>
   <div class="custom-input">
      <div
         :class="[
            ' custom-input__inner',
            { error: errorState.isError && isTouched },
         ]"
      >
         <ion-label position="stacked">{{ label }}</ion-label>
         <ion-input
            :disabled="disabled"
            :type="inputType"
            :value="inputValue"
            @ion-input="validateInput"
            :inputmode="inputMode"
         ></ion-input>
      </div>
      <p class="custom-input__helper" v-show="errorState.isError && isTouched">
         {{ errorState.message }}
      </p>
      <div
         v-if="useForPassword"
         class="show-hide-password"
         @click="toggleShowPassword"
      >
         <custom-icon :svg-icon="passwordIcon" />
      </div>
   </div>
</template>
