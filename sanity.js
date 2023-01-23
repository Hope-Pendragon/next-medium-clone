import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-10-21",
	useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
	return builder.image(source);
}

export const getPostsData = `* [_type == "post"] {
	_id,
	_createdAt,
	title,
	description,
	slug {
		current
	},
	author -> {
		name,
		image {
			asset {
				_ref
			}
		}
	},
	mainImage {
		asset {
			_ref
		}
	},
	body,
	publishedAt
}`;

export const getPostsPaths = `* [_type == "post"] {
	_id,
	slug {
		current
	},
}`;

export const getPostBySlug = `* [_type == "post" && slug.current == $slug] [0] {
	_id,
	_createdAt,
	title,
	description,
	slug {
		current
	},
	author -> {
		name,
		image {
			asset {
				_ref
			}
		}
	},
	mainImage {
		asset {
			_ref
		}
	},
	body,
	publishedAt
}`;

export const getApprovedCommentsForOneArticle = `* [_type == "comment" && post._ref == $_ref && approved == true] {
		_id,
		comment,
		email,
		name,
		_createdAt
	}`;
