<script setup lang="ts">
import {
  IonInput,
  IonLabel,
  onIonViewDidEnter,
  onIonViewWillEnter,
} from '@ionic/vue'
import { computed, nextTick, ref, toRef, watch } from 'vue'
import { eye, eyeStriped } from '../../utils/svg'
import CustomIcon from './Icon.vue'

import terminal from 'virtual:terminal'
import { createAnimation, TextFieldTypes } from '@ionic/core'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
interface Props {
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

const props = withDefaults(defineProps<Props>(), {
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
const placeholderState = useToggleComponent()
const ionLabelEl = ref()

function validateInput(event: any) {
  isTouched.value = true
  emit('update:inputValue', event.target.value)
  emit('validateInput')
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value
  if (showPassword.value) {
    passwordIcon.value = eye
    inputType.value = 'text'
  } else {
    passwordIcon.value = eyeStriped
    inputType.value = 'password'
  }
}

const showLabel = () => {
  const anim = createAnimation()
  console.log(ionLabelEl.value.$el)
  return createAnimation()
    .addElement(ionLabelEl.value.$el)
    .duration(1500)
    .iterations(1)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
}

const hideLabel = () => {
  return showLabel().direction('reverse')
}

const getPlaceholder = computed(() => {
  if (!placeholderState.isOpen.value) {
    return props.label
  } else {
    showLabel
    return ''
  }
})

watch(
  () => placeholderState.isOpen.value,
  async (value) => {
    await nextTick()
    console.log(value)
    if (!value) {
      hideLabel()
    } else {
      showLabel()
    }
  }
)
</script>
<template>
  <div class="custom-input">
    <div :class="[
      ' custom-input__inner',
      { error: errorState.isError && isTouched },
    ]">
      <ion-label position="stacked" ref="ionLabelEl">{{ label }}</ion-label>
      <ion-input :disabled="disabled" :type="inputType" :value="inputValue" @ion-input="validateInput"
        @ion-focus="placeholderState.toggling" @ion-blur="placeholderState.toggling" :inputmode="inputMode"
        :placeholder="getPlaceholder"></ion-input>
    </div>
    <p class="custom-input__helper" v-show="errorState.isError && isTouched">
      {{ errorState.message }}
    </p>
    <div v-if="useForPassword" class="show-hide-password" @click="toggleShowPassword">
      <custom-icon :svg-icon="passwordIcon" />
    </div>
  </div>
</template>
