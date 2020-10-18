<template>
  <div class="dropdown" ref="dropdownRef">
    <a @click.prevent="toggleOpen" class="btn btn-outline-light my-2 dropdown-toggle" href="#">{{ title }}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
     <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import { useClickOutside } from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    /**
     * 点击自己不关闭，点击其它地方关闭
     * @param e
     */
    /*
    const handleDropDown = (e: MouseEvent) => {
      if (dropdownRef.value) {
        // contains 是不是包含另外一个节点
        console.log(dropdownRef.value.contains)
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
        console.log(dropdownRef.value)
      }
    }
    // 生命周期
    onMounted(() => {
      document.addEventListener('click', handleDropDown, false)
    })
    // 删除
    onUnmounted(() => {
      document.removeEventListener('click', handleDropDown, false)
    })
    */
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
