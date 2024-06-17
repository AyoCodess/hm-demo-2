export function removeUnderscoreAndDashesAndCapitalize(gender: string): string {
	return gender
		.replace(/_/g, ' ')
		.replace(/-/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
