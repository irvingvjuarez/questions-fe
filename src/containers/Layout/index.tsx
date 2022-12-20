import { Header } from "@app/components/Header"

type LayoutProps = {
	children: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}