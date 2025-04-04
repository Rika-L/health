<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { ComponentExposed } from 'vue-component-type-helpers'
import DataTable from '@/components/data-table.vue'
import DeleteDialog from '@/components/delete-dialog.vue'
// import StudentDetailDialog from '@/components/information/student-detail-dialog.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import { Button } from '@/components/ui/button'

interface User {
  userid: number
  username: string
  phoneNum: string
  password: string
  avatar: string
  role: string
  [property: string]: any
}

const dataTable = useTemplateRef<ComponentExposed<typeof DataTable> | null>('dataTable')

const deleteDialog = useTemplateRef<ComponentExposed<typeof DeleteDialog> | null>('deleteDialog')

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'userid',
    header: () => <div>用户ID</div>,
    cell: ({ row }) => <div>{row.getValue('userid')}</div>,
  },
  {
    accessorKey: 'username',
    header: () => <div>用户名</div>,
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'classid',
    header: () => <div>班级</div>,
    cell: ({ row }) => <div>{row.getValue('classid')}</div>,
  },
  {
    accessorKey: 'role',
    header: () => <div>角色</div>,
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'avatar',
    header: () => <div>用户头像</div>,
    cell: ({ row }) => (
      <div>
        <Avatar class="h-16 w-16 rounded-lg">
          <AvatarImage src={import.meta.env.VITE_REQUEST_BASE_URL + row.getValue('avatar')} />
          <AvatarFallback class="rounded-lg">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id')
      return (
        <div class="text-right flex gap-2 justify-end">
          <Button>
            编辑
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteDialog.value?.open(`/account/deleteStudentAccount/${id}`, dataTable.value?.fetchData)
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
  <DataTable
    ref="dataTable"
    path="/admin/query" :columns="columns"
  />
  <!-- <StudentDetailDialog ref="studentDetailDialog" /> -->
  <DeleteDialog ref="deleteDialog" />
</template>
