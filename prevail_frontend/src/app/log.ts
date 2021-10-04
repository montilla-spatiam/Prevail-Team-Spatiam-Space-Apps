import { Entries } from "./entries";

export interface Log {
  "id": "string",
  "description": "string",
  "users": String[],
  "entries": [],
  "date_modified": "string",
  "date_published": "string",
  "tags": "string"
}
