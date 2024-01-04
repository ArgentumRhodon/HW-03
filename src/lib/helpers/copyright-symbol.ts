export default function getCopyrightText(text: string): string {
	return text.replace('(P)', '℗').replace('(C)', '©').replace('(R)', '®');
}
