<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue'
import terminal from 'virtual:terminal'
import { ref } from 'vue'
interface IProps {
   label: string
   inputValue: string
   inputMode?: any
   errorState: {
      optional?: boolean
      isError: boolean
      message: string
   }
}

const props = withDefaults(defineProps<IProps>(), {
   inputMode: {
      default: 'text',
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
