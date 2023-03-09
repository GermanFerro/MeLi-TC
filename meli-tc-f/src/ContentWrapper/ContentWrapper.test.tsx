import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withRouterMock } from "../common/utils";
import { routes } from "./contants";

const ContentWrapperWithRouter = withRouterMock(routes);

describe("ContentWrapper", () => {
  it("renders breadcrumbs with child data", async () => {
    render(<ContentWrapperWithRouter />);

    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    userEvent.type(input, "something");
    fireEvent.click(screen.getByRole("button"));

    await screen.findByText("cat1");
    await screen.findByText("cat2");

    const firstItem = screen.getAllByTestId("ItemCard")[0];
    fireEvent.click(firstItem);

    await screen.findByText("cat3");
    await screen.findByText("cat4");
  });
});
