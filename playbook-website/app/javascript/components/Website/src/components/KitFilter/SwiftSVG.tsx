import React from 'react';

type SwiftSVGProps = {
	active: boolean,
}

export const SwiftSVG = ({ active }: SwiftSVGProps) => {
	const svgColor = active ? '#0056CF' : '#687887'

	return (
		<div className="filter-icon">
			<svg width="18" height="16" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_4127_43623)">
					<path d="M24.6981 16.885C24.7611 16.759 24.7611 16.633 24.8241 16.508C26.3361 10.585 22.7441 3.65498 16.5701 0.000976562C18.5221 2.44698 19.7021 5.58298 19.7021 8.99598C19.7021 10.028 19.5941 11.034 19.3891 12.005L19.4061 11.91C19.3191 12.3 19.2111 12.638 19.0761 12.962L19.0911 12.921C18.8911 12.81 18.7261 12.706 18.5671 12.594L18.5861 12.606C13.8291 9.45698 9.6851 6.03098 5.9351 2.21698L5.9241 2.20598C8.3621 5.80798 10.8891 8.95598 13.6461 11.884L13.6101 11.845C9.4891 9.20498 5.9081 6.46698 2.5711 3.46398L2.6471 3.53098C3.1211 4.31498 3.6191 4.99398 4.1711 5.62398L4.1571 5.60698C7.4571 10.03 11.1471 13.879 15.2561 17.233L15.3731 17.325C12.1601 19.28 7.6861 19.405 3.1491 17.325C1.9461 16.755 0.913102 16.125 -0.0458984 15.402L0.000101563 15.435C2.0221 18.582 4.8801 21.036 8.2611 22.514L8.3811 22.561C10.0741 23.4 12.0681 23.892 14.1771 23.892C16.2861 23.892 18.2801 23.401 20.0511 22.527L19.9731 22.562H20.0371C20.1831 22.497 20.3081 22.412 20.4151 22.31H20.4141C21.9261 21.554 24.8881 20.737 26.5261 23.883C26.9661 24.765 27.7851 20.67 24.6991 16.889L24.6981 16.885Z" fill={svgColor} />
				</g>
				<defs>
					<clipPath id="clip0_4127_43623">
						<rect width="27" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}
