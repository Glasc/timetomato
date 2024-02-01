import type { ResultSet, Row } from "@libsql/client/.";

export default function responseDataAdapter(response: ResultSet) {
  const { columns, rows } = response;
  return rows.map((row) => {
    const obj: { [key: string]: Row[number] } = {};
    columns.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
}
