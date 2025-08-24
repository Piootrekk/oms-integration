import { DataRecord } from "./csv.types";

const emptyObject = (data: DataRecord[]) => {
  if (!data) throw new Error("CSV data cannot be null or undefined");
  if (data.length === 0) throw new Error("CSV empty object, cannot create csv");
};

const checkObjectNested = (data: DataRecord, headers: string[]) => {
  headers.forEach((header) => {
    const inspectedProp = data[header];
    if (Array.isArray(inspectedProp)) {
      throw new Error(
        `Property '${header}' contains nested array, please transform it`
      );
    }
    if (typeof inspectedProp === "object") {
      throw new Error(
        `Property '${header}' contains nested object, please transform it`
      );
    }
  });
};

const escapeCSVField = (field: string, delimiter: string): string => {
  const fieldStr = String(field ?? "");
  if (
    fieldStr.includes(delimiter) ||
    fieldStr.includes("\n") ||
    fieldStr.includes("\r") ||
    fieldStr.includes('"')
  ) {
    return `"${fieldStr.replace(/"/g, '""')}"`;
  }
  return fieldStr;
};

const getHeaders = (data: DataRecord[]) => {
  const headersSet = new Set<string>();
  data.forEach((record) => {
    Object.keys(record).forEach((key) => headersSet.add(key));
  });
  const headers = Array.from(headersSet);
  return headers;
};

const convertToArray = (data: DataRecord | DataRecord[]): DataRecord[] => {
  if (Array.isArray(data)) return data;
  else return [data];
};

const headerRow = (headers: string[], delimiter: string): string => {
  const headerRow = headers
    .map((header) => escapeCSVField(header, delimiter))
    .join(delimiter);
  return headerRow;
};

const dataRows = (
  data: DataRecord[],
  headers: string[],
  delimiter: string
): string[] => {
  const datarows = data.map((record) => {
    if (!record || typeof record !== "object") {
      return headers.map(() => "").join(delimiter);
    }
    return headers
      .map((header) => escapeCSVField(String(record[header] ?? ""), delimiter))
      .join(delimiter);
  });

  return datarows;
};

const createCSV = (
  data: DataRecord | DataRecord[],
  delimiter: string = ";"
): string => {
  const correctData = convertToArray(data);
  emptyObject(correctData);
  const headers = getHeaders(correctData);
  checkObjectNested(correctData[0], headers);
  const header = headerRow(headers, delimiter);
  const rows = dataRows(correctData, headers, delimiter);

  return [header, ...rows].join("\n");
};

export { createCSV };
