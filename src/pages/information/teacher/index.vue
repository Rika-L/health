<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { deleteTeacher } from '@/api/information/teacher'
import DataTable from '@/components/data-table.vue'
import TeacherEditDialog from '@/components/teacher-edit-dialog.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

interface Student {
  id: number
  username: string
  phoneNum: string
  password: string
  avatar: string
  [property: string]: any
}

const dataTable = useTemplateRef<ComponentExposed<typeof DataTable> | null>('dataTable')

const showEditDialog = ref(false)
const selectedTeacher = ref<Student | null>(null)

async function handleDelete(id: number) {
  const res = await deleteTeacher(id)
  if (res.code === 200) {
    toast.success('删除成功')
    dataTable.value?.fetchData()
  }
  else {
    toast.error('删除失败', { description: res.message })
  }
}

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'id',
    header: () => <div>用户ID</div>,
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'username',
    header: () => <div>用户名</div>,
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'password',
    header: () => <div>密码</div>,
    cell: ({ row }) => <div>{row.getValue('password')}</div>,
  },
  {
    accessorKey: 'phoneNum',
    header: () => <div>电话号码</div>,
    cell: ({ row }) => <div>{row.getValue('phoneNum')}</div>,
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
      const teacher = row.original
      return (
        <div class="text-right flex gap-2 justify-end">
          <Button variant="default">详情</Button>
          <Button
            variant="secondary"
            onClick={() => {
              selectedTeacher.value = teacher
              showEditDialog.value = true
            }}
          >
            编辑
          </Button>
          <Button
          // @ts-expect-error ts(2322) FIXME: Type '() => void' is not assignable to type '() => Promise<...>'.
            onClick={() => handleDelete(row.getValue('id'))}
            variant="destructive"
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
  <DataTable ref="dataTable" path="/account/getTeacherAccountList" :columns="columns" />
  <TeacherEditDialog
    v-model:open="showEditDialog"
    :teacher="selectedTeacher"
    @teacher-updated="dataTable?.fetchData()"
  />
</template>
