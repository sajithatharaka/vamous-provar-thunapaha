import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FaqAccordion from "@/components/FaqAccordion";

const items = [
  { q: "Do I need to know how to cook?", a: "Absolutely not." },
  { q: "How many people per session?", a: "Maximum 8 guests." },
];

describe("FaqAccordion", () => {
  it("renders every question and starts fully collapsed", () => {
    render(<FaqAccordion items={items} />);

    expect(
      screen.getByText("Do I need to know how to cook?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("How many people per session?")
    ).toBeInTheDocument();
    expect(screen.getByText("Absolutely not.")).toBeInTheDocument();
  });

  it("opens the clicked question and closes it again on a second click", () => {
    render(<FaqAccordion items={items} />);
    const toggle = screen
      .getByText("Do I need to know how to cook?")
      .closest("button");

    fireEvent.click(toggle);
    expect(toggle.querySelector("span:last-child")).toHaveClass("rotate-45");

    fireEvent.click(toggle);
    expect(toggle.querySelector("span:last-child")).not.toHaveClass(
      "rotate-45"
    );
  });

  it("only shows one open question at a time", () => {
    render(<FaqAccordion items={items} />);
    const [firstToggle, secondToggle] = screen
      .getAllByRole("button")
      .slice(0, 2);

    fireEvent.click(firstToggle);
    expect(firstToggle.querySelector("span:last-child")).toHaveClass(
      "rotate-45"
    );

    fireEvent.click(secondToggle);
    expect(firstToggle.querySelector("span:last-child")).not.toHaveClass(
      "rotate-45"
    );
    expect(secondToggle.querySelector("span:last-child")).toHaveClass(
      "rotate-45"
    );
  });
});
