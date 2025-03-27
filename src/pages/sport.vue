<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { ComponentExposed } from 'vue-component-type-helpers'
import DataTable from '@/components/data-table.vue'
import DeleteDialog from '@/components/delete-dialog.vue'
import { Button } from '@/components/ui/button'

interface SportInfo {
  sportId: number
  sportName: string
  duration: number
  publisherId: number
  sportTime: string
  sportFile: string
  sportStatus: number
  grade: string
  [property: string]: any
}

const dataTable = useTemplateRef<ComponentExposed<typeof DataTable> | null>('dataTable')

const deleteDialog = useTemplateRef<ComponentExposed<typeof DeleteDialog> | null>('deleteDialog')

const columns: ColumnDef<SportInfo>[] = [
  {
    accessorKey: 'sportId',
    header: () => <div>运动ID</div>,
    cell: ({ row }) => <div>{row.getValue('sportId')}</div>,
  },
  {
    accessorKey: 'sportName',
    header: () => <div>运动名称</div>,
    cell: ({ row }) => <div>{row.getValue('sportName')}</div>,
  },
  {
    accessorKey: 'duration',
    header: () => <div>持续时间</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue('duration')}
        小时
      </div>
    ),
  },
  {
    accessorKey: 'publisherId',
    header: () => <div>发布者ID</div>,
    cell: ({ row }) => <div>{row.getValue('publisherId')}</div>,
  },
  {
    accessorKey: 'sportTime',
    header: () => <div>运动时间</div>,
    cell: ({ row }) => <div>{row.getValue('sportTime')}</div>,
  },
  {
    accessorKey: 'sportFile',
    header: () => <div>运动文件</div>,
    cell: ({ row }) => <div>{row.getValue('sportFile')}</div>,
  },
  {
    accessorKey: 'sportStatus',
    header: () => <div>运动状态</div>,
    cell: ({ row }) => <div>{row.getValue('sportStatus') === 1 ? '已发布' : '未发布'}</div>,
  },
  {
    accessorKey: 'grade',
    header: () => <div>班级</div>,
    cell: ({ row }) => <div>{row.getValue('grade')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const sportId = row.getValue<number>('sportId')
      return (
        <div class="text-right flex gap-2 justify-end">
          <Button
            variant="default"
            onClick={() => {
              console.log(sportId)
            }}
          >
            编辑
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteDialog.value?.open(`/deleteSportInfo/${sportId}`, dataTable.value?.fetchData)
            }}
          >
            删除
          </Button>
        </div>
      )
    },
  },
]
</script>

<template>
  <DataTable ref="dataTable" path="/getSportInfoByAccountId" :columns="columns" />
  <DeleteDialog ref="deleteDialog" />
</template>
