<script lang="ts" setup>
import type { Exam } from '@/api/exam'

const [isOpen, toggleIsOpen] = useToggle(false)

const data = ref<Exam | null>(null)

defineExpose({
  open: (details: Exam) => {
    data.value = details
    toggleIsOpen(true)
  },
})

function formatTime(input: number | null | undefined): string {
  // 如果输入是 null，则返回默认值
  if (!input) {
    return '0分0秒'
  }

  // 确保输入是正数
  const seconds = Math.abs(input)

  // 将秒数分解为分钟、秒和毫秒
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // 格式化输出
  return `${minutes}分${Math.floor(remainingSeconds)}秒`
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="toggleIsOpen">
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>体测详情</DialogTitle>
        <DialogDescription>
          查看完整的体测信息
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-2 gap-4">
        <div><span class="font-bold">体测ID: </span>{{ data?.id }}</div>
        <div><span class="font-bold">用户ID: </span>{{ data?.userid }}</div>
        <div><span class="font-bold">身高(cm): </span>{{ data?.height }}</div>
        <div><span class="font-bold">体重(kg): </span>{{ data?.weight }}</div>
        <div><span class="font-bold">引体向上(个): </span>{{ data?.pullUp }}</div>
        <div><span class="font-bold">仰卧起坐(个): </span>{{ data?.sitUp }}</div>
        <div><span class="font-bold">立定跳远(cm): </span>{{ data?.longJump }}</div>
        <div><span class="font-bold">坐位体前屈(cm): </span>{{ data?.forwardBending }}</div>
        <div><span class="font-bold">50米跑(s): </span>{{ data?.dash }}</div>
        <div><span class="font-bold">1000/800米跑: </span>{{ formatTime(data?.running) }}</div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            关闭
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
