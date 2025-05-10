"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface ProjectFiltersProps {
  tags: string[]
  onFilterChange: (filters: {
    search: string
    tag: string
    sortBy: "newest" | "oldest" | "az" | "za"
  }) => void
}

export function ProjectFilters({ tags, onFilterChange }: ProjectFiltersProps) {
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">("newest")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onFilterChange({ search: value, tag, sortBy })
  }

  const handleTagChange = (value: string) => {
    setTag(value)
    onFilterChange({ search, tag: value, sortBy })
  }

  const handleSortChange = (value: "newest" | "oldest" | "az" | "za") => {
    setSortBy(value)
    onFilterChange({ search, tag, sortBy: value })
  }

  const clearFilters = () => {
    setSearch("")
    setTag("")
    setSortBy("newest")
    onFilterChange({ search: "", tag: "", sortBy: "newest" })
  }

  const hasActiveFilters = search || tag || sortBy !== "newest"

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search projects..."
              className="pl-8"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="w-full space-y-2 md:w-[200px]">
          <Label htmlFor="tag-filter">Filter by Tag</Label>
          <Select value={tag} onValueChange={handleTagChange}>
            <SelectTrigger id="tag-filter">
              <SelectValue placeholder="All tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tags</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-2 md:w-[200px]">
          <Label htmlFor="sort-by">Sort by</Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Newest first" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
            Clear filters
            <X className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
