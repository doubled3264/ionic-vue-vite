<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue'
import terminal from 'virtual:terminal'
import { ref } from 'vue'
interface IProps {
   label: string
   inputValue: string | number
   inputMode?: any
   type?: any
   disabled?: any
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

function validateInput(event: any) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}
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
            :type="type"
            :value="inputValue"
            @ion-input="validateInput"
            :inputmode="inputMode"
         ></ion-input>
      </div>
      <p class="custom-input__helper" v-show="errorState.isError && isTouched">
         {{ errorState.message }}
      </p>
   </div>
</template>
