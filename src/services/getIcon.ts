const BASE_URL = 'icons.svg';

export default function getIconUrl(iconId: string): string {
  return `/${BASE_URL}#${iconId}`;
}