export interface PageRequest {
  order: number;
  content: string;
}

export interface PageResponse {
  id: string;
  order: number;
  content: string;
}

export interface ChapterRequest {
  title: string;
  order?: number;
  pages?: PageRequest[];
}

export interface ChapterResponse {
  id: string;
  title: string;
  order: number;
  pages: PageResponse[];
}

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  chapters: ChapterResponse[];
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  tags?: string[];
  chapters?: ChapterRequest[];
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  description: string;
  tags?: string[];
  chapters?: ChapterRequest[];
}

export interface PatchedUpdateBookRequest {
  title?: string;
  author?: string;
  description?: string;
  tags?: string[];
  chapters?: ChapterRequest[];
}

export interface PaginatedBookResponse {
  count: number;
  page: number;
  page_size: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
  results: BookResponse[];
}
