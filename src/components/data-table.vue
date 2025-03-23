<script setup lang="ts" generic="TData">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Pagination,
  PaginationList,
} from '@/components/ui/pagination'

import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

const props = defineProps<{
  columns: ColumnDef<TData>[]
}>()

const data = shallowRef<TData[]>([])

const table = useVueTable({
  get data() { return data.value },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
})

const paginationDate = ref({ page: 1, pageSize: 10,total:10 })
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-end">
      <Pagination
        v-slot="{ page }"
        class="flex gap-4 items-center"
        :items-per-page="paginationDate.pageSize"
        :total="paginationDate.total"
        show-edges
        :default-page="1"
        @update:page="console.log(1)"
      >
        <Select v-model="paginationDate.pageSize">
          <SelectTrigger class="gap-2">
            <SelectValue>
              {{ paginationDate.pageSize }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="10">
                10
              </SelectItem>
              <SelectItem value="20">
                20
              </SelectItem>
              <SelectItem value="40">
                40
              </SelectItem>
              <SelectItem value="100">
                100
              </SelectItem>
          </SelectContent>
        </Select>
        <div class="flex-none">
          Page {{ page }} of {{ Math.ceil(paginationDate.total / paginationDate.pageSize) }}
        </div>
        <PaginationList class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />
          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
