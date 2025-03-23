<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'

interface Student {
  id: string
  name: string
  age: number
}

const data: Student[] = [
  { id: '1', name: '张三', age: 11 },
  { id: '2', name: '李四', age: 12 },
  { id: '3', name: '王五', age: 13 },
]

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: () => <div class="text-right">姓名</div>,
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'age',
    header: () => <div class="text-right">年龄</div>,
    cell: ({ row }) => <div>{row.getValue('age')}</div>,
  },

]
</script>

<template>
  <DataTable :columns="columns" :data="data" />
</template>
