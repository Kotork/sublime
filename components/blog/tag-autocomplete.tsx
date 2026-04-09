"use client";

import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";

import { normalizeTagSlug } from "@/lib/blog/tag-slug";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

type TagAutocompleteProps = {
  excludedSlugs: string[];
  onAddTag: (slug: string) => void;
  searchPlaceholder: string;
  emptyText: string;
  addNewLabel: (slug: string) => string;
  triggerLabel: string;
};

export function TagAutocomplete({
  excludedSlugs,
  onAddTag,
  searchPlaceholder,
  emptyText,
  addNewLabel,
  triggerLabel,
}: TagAutocompleteProps) {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const { data: suggestions = [] } = useQuery(
    trpc.blog.tagSuggestions.queryOptions({
      q: deferredSearch,
      limit: 40,
    }),
  );

  const filtered = suggestions.filter((t) => !excludedSlugs.includes(t.slug));

  const normalizedInput = normalizeTagSlug(search);
  const canCreate =
    normalizedInput.length > 0 &&
    !excludedSlugs.includes(normalizedInput) &&
    !filtered.some((t) => t.slug === normalizedInput);

  function pick(slug: string) {
    const s = normalizeTagSlug(slug);
    if (!s || excludedSlugs.includes(s)) return;
    onAddTag(s);
    setSearch("");
    setOpen(false);
  }

  const showEmpty = filtered.length === 0 && !canCreate;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal sm:max-w-md"
        >
          <span className="truncate text-muted-foreground">{triggerLabel}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[min(100vw-2rem,24rem)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {showEmpty && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            )}
            <CommandGroup>
              {canCreate && (
                <CommandItem
                  value={`__create__${normalizedInput}`}
                  onSelect={() => pick(normalizedInput)}
                >
                  {addNewLabel(normalizedInput)}
                </CommandItem>
              )}
              {filtered.map((t) => (
                <CommandItem
                  key={t.slug}
                  value={t.slug}
                  onSelect={() => pick(t.slug)}
                >
                  <span className="font-medium">{t.slug}</span>
                  {t.name !== t.slug && (
                    <span className="ml-2 text-muted-foreground text-xs truncate">
                      {t.name}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
