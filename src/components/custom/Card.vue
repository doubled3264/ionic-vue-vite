<script setup lang="ts">
interface IProps {}
</script>
<template>
   <div class="custom-card">
      <div class="custom-card__head">
         <div class="custom-card__title">
            <slot name="cardTitle"></slot>
         </div>
         <div class="custom-card__nav">
            <slot name="cardNav"></slot>
         </div>
      </div>
      <div class="custom-card__body">
         <slot name="cardBody"></slot>
      </div>
      <div class="custom-card__footer">
         <slot name="cardFooter"></slot>
      </div>
   </div>
</template>
