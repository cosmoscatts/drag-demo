<template>
  <div
    :style="{
      position: 'relative',
      backgroundColor: '#808080',
      background: 'linear-gradient(-90deg, var(--color-neutral-3) 1px, transparent 1px), linear-gradient(var(--color-neutral-3) 1px, transparent 1px)',
      backgroundSize: '20px 20px, 20px 20px',
      height: '100%',
    }"
  >
    <slot />
  </div>
</template>
