import settings from 'settings.json'
import { tailwindColors } from 'src/libs/colors.ts'

type Props = {
	title: string
}
const OgImageMarkup = ({ title }: Props) => {
	const primaryColor =
		tailwindColors[settings.primaryColor as keyof typeof tailwindColors]
	const logoColor =
		tailwindColors[settings.logoColor as keyof typeof tailwindColors]
	return (
		<div
			style={{
				display: 'flex',
				padding: ' 0 7px 7px 0',
				height: '100%',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					overflow: 'hidden',
					color: tailwindColors.gray[900],
					backgroundColor: primaryColor[50],
					backgroundImage: `radial-gradient(circle at 25px 25px, ${primaryColor['300']} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${primaryColor['300']} 2%, transparent 0%)`,
					backgroundSize: '100px 100px',
					border: 'solid black',
					borderWidth: '6px',
					borderRadius: '3rem',
					boxShadow: '7px 7px black',
				}}
			>
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					version="1.1"
					viewBox="0 0 162 92"
					xmlns="http://www.w3.org/2000/svg"
					fill={primaryColor['300']}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: '100%',
						height: '85%',
					}}
					preserveAspectRatio="none"
				>
					<path d="m0 0h162v92c-80.495-54.981-99.261-7.2988-162-64.538z" />
				</svg>
				<span
					style={{
						fontSize: '6rem',
						margin: '0 4rem',
					}}
				>
					{title}
				</span>
				<span
					style={{
						position: 'absolute',
						right: '1rem',
						bottom: '1rem',
						fontSize: '3rem',
						color: logoColor[400],
						textShadow: '.08em .08em 0 black',
					}}
				>
					{settings.title}
				</span>
			</div>
		</div>
	)
}

export default OgImageMarkup
