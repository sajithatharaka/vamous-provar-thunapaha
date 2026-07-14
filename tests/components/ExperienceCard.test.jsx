import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Flame } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";

describe("ExperienceCard", () => {
  it("renders the title, description, and icon", () => {
    render(
      <ExperienceCard
        icon={Flame}
        accent="clay"
        title="Cook Together"
        description="Harshika teaches. You do."
      />
    );

    expect(
      screen.getByRole("heading", { name: "Cook Together" })
    ).toBeInTheDocument();
    expect(screen.getByText("Harshika teaches. You do.")).toBeInTheDocument();
  });

  it("renders a bullet list when items are provided", () => {
    render(
      <ExperienceCard
        accent="azulejo"
        title="Eat What We Made"
        description="Sit. Talk. Eat slowly."
        items={["Kottu roti from scratch", "Fresh-ground pol sambol"]}
      />
    );

    expect(screen.getByText("Kottu roti from scratch")).toBeInTheDocument();
    expect(screen.getByText("Fresh-ground pol sambol")).toBeInTheDocument();
  });

  it("renders a quote block when a quote is provided", () => {
    render(
      <ExperienceCard
        accent="turmeric"
        title="Eat What We Made"
        description="Sit. Talk. Eat slowly."
        quote="The secret Harshika's grandmother never wrote down."
      />
    );

    expect(
      screen.getByText(/The secret Harshika's grandmother never wrote down/)
    ).toBeInTheDocument();
  });

  it("only uses each accent color on small decorative areas, never as the card's surface fill", () => {
    const { container } = render(
      <ExperienceCard accent="turmeric" title="Dhal Curry" description="…" />
    );
    // The card surface itself stays neutral (Coconut) regardless of accent —
    // Turmeric in particular must never be a large fill per the brand guide.
    const card = container.firstChild;
    expect(card.className).toContain("bg-coconut");
    expect(card.className).not.toContain("bg-turmeric");
  });
});
