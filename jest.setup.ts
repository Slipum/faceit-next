import "@testing-library/jest-dom";
import "whatwg-fetch";

// Use fetch mock in tests that opt-in
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - provided at runtime when needed
global.fetch = global.fetch;

// Mock next/navigation hooks used in components under test
jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/dist/client/components/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }),
  };
});
