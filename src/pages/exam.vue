<script lang="tsx" setup>
import type { Exam } from '@/api/exam'
import type ExamDetailDialog from '@/components/exam-detail-dialog.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { getClassExam } from '@/api/exam'
import Button from '@/components/ui/button/Button.vue'

const isLoading = ref(false)
const data = ref<Exam[]>([])
const examDetail = useTemplateRef<InstanceType<typeof ExamDetailDialog>>('examDetail')
async function fetchData() {
  isLoading.value = true
  try {
    const response = await getClassExam()
    if (response.code === 200) {
      data.value = response.data
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(fetchData)

const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: 'id',
    header: '成绩ID',
  },
  {
    accessorKey: 'userid',
    header: '用户ID',
  },
  {
    accessorKey: 'examTime',
    header: '体测时间',
  },
  {
    accessorKey: 'examResult',
    header: '体测成绩',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div class="flex gap-2 justify-end">
          <Button
            variant="default"
            onClick={() => {
              examDetail.value?.open(row.original)
            }}
          >
            详情
          </Button>
          <Button variant="destructive" onClick={() => {}}>
            删除
          </Button>
        </div>
      )
    },
  },
]
</script>

<template>
  <div v-if="isLoading">
    loading...
  </div>
  <DataTableOrigin v-else :data="data" :columns="columns" />
  <ExamDetailDialog ref="examDetail" />
</template>
