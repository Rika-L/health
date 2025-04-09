<script lang="tsx" setup>
import type { Forum } from '@/api/form'
import type { ColumnDef } from '@tanstack/vue-table'
import { getForums } from '@/api/form'
import DeleteDialog from '@/components/delete-dialog.vue'
import ForumDetailDialog from '@/components/forum-detail-dialog.vue'
import Button from '@/components/ui/button/Button.vue'

const forums = ref<Forum[]>([])

const isLoading = ref(false)

const deleteDialog = useTemplateRef<InstanceType<typeof DeleteDialog>>('delete')
const forumDetailDialog = useTemplateRef<InstanceType<typeof ForumDetailDialog>>('forumDetail')

async function fetchData() {
  isLoading.value = true
  try {
    const res = await getForums()
    if (res.code === 200) {
      forums.value = res.data
    }
    else {
      forums.value = []
    }
  }
  catch (error) {
    console.error('Error fetching data:', error)
    forums.value = []
  }
  finally {
    isLoading.value = false
  }
}

onMounted(fetchData)

function hdlDelete(forumid: string) {
  deleteDialog.value?.open(`/forum/delete/forumid/${forumid}`, fetchData)
}

function hdlViewDetails(forum: Forum) {
  forumDetailDialog.value?.open(forum.forumDetailVO_List, forum.forumid, fetchData)
}

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
      return (row.getValue('forumDetailVO_List') as any).length
    },
  },
  {
    accessorKey: 'img',
    header: '图片',
    cell: ({ row }) => {
      const img = row.getValue('img')
      console.log('img', img)
      if (!img) {
        return <div>无图片</div>
      }
      return (<img src={import.meta.env.VITE_REQUEST_BASE_URL + img} alt="图片" class="w-16 h-16 rounded-lg" />)
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
          <Button variant="default" onClick={() => hdlViewDetails(row.original)}>
            详情
          </Button>
          <Button variant="destructive" onClick={() => hdlDelete(row.getValue('forumid'))}>
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
  <DataTableOrigin v-else :data="forums" :columns="columns" />
  <DeleteDialog ref="delete" />
  <ForumDetailDialog ref="forumDetail" />
</template>
