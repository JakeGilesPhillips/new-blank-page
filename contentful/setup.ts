import { createClient } from 'contentful';
import { defaultLayout } from '../variables/constants';
import { IItem, ISize, IWindow, IWindowLayout } from '../variables/models';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_API_KEY ?? '',
});

export const getItems = async () => {
  const { items }: any = await client
    .getEntries({ content_type: 'item', 'fields.primary': true, include: 4 })
    .catch((er) => console.log(er));
  return formatItems(items);
};

export const formatItems = (items: any[]): IItem[] => {
  if (!items) return [];

  const formatted = items?.map(({ fields: item }) => formatItem(item));
  return formatted.sort((a, b) => a.order - b.order);
};

// Formats an item
const formatItem = (data: any): IItem => {
  const icon = formatUrl(data?.icon?.fields);

  return {
    name: data?.title,
    order: data?.order ?? 0,
    link: data?.link ?? null,
    iconUrl: icon,
    window: formatWindow(data?.window?.fields, icon),
  };
};

// Formats a window
const formatWindow = (data: any, icon?: string): IWindow => {
  if (!data) return {} as IWindow;
  return {
    title: data?.title,
    type: data?.windowType?.fields?.id,
    iconUrl: icon ?? undefined,
    layout: formatLayout(data?.layout?.fields),
    items: formatItems(data?.items),
    url: data?.url ?? null,
    document: data?.document ?? null,
  };
};

// Formats a layout
const formatLayout = (data: any): IWindowLayout => {
  return {
    ...defaultLayout,
    size: formatSize(data?.size?.fields),
  };
};

// Formats a size
const formatSize = (data: any): ISize => {
  if (data?.width && data?.height) return { height: `${data.height}%`, width: `${data.width}%` };
  if (data?.wpx && data?.hpx) return { height: `${data.hpx + 100}px`, width: `${data.wpx}px` };
  return defaultLayout.size;
};

// Formats a url
const formatUrl = (data: any): string | undefined => {
  if (data?.file?.url) return `https:${data.file.url}`;
  return undefined;
};
