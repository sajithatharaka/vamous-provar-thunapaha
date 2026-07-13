import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMailMock = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail: sendMailMock }),
  },
}));

const { sendWelcomeEmail } = await import("../../src/lib/email.js");

describe("sendWelcomeEmail", () => {
  beforeEach(() => {
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue(undefined);
  });

  it("sends the waitlist confirmation copy to the registrant", async () => {
    await sendWelcomeEmail("test@example.com");

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const [{ to, text, html }] = sendMailMock.mock.calls[0];

    expect(to).toBe("test@example.com");
    expect(text).toContain("you're now on the waitlist");
    expect(text).toContain(
      "I'm finalising the date, time, and menu, and I'll send all the details"
    );
    expect(text).toContain("Harshika");
    expect(html).toContain("you're now on the waitlist");
  });
});
