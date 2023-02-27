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

function validateInput(event) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}
</script>
<template>
   <div class="custom-input">
      <ion-label position="stacked">{{ label }}</ion-label>
      <ion-input :value="inputValue" @ion-input="validateInput"></ion-input>
   </div>
</template>
