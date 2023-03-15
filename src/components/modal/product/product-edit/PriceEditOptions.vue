<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import { computed } from 'vue'
import CustomButton from '../../../custom/Button.vue'

interface IItems {
  type: string
  active: boolean
  text: string
}

interface IProps {
  isOpen: boolean
  items: Array<IItems>
}

const props = defineProps<IProps>()
const emit = defineEmits(['hideModal', 'action'])

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

const countInitialBreakpoint = computed(() => {
  let initialBreakpoint = 0.07
  props.items.forEach((item) => {
    if (item.active) {
      initialBreakpoint += 0.08
    }
  })
  return initialBreakpoint
})
</script>
<template>
  <ion-modal class="asd" :is-open="isOpen" @didDismiss="hideModal" :initial-breakpoint="countInitialBreakpoint">
    <ion-content>
      <div class="modal-edit-product price-option">
        <h3>pilih salah satu</h3>
        <ion-list lines="inset">
          <ion-item v-for="(item, index) in items" :key="index + 1" v-show="item.active">
            <p>{{ item.text }}</p>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped lang="scss">
ion-modal {
  --background: red;
  --backdrop-opacity: 3;
}
</style>
