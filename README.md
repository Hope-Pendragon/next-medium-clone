# Medium Clone

## Index

1. [Setup](#setup)
    1. [Project initialization](#project-initialization)
    2. [Sanity setup](#sanity-setup)
2. [Using Sanity](#using-sanity)
    1. Build before start
    2. Getting image urls
    3. Sanity queries
3. [Alternative Syntaxes](#alternative-syntaxes)

## Setup

### Project initialization

Run the following command inside the project directory:

```
npx create-next-app --example with-tailwindcss .
```

This will create a Next.js starting project bootstrapped with TailwindCSS.

### Sanity setup

If Sanity CLI is not installed:

```
npm i -g @sanity/cli
```

For this specific project, run the command:

```
sanity init --coupon sonny2022
```

Follow the prompts and select the following options:

-   Choose a project name.
-   Use default dataset configuration.
-   Confirm default output path.
-   Select `Blog (Schema)` project template.
-   Select preferred package manager.

## Using Sanity

> Because of a version disparity between the tutorial that originally created this project and Sanity's latest version, some additional steps need to be taken in order to use Sanity in this project.

### Build before start

The original project was able to run the Sanity Studio simply by using the `sanity start` command.

However, doing this in the current project **does not** work and the [Sanity project folder](sanity-youtube) needs to be built first.

To do this simply run the `sanity build` command.

After building, running the `sanity start` command will open the Sanity Studio in your local host (at http://localhost:3333/).

Notes:

> When running the `sanity start` command (after building), the Sanity CLI specifies that Sanity Studio is running in _production view mode._
>
> This could be the reason why it's required to build before starting. _(My assumption being that the latest version of Sanity might default to running in production view mode whereas previous versions did not.)_
>
> There exists the option to start a development server through the Sanity CLI using `sanity run dev`. This would _presumably_ start the Sanity Studio in _development view mode._
>
> However, attempting this **does not work** and returns multiple errors, mostly related to PostCSS and TailwindCSS.
>
> There might be a simpler fix, such as installing the necessary dependencies within the [Sanity project folder](sanity-youtube) itself — running `npm i -D postcss tailwindcss` — and then adding (or updating) the necessary config files.
>
> _I opted not to pursue that option in fear of causing more problems._

**Important:**
The [Sanity project folder](sanity-youtube) will need to be rebuilt every time a change is made to any file within it (such as when editing schemas). Failing to do so means the changes will not reflect.

### Getting image urls

In order to get the urls of images served by Sanity, the custom `urlFor` helper function(found inside [sanity.js](sanity.js)) is used.

The original project implemented `urlFor` like this[^1]:

```js
export const urlFor = (config) => createImageUrlBuilder(config);
```

[^1]: \* The syntax might be incorrect and should be double checked and updated if necessary.

Unfortunately, this does not work. Looking at the `SanityClient` module's source code indicates that this is likely a depreciated implementation.

The following (working) implementation is given in the Sanity documentation:

```js
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
	return builder.image(source);
}
```

The `urlFor` function can be used as follows:

```jsx
<img src={urlFor(mainImage.asset._ref).url()} alt="" />
```

> In this example `mainImage.asset._ref` is a string value that looks something like this `image-41dfc50a6f4762788730104d14cc74cc0f3e96df-6000x4000-jpg`.

### Sanity Queries

Sanity uses `GROQ` syntax to perform queries.

#### Basic query

Example: Query for posts.

> This query returns the \_id, title, description, slug, mainImage, and body properties of all posts.

```groq
* [_type == "post"] {
	_id,
	title,
	description,
	slug {
		current
	},
	mainImage {
		asset {
			_ref
		}
	},
	body
}
```

> Note that in the instance of a property having properties itself, specific properties can be queried. If none are specified, the entire property _object_ is provided.

The general syntax for querying properties looks like the json object of the schema, but without the property _values_.

When querying the properties of dependencies of an object, a `->` symbol must be used (inserted directly after the property name — see other examples for a more detailed example).

#### Querying for properties of dependencies

Example: Query for posts with an author dependency.

> This query returns the \_id, title, and author of a post. Only certain desired properties of the author are specified and queried.

```groq
* [_type == "post] {
	_id,
	title,
	author -> {
		name,
		image -> {
			asset -> {
				_ref
			}
		}
	},
}
```

> Note that the `->` symbol is used to get **properties of the _dependency_** _as well as_ any properties of those properties.

#### Querying for individual results using placeholders

<!-- To be added. -->

## Alternative Syntaxes

### getStaticProps in [Post page](pages/post/[slug].tsx)

Normal function syntax of `getStaticProps`:

```js
export async function getStaticProps({ params }: Params) {
	const query = getPostBySlug;

	const post = await sanityClient.fetch(query, { slug: params?.slug });
	console.log(post);
	return post ? { props: { post } } : { notFound: true };
}
```

Arrow function syntax of `getStaticProps`:

```js
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = getPostBySlug;

	const post = await sanityClient.fetch(query, { slug: params?.slug });
	console.log(post);
	return post ? { props: { post } } : { notFound: true };
};
```

**Note:**

> The primary difference between the two syntaxes is where typing is provided.
>
> The normal function types the `params` argument, whereas the arrow function types the function itself.

### Body component in post/\[slug\].tsx

The `body` property of a Sanity `post` is data from a rich text editor, and requires some manipulation to display the content correctly.

One possible way to implement it is to simply manipulate the data _without_ making use of any external packages. An alternative to this would be to use `@portabletext/react`.

1.  No-package implementation:

        The body component is implemented as follows in its entirety:

        ```jsx
        export function Body({ body }: SanityPost): ReactElement {
        	return (
        		<div className="mt-5 mb-3">
        			{body &&
        				body.map((part: PostBody) => {
        					if (part.children[0].text) {
        						return (
        							<p className="py-2">{part.children[0].text}</p>
        						);
        					} else {
        						return <></>;
        					}
        				})}
        		</div>
        	);
        }
        ```

    In this implementation, the complete `body` object is received as a parameter. Each block is then mapped over and the text of the part is taken and displayed.

    The main drawback of this implementation is that _only_ the text of the body is extracted, and any styling or additional information is lost.

    It also does not account for any non-text content inside blocks.

2.  `@portabletext/react` implementation:

        The body component is implemented as follows in its entirety:

    ```jsx
    export function Body({ body }: SanityPost): ReactElement {
    	const components = {
    		block: {
    			normal: ({ children }: any) => (
    				<span className="">
    					{children}
    					<br></br>
    				</span>
    			),
    		},
    	};

    	return (
    		<div className="mt-5 mb-3">
    			<PortableText value={body} components={components} />
    		</div>
    	);
    }
    ```

    Note that styling can be more precisely controlled by changing the _type_ of blocks inside Sanity's portable text editor _itself_. The types of blocks should **_always_** be checked regardless, due to the high impact it can have on the final presentation.
