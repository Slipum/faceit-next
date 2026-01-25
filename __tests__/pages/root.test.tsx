import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import RootLayout from "@/app/layout";

describe("Root pages", () => {
  it("renders home with Header", () => {
    render(<Home />);
    expect(screen.getByText(/Faceit-Next/)).toBeInTheDocument();
  });

  it("wraps children with layout html structure", () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
    // Ensure html scaffolding exists
    expect(document.documentElement.lang).toBe("en");
  });
});
