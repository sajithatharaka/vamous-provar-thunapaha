import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button", () => {
  it("renders a <button> by default and forwards the click handler", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);

    const el = screen.getByRole("button", { name: "Send" });
    fireEvent.click(el);

    expect(el.tagName).toBe("BUTTON");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an <a> when given an href, for nav/anchor use", () => {
    render(
      <Button href="#waitlist" data-testid="nav-waitlist-link">
        Join Waitlist
      </Button>
    );

    const el = screen.getByTestId("nav-waitlist-link");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "#waitlist");
  });

  it("applies the pill/fill classes for the primary variant", () => {
    render(<Button data-testid="primary-btn">Go</Button>);
    expect(screen.getByTestId("primary-btn").className).toContain("bg-clay");
  });

  it("applies the outline classes for the secondary variant", () => {
    render(
      <Button variant="secondary" data-testid="secondary-btn">
        Go
      </Button>
    );
    const el = screen.getByTestId("secondary-btn");
    expect(el.className).toContain("border-charcoal");
    expect(el.className).not.toContain("bg-clay");
  });

  it("disables the button and drops the hover-lift affordance when disabled", () => {
    render(
      <Button disabled data-testid="disabled-btn">
        Go
      </Button>
    );
    const el = screen.getByTestId("disabled-btn");
    expect(el).toBeDisabled();
    expect(el.className).not.toContain("hover-lift");
  });
});
