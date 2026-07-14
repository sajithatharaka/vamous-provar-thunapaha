import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const captureEmailMock = vi.fn();

vi.mock("@/lib/actions", () => ({
  captureEmail: (...args) => captureEmailMock(...args),
}));

const { default: EmailForm } = await import("@/components/EmailForm");

describe("EmailForm", () => {
  beforeEach(() => {
    captureEmailMock.mockReset();
  });

  it("renders unique data-testids for the email input and submit button", () => {
    render(<EmailForm testId="hero-waitlist" />);

    expect(screen.getByTestId("hero-waitlist-email-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("hero-waitlist-submit-button")
    ).toBeInTheDocument();
  });

  it("submits the entered email and shows the success message", async () => {
    captureEmailMock.mockResolvedValue({ success: true });
    render(
      <EmailForm testId="hero-waitlist" successMsg="Thanks for joining!" />
    );

    fireEvent.change(screen.getByTestId("hero-waitlist-email-input"), {
      target: { value: "guest@example.com" },
    });
    fireEvent.click(screen.getByTestId("hero-waitlist-submit-button"));

    await waitFor(() =>
      expect(screen.getByText("Thanks for joining!")).toBeInTheDocument()
    );

    const submittedFormData = captureEmailMock.mock.calls[0][0];
    expect(submittedFormData.get("email")).toBe("guest@example.com");
  });

  it("shows the server error message when the submission fails", async () => {
    // Use a syntactically valid address so jsdom's built-in HTML5 email
    // constraint validation lets the submit through — this exercises the
    // *server-reported* error path (e.g. a duplicate/rejected signup), not
    // browser-level format validation.
    captureEmailMock.mockResolvedValue({
      success: false,
      error: "Something went wrong. Please try again.",
    });
    render(<EmailForm testId="hero-waitlist" />);

    fireEvent.change(screen.getByTestId("hero-waitlist-email-input"), {
      target: { value: "guest@example.com" },
    });
    fireEvent.click(screen.getByTestId("hero-waitlist-submit-button"));

    await waitFor(() =>
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument()
    );
  });

  it("passes buttonVariant through to the submit Button (for use on a Clay background)", () => {
    render(<EmailForm testId="final-cta-waitlist" buttonVariant="secondary" />);

    const submitButton = screen.getByTestId("final-cta-waitlist-submit-button");
    expect(submitButton.className).toContain("border-charcoal");
    expect(submitButton.className).not.toContain("bg-clay");
  });
});
