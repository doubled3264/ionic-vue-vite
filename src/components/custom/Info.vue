<script setup lang="ts">
import { IonLabel } from '@ionic/vue'
import { computed, ref } from 'vue'
import { eye, eyeStriped } from '../../utils/svg'
import CustomIcon from './Icon.vue'
interface IProps {
  label: string
  item: string
  isSecret?: boolean
}
const props = defineProps<IProps>()
const isHide = ref(true)

const getItem = computed(() => {
  if (props.isSecret) {
    if (isHide.value) {
      return '*****'
    } else {
      return props.item
    }
  } else {
    return props.item
  }
})

const getIcon = computed(() => {
  if (isHide.value) {
    return eyeStriped
  } else {
    return eye
  }
})

function toggleHideItem() {
  isHide.value = !isHide.value
}
</script>
<template>
  <div class="custom-info">
    <div class="custom-info__inner">
      <div class="custom-info__item">
        <ion-label>
          <p>
            {{ label }}
          </p>
        </ion-label>
        <p>{{ getItem }}</p>
      </div>
      <div class="custom-info__action" v-if="props.isSecret" @click="toggleHideItem">
        <custom-icon :svg-icon="getIcon" width="26" />
      </div>
    </div>
  </div>
</template>
