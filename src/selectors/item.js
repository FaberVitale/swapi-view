//@flow
const defaultItem = {
  data: {},
  meta: {},
  links: {}
};

export const getEditedKey = (item: ItemData = defaultItem) => {
  const meta = item.meta;

  if (!meta) {
    return "";
  }

  if (typeof meta.edited === "string") {
    return "edited";
  }

  if (typeof meta.wowaahaowowa === "string") {
    return "wowaahaowowa";
  }
  return "";
};

export const getItemName = (item: ItemData = defaultItem) => {
  const data = item.data;

  if (!data) {
    return "";
  }

  return data.name || data.title || data.whrascwo || "";
};

export const getItemNamesOfPage: (
  page: PageData,
  items: { [route: string]: ItemData }
) => Array<string> = (page, items) => {
  const routes = page.items;

  return routes.map(itemRoute => getItemName(items[itemRoute]));
};
