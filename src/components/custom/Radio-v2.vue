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
import CustomButton from './Button.vue'

interface IProps {
  isOpen: boolean
  inputValue: string
  items: Array<string>
  initialBreakpoint?: number
}

const props = withDefaults(defineProps<IProps>(), {
  initialBreakpoint: 0.5,
})
const emit = defineEmits(['update:inputValue', 'hideModal'])

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

function updateValue(value: string) {
  terminal.log(`value : ${value}`)
  emit('update:inputValue', value)
}
</script>
<template>
  <ion-modal class="custom-radio-v2" :is-open="isOpen" :initial-breakpoint="initialBreakpoint" @didDismiss="hideModal">
    <ion-content>
      <div class="custom-radio-v2__inner">
        <h3>pilih salah satu</h3>
        <ion-list lines="inset">
          <ion-radio-group :value="inputValue">
            <ion-item v-for="(item, index) in items" @click="updateValue(item)">
              <ion-radio slot="end" :value="item"></ion-radio>
              <p>{{ item }}</p>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <custom-button text="tutup" :block="true" color="lapis-lazuli" @click="hideModal" />
      </div>
    </ion-content>
  </ion-modal>
</template>
