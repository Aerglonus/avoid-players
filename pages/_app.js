import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SSRProvider } from "@react-aria/ssr";
function MyApp({ Component, pageProps }) {
	return (
		<SSRProvider>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</SSRProvider>
	);
}

export default MyApp;
