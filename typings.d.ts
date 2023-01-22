export interface BodyText {
	_key: string;
	_type: string;
	text: string;
}

export interface PostBody {
	_key: string;
	_type: string;
	children: [BodyText];
}

export interface SanityImage {
	asset: {
		_ref: string;
	};
}

export interface SanityAuthor {
	name: string;
	image: SanityImage;
}

export interface SanityPost {
	_id: string;
	_createdAt: string;
	title: string;
	description: string;
	slug: {
		current: string;
	};
	author: SanityAuthor;
	mainImage: SanityImage;
	body: [PostBody];
	publishedAt: string;
}
