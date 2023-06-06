<script setup lang="ts">
import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
} from '@ionic/vue'
import { StatusBar } from '@capacitor/status-bar'
import terminal from 'virtual:terminal'
import { computed, watch } from 'vue'
import CustomButton from './Button.vue'

interface IProps {
  isOpen: boolean
  inputValue: string
  items: Array<string>
  /* initialBreakpoint?: number */
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:inputValue', 'hideModal'])

function hideModal() {
  if (props.isOpen) {
    emit('hideModal')
  }
}

function updateValue(value: string) {
  emit('update:inputValue', value)
}

const countInitialBreakpoint = computed(() => {
  let initialBreakpoint = 0.07
  props.items.forEach(() => {
    initialBreakpoint += 0.06
  })
  return initialBreakpoint
})

watch(
  () => props.isOpen,
  async (value) => {
    terminal.log('radio state is: ' + value)
  }
)
</script>
<template>
  <ion-modal class="custom-radio-v2" :is-open="isOpen" :initial-breakpoint="countInitialBreakpoint"
    @didDismiss="hideModal">
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
      </div>
    </ion-content>
  </ion-modal>
</template>
