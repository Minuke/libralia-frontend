import { Delta } from "quill";

export interface Blog {
  title: string;
  editor: Delta;
}