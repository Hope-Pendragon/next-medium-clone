export function getTimePassedSinceDate(targetDate: Date) {
	const currentDate = new Date();
	const millisecondsPassed = currentDate.getTime() - targetDate.getTime();
	const secondsPassed = millisecondsPassed / 1000;
	const minutesPassed = millisecondsPassed / (1000 * 60);
	const hoursPassed = millisecondsPassed / (1000 * 60 * 60);
	const yearsPassed = millisecondsPassed / (1000 * 60 * 60 * 24 * 365);
	const daysPassed = millisecondsPassed / (1000 * 60 * 60 * 24);
	const monthsPassed = millisecondsPassed / (1000 * 60 * 60 * 24 * 12);
	const weeksPassed = millisecondsPassed / (1000 * 60 * 60 * 24 * 52);
	const timePassed = 0;
}
