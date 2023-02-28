<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue'
import { ref } from 'vue'
type Props = {
   label: string
   inputValue: string
   errorState: {
      isError: boolean
      message: string
   }
}
defineProps<Props>()
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
      <div :class="[' custom-input__inner', { error: errorState.isError }]">
         <ion-label position="stacked">{{ label }}</ion-label>
         <ion-input :value="inputValue" @ion-input="validateInput"></ion-input>
      </div>
      <p class="custom-input__helper" v-show="errorState.isError && isTouched">
         {{ errorState.message }}
      </p>
   </div>
</template>
