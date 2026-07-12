import { describe, expect, it, vi, beforeEach } from "vitest";

const fromMock = vi.fn();
const sendWaitlistEmailsMock = vi.fn();

vi.mock("../../src/lib/supabase.js", () => ({
  supabase: { from: (...args) => fromMock(...args) },
}));

vi.mock("../../src/lib/email.js", () => ({
  sendWaitlistEmails: (...args) => sendWaitlistEmailsMock(...args),
}));

const { captureEmail } = await import("../../src/lib/actions.js");

function formDataWithEmail(email) {
  const formData = new FormData();
  formData.append("email", email);
  return formData;
}

function mockInsertResult(error) {
  fromMock.mockReturnValue({
    insert: vi.fn().mockResolvedValue({ error }),
  });
}

describe("captureEmail", () => {
  beforeEach(() => {
    fromMock.mockReset();
    sendWaitlistEmailsMock.mockReset();
  });

  it("rejects an invalid email without touching Supabase", async () => {
    const result = await captureEmail(formDataWithEmail("not-an-email"));

    expect(result).toEqual({
      success: false,
      error: "Please enter a valid email address.",
    });
    expect(fromMock).not.toHaveBeenCalled();
  });

  it("inserts a valid email, sends waitlist emails, and reports success", async () => {
    mockInsertResult(null);
    sendWaitlistEmailsMock.mockResolvedValue(undefined);

    const result = await captureEmail(
      formDataWithEmail("  Test@Example.com  ")
    );

    expect(fromMock).toHaveBeenCalledWith("leads");
    expect(sendWaitlistEmailsMock).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual({ success: true });
  });

  it("treats a duplicate email as success without re-sending emails", async () => {
    mockInsertResult({ code: "23505" });

    const result = await captureEmail(formDataWithEmail("test@example.com"));

    expect(result).toEqual({ success: true, alreadyExists: true });
    expect(sendWaitlistEmailsMock).not.toHaveBeenCalled();
  });

  it("reports a generic error on other Supabase failures", async () => {
    mockInsertResult({ code: "500", message: "boom" });

    const result = await captureEmail(formDataWithEmail("test@example.com"));

    expect(result).toEqual({
      success: false,
      error: "Something went wrong. Please try again.",
    });
  });

  it("still reports success when the waitlist email fails to send", async () => {
    mockInsertResult(null);
    sendWaitlistEmailsMock.mockRejectedValue(new Error("SMTP down"));

    const result = await captureEmail(formDataWithEmail("test@example.com"));

    expect(result).toEqual({ success: true });
  });
});
