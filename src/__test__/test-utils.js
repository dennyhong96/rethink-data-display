import { render } from "@testing-library/react";
import { UserRecordsProvider } from "@context/UserRecords";

const Providers = ({ children }) => {
	return <UserRecordsProvider>{children}</UserRecordsProvider>;
};

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
