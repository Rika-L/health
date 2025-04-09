<script lang="tsx" setup>
import type { Forum } from '@/api/form'
import type { ColumnDef } from '@tanstack/vue-table'
import { getForums } from '@/api/form'
import Button from '@/components/ui/button/Button.vue'

const forums = ref<Forum[] | null>(null)

onMounted(() => {
  getForums().then((res) => {
    if (res.code === 200) {
      forums.value = res.data
    }
    else {
      forums.value = null
    }
  }).catch((err) => {
    console.error(err)
  })
})

const columns: ColumnDef<Forum>[] = [
  {
    accessorKey: 'forumid',
    header: '帖子ID',
  },
  {
    accessorKey: 'userid',
    header: '用户ID',
    cell: ({ row }) => {
      return row.getValue('userid')
    },
  },
  {
    accessorKey: 'content',
    header: '内容',
    cell: ({ row }) => {
      return (<div>{row.getValue('content')}</div>)
    },
  },
  {
    accessorKey: 'love',
    header: '点赞数',
    cell: ({ row }) => {
      return row.getValue('love')
    },
  },
  {
    accessorKey: 'forumDetailVO_List',
    header: '评论数',
    size: 200,
    cell: ({ row }) => {
      console.log(row.getValue('forumDetailVO_List'))
      return (row.getValue('forumDetailVO_List') as any).length
    },
  },
  {
    accessorKey: 'time',
    header: '时间',
    cell: ({ row }) => {
      return row.getValue('time')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div class="flex gap-2 justify-end">
          <Button variant="default" onClick={() => { }}>
            详情
          </Button>
          <Button variant="destructive" onClick={() => { }}>
            删除
          </Button>
        </div>
      )
    },
  },
]
</script>

<template>
  <div v-if="!forums">
    loading...
  </div>
  <DataTableOrigin v-else :data="forums" :columns="columns" />
</template>
