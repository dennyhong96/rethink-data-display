import { Fragment, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { UserRecordsProvider } from "@context/UserRecords";
import theme from "@styles/theme";

export default function MyApp(props) {
	const { Component, pageProps } = props;

	useEffect(() => {
		// MUI specific setup - Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Fragment>
			<Head>
				<title>Rethink Date Display</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				{/* User Record Context */}
				<UserRecordsProvider>
					<Component {...pageProps} />
				</UserRecordsProvider>
			</ThemeProvider>
		</Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
