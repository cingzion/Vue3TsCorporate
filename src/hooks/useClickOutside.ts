import { ref, onMounted, onUnmounted, Ref } from 'vue'

export const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 告诉用户是否点击了外面
  const isClickOutside = ref(false)
  const handleDropDown = (e: MouseEvent) => {
    if(elementRef.value) {
      if(elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  // 事件委托
  onMounted(() => {
    document.addEventListener('click', handleDropDown, false)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleDropDown, false)
  })
  return isClickOutside
}
