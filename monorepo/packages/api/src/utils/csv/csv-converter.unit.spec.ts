import {
  checkObjectNested,
  convertToArray,
  createCSV,
  dataRows,
  emptyObject,
  escapeCSVField,
  getHeaders,
  headerRow,
} from "./csv-converter";

describe("emptyObject", () => {
  it("should throw error when data is empty array", () => {
    expect(() => emptyObject([])).toThrow(
      "CSV empty object, cannot create csv"
    );
  });
});

describe("checkObjectNested", () => {
  it("should throw error when property contains array", () => {
    const data = { orderId: "asd@asd.asd-2", products: [25144, 2444] };
    const headers = ["orderId", "products"];
    expect(() => checkObjectNested(data, headers)).toThrow(
      "Property 'products' contains nested array, please transform it"
    );
  });
  it("should throw error when property contains object", () => {
    const data = { orderId: "asd@asd.asd-2", products: { id: 25144 } };
    const headers = ["orderId", "products"];
    expect(() => checkObjectNested(data, headers)).toThrow(
      "Property 'products' contains nested object, please transform it"
    );
  });
  it("should throw error when property contains both object and array", () => {
    const data = {
      orderId: "asd@asd.asd-2",
      products: [
        { id: 25144, quantity: 1 },
        { id: 23222, quantity: 11 },
        { id: 1111, quantity: 25 },
      ],
    };
    const headers = ["orderId", "products"];
    expect(() => checkObjectNested(data, headers)).toThrow(
      "Property 'products' contains nested array, please transform it"
    );
  });
});

describe("escapeCSVField", () => {
  it("should wrap field in quotes when it contains delimiter", () => {
    expect(escapeCSVField("hello,world", ",")).toBe('"hello,world"');
  });

  it("should escape double quotes by doubling them", () => {
    expect(escapeCSVField('say "hello"', ",")).toBe('"say ""hello"""');
  });
});

describe("getHeaders", () => {
  it("should return all headers from data array", () => {
    const data = [
      { orderId: "emiliakopec1994@o2.pl-1", price: 30 },
      { orderId: "emiliakopec1994@o2.pl-3", price: 22 },
    ];
    expect(getHeaders(data)).toEqual(
      expect.arrayContaining(["orderId", "price"])
    );
  });
  it("should return unique headers from data array", () => {
    const data = [
      { orderId: "emiliakopec1994@o2.pl-1", price: 30 },
      { quantity: 33, productId: 225144 },
    ];
    expect(getHeaders(data)).toEqual(
      expect.arrayContaining(["orderId", "price", "quantity", "productId"])
    );
  });

  it("should return empty array for empty data", () => {
    expect(getHeaders([])).toEqual([]);
  });
});

describe("convertToArray", () => {
  it("should return same array when input is array", () => {
    const data = [{ orderId: "emiliakopec1994@o2.pl-1" }];
    expect(convertToArray(data)).toBe(data);
  });

  it("should wrap single object in array", () => {
    const data = { orderId: "emiliakopec1994@o2.pl-1" };
    expect(convertToArray(data)).toEqual([data]);
  });
});

describe("headerRow", () => {
  it("should join headers with delimiter", () => {
    expect(headerRow(["orderId", "price"], ",")).toBe("orderId,price");
  });

  it("should escape headers that need escaping", () => {
    expect(headerRow(["orderId,price", "products"], ",")).toBe(
      '"orderId,price",products'
    );
  });
});

describe("dataRows", () => {
  it("should convert data to CSV rows", () => {
    const data = [{ orderId: "emiliakopec1994@o2.pl-1", price: 30 }];
    const headers = ["orderId", "price"];
    expect(dataRows(data, headers, ",")).toEqual([
      "emiliakopec1994@o2.pl-1,30",
    ]);
  });
});

describe("createCSV", () => {
  it("should create CSV from single object", () => {
    const data = [
      { orderId: "emiliakopec1994@o2.pl-1", price: 30 },
      { orderId: "emiliakopec1994@o2.pl-2", price: 45 },
    ];
    const result = createCSV(data, ",");
    expect(result).toContain("orderId,price");
    expect(result).toContain("emiliakopec1994@o2.pl-1,30");
    expect(result).toContain("emiliakopec1994@o2.pl-2,45");
  });
  it("should use \n", () => {
    const data = { orderId: "emiliakopec1994@o2.pl-1" };
    const result = createCSV(data);
    expect(result).toBe("orderId\nemiliakopec1994@o2.pl-1");
  });
  it("should use \n, semicolon as default ", () => {
    const data = { orderId: "emiliakopec1994@o2.pl-1", price: "25.25" };
    const result = createCSV(data);
    expect(result).toBe("orderId;price\nemiliakopec1994@o2.pl-1;25.25");
    expect(result).toContain(";");
    expect(result).toContain("\n");
  });
  it("should use \n, with defined delimiter ", () => {
    const data = { orderId: "emiliakopec1994@o2.pl-1", price: "25.25" };
    const result = createCSV(data, ",");
    expect(result).toBe("orderId,price\nemiliakopec1994@o2.pl-1,25.25");
    expect(result).toContain(",");
    expect(result).toContain("\n");
  });
});
