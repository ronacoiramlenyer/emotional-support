import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckInForm } from "@/components/CheckInForm";
import { setStorage } from "@/lib/storage";
import { createLocalStorage, memoryKeyValue } from "@/lib/storage/local";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

beforeEach(() => {
  push.mockReset();
  setStorage(createLocalStorage(memoryKeyValue()));
});

describe("CheckInForm", () => {
  it("shows six feelings, then six more on request", async () => {
    const user = userEvent.setup();
    render(<CheckInForm />);
    expect(screen.getAllByRole("radio")).toHaveLength(7); // 6 + own words
    await user.click(screen.getByRole("button", { name: "More feelings +" }));
    expect(screen.getAllByRole("radio")).toHaveLength(13);
    expect(screen.getByRole("radio", { name: "Lonely" })).toBeInTheDocument();
  });

  it("disables Continue until a feeling is chosen, then saves and navigates", async () => {
    const user = userEvent.setup();
    render(<CheckInForm />);
    const cont = screen.getByRole("button", { name: /continue/i });
    expect(cont).toBeDisabled();

    await user.click(screen.getByRole("radio", { name: "Sad" }));
    expect(screen.getByText("You chose")).toBeInTheDocument();
    await user.type(screen.getByLabelText("What would you like to acknowledge?"), "miss ko na sila");
    await user.click(cont);

    expect(push).toHaveBeenCalledWith(expect.stringMatching(/^\/acknowledge\?c=/));
  });

  it("requires a word for 'In my own words'", async () => {
    const user = userEvent.setup();
    render(<CheckInForm />);
    await user.click(screen.getByRole("radio", { name: "In my own words" }));
    const cont = screen.getByRole("button", { name: /continue/i });
    expect(cont).toBeDisabled();
    await user.type(screen.getByLabelText("What's the word for it?"), "lutang");
    expect(cont).toBeEnabled();
  });
});
