import { Delta } from "quill";

export interface Blog {
  title: string;
  contento: Delta;
}