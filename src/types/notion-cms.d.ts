export interface NotionCMSResponse {
  status: string;
  type: string;
  page_id: string;
  page_title: string;
  page_cover: string;
  page_icon: string;
  html: string;
  internal_page_ids: string[];
  readTime: ReadTime;
  collection_id?: string;
  database_records?: DatabaseRecords[];
  current_record?: PageRecords;
}

export interface DatabaseRecords {
  id: StringRecord;
  page_cover: StringRecord;
  page_icon: StringRecord;
  date: StringRecord;
  title: StringRecord;
}

export interface PageRecords {
  id: StringRecord;
  page_cover: StringRecord;
  page_icon: StringRecord;
  category?: StringArrayRecord;
  title: StringRecord;
  date?: StringRecord;
}

export interface StringRecord {
  type: string;
  value: string;
}

export interface StringArrayRecord {
  type: string;
  value: string[];
}

export interface ReadTime {
  numWords: number;
  numImages: number;
  totalWordsReadTimeInMinutes: number;
  totalImageReadTimeInMinutes: number;
  totalReadTimeInMinutes: number;
}
