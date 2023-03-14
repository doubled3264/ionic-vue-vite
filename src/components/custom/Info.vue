<script setup lang="ts">
import { IonLabel } from '@ionic/vue'
interface IProps {
   label: string
   item: string
}
defineProps<IProps>()
</script>
<template>
   <div class="custom-info">
      <ion-label>
         <p>
            {{ label }}
         </p>
      </ion-label>
      <p>{{ item }}</p>
   </div>
</template>
