globalThis.window = globalThis;
const mockElem = {
  nodeType: 1,
  tagName: "DIV",
  relList: {}, setAttribute: () => {}, getAttribute: () => null,
  appendChild: () => {}, style: {}, addEventListener: () => {},
  ownerDocument: null
};
globalThis.document = {
  nodeType: 9,
  createElement: () => ({ ...mockElem }),
  createTextNode: () => ({ nodeType: 3, textContent: "" }),
  createComment: () => ({ nodeType: 8 }),
  querySelectorAll: () => [],
  querySelector: () => mockElem,
  getElementById: (id) => mockElem,
  getElementsByTagName: () => [mockElem],
  addEventListener: () => {},
  title: "",
  head: mockElem,
  body: mockElem
};
mockElem.ownerDocument = globalThis.document;
globalThis.MutationObserver = class { observe() {} disconnect() {} };
globalThis.fetch = () => Promise.resolve({});
globalThis.btoa = (s) => s;
globalThis.location = { search: "", pathname: "/", href: "http://localhost:3456/" };
globalThis.navigator = { userAgent: "test" };
globalThis.requestIdleCallback = (cb) => setTimeout(cb, 10);
