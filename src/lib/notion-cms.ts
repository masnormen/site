import axios from "axios";
import type { NotionCMSResponse, PageRecords } from "../types/notion-cms";

const API_URL = "https://api.usenotioncms.com/v0/public";

type GetPublicPageArgs = {
  pageId: string;
  apiKey: string;
};

export async function getPublicPage<R = PageRecords>({ pageId, apiKey }: GetPublicPageArgs) {
  const url = `${API_URL}/${pageId}?apiKey=${encodeURIComponent(apiKey)}`;
  return (await axios.get<NotionCMSResponse>(url)).data;
}
