<script lang="tsx" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { ComponentExposed } from 'vue-component-type-helpers'
import DataTable from '@/components/data-table.vue'
import DeleteDialog from '@/components/delete-dialog.vue'
import EditUserDialog from '@/components/edit-user-dialog.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-vue-next'

interface User {
  userid: string
  username: string
  phoneNum: string
  password: string
  avatar: string
  role: string
  [property: string]: any
}

const dataTable = useTemplateRef<ComponentExposed<typeof DataTable> | null>('dataTable')

const deleteDialog = useTemplateRef<ComponentExposed<typeof DeleteDialog> | null>('deleteDialog')

const editUserDialog = useTemplateRef<ComponentExposed<typeof EditUserDialog> | null>('editUserDialog')

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
      const userid = row.getValue('userid')
      const user = row.original
      return (
        <div class="text-right flex gap-2 justify-end">
          <Button
            onClick={() => {
              editUserDialog.value?.open(user, dataTable.value?.fetchData)
            }}
          >
            编辑
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteDialog.value?.open(`/admin/delete/${userid}`, dataTable.value?.fetchData)
            }}
          >
            删除
          </Button>
        </div>
      )
    },
  },
]

const search = reactive({ keyword: '' })

function resetSearch() {
  search.keyword = ''
  dataTable.value?.fetchData()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2">
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" v-model="search.keyword" type="text" placeholder="Search..." class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>
      <Button variant="secondary" @click="resetSearch">
        Reset
      </Button>
      <Button @click="dataTable?.fetchData">
        Search
      </Button>
    </div>

    <DataTable
      ref="dataTable"
      path="/admin/query"
      :columns="columns"
      :search="search"
    />
  </div>

  <EditUserDialog ref="editUserDialog" />
  <DeleteDialog ref="deleteDialog" />
</template>
