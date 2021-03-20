import React from "react";

import { render } from "../test-utils";

import AppHeader from "@components/AppHeader";

jest.mock("@lib/api");

describe("AppHeader", () => {
	beforeEach(() => {});

	test("Search input should be rendered", () => {
		const { getByTestId } = render(<AppHeader />);
		const searchWrapper = getByTestId("search-wrapper");
		const searchInput = searchWrapper.querySelector("input");
		expect(searchInput).toBeVisible();
	});

	test("Search input clear button should be rendered", () => {
		const { getByTestId } = render(<AppHeader />);
		const searchClearButton = getByTestId("search-clear");
		expect(searchClearButton).toBeVisible();
	});
});
