import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useState, useMemo } from "react";
import { svelteDocsLinks, DocLink } from "./docs-data";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", title: "All Documentation" },
    { value: "introduction", title: "Introduction" },
    { value: "runes", title: "Runes" },
    { value: "template", title: "Template Syntax" },
    { value: "styling", title: "Styling" },
    { value: "special", title: "Special Elements" },
    { value: "runtime", title: "Runtime" },
    { value: "misc", title: "Misc" },
    { value: "reference", title: "Reference" },
    { value: "sveltekit", title: "SvelteKit" },
    { value: "tutorial", title: "Tutorial & Resources" },
  ];

  const filteredDocs = useMemo(() => {
    return svelteDocsLinks.filter((doc) => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      const matchesSearch =
        searchText === "" ||
        doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.keywords?.some((keyword) => keyword.toLowerCase().includes(searchText.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchText, selectedCategory]);

  return (
    <List
      navigationTitle="Search Svelte Docs"
      searchBarPlaceholder="Search Svelte documentation..."
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown tooltip="Select Category" value={selectedCategory} onChange={setSelectedCategory}>
          {categories.map((category) => (
            <List.Dropdown.Item key={category.value} title={category.title} value={category.value} />
          ))}
        </List.Dropdown>
      }
    >
      {filteredDocs.length === 0 ? (
        <List.EmptyView
          icon={Icon.MagnifyingGlass}
          title="No documentation found"
          description="Try a different search term"
        />
      ) : (
        filteredDocs.map((doc) => (
          <List.Item
            key={doc.id}
            icon={getCategoryIcon(doc.category)}
            title={doc.title}
            subtitle={doc.description}
            accessories={[{ tag: doc.category }]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url={doc.url} />
                <Action.CopyToClipboard
                  content={doc.url}
                  title="Copy URL"
                  shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                />
                <Action.CopyToClipboard
                  content={doc.title}
                  title="Copy Title"
                  shortcut={{ modifiers: ["cmd", "shift"], key: "t" }}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}

function getCategoryIcon(category: DocLink["category"]): Icon {
  switch (category) {
    case "introduction":
      return Icon.Book;
    case "runes":
      return Icon.Wand;
    case "template":
      return Icon.Code;
    case "styling":
      return Icon.Brush;
    case "special":
      return Icon.Stars;
    case "runtime":
      return Icon.Gear;
    case "misc":
      return Icon.List;
    case "reference":
      return Icon.Terminal;
    case "sveltekit":
      return Icon.Box;
    case "tutorial":
      return Icon.Book;
    default:
      return Icon.Document;
  }
}
