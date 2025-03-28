import { getClassList } from '@/api/class'

export const useClassStore = defineStore('class', () => {
  const classList = ref<string[]>([])
  async function fetchClassList() {
    classList.value = await getClassList()
  }
  async function clearClassList() {
    classList.value = []
  }
  return {
    classList,
    fetchClassList,
    clearClassList,
  }
}, {
  persist: true,
})
