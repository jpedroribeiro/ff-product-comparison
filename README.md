![Flowers](https://cdn.builder.io/api/v1/image/assets%2Fbb2447fcd31e4bf78272b962b2c40b62%2F4e271ff9aaef42709fe80114acb74de8)

Welcome to my implementation of the Freddie's Flowers Assignment - Product Comparison!

## tl;dr 

You can access the built version of the app at TODO INSERT URL HERE

## Project structure

This is a standard [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The main files to be considered when reviewing this exercise are:

```
.
├──__tests__
│   ├── comparison-table.test.tsx
│   ├── product-card.test.tsx
│   ├── product-context.test.tsx
│   ├── product-list.test.tsx
│   └── product-comparison.test.tsx
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── comparison-table.tsx
│   ├── product-card.tsx
│   ├── product-comparison.tsx
│   └── product-list.tsx
├── lib
│   └── product-context.ts
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── package.json
├── public
│   ├── freddies-flowers-title.400d78d8.woff2
│   └── montserrat.e1c529c0.woff2
└── README.md

```

## Components

There is only one route, `/`, which loads `<Home/>`. That is just a wrapper for `<ProductComparison/>` which loads the global state management `<ProductProvider/>` and its children. This is where everything happens.

The UI components are self contained, and in this exercise they do not have state. I felt it was more appropriate to have the state management in a global context, and the UI components would just consume the state.

## React Context for state management

I have taken the decision to use React Context to manage state in this application for a few reasons:

1. It has a straightforward API
1. It requires little setup or boilerplating
1. It's built into React so it's good for performance since it doesn't require downloading and bundling an external package
1. It fits this app's requirements

Having said that, it could be a problem in terms of scalling. If this application had several other views, each with its own state, managing them all in a single context would start to get messy. In that case, it would be best to use a state management library like Redux or a global state management library like Zustand.

## Testing

I have added a few tests to the application. They are not comprehensive but enough to ensure the components work as expected given the agreed data contract. 

There is a lot of mocked content here and there. Ideally we would've centralised it in a constants file for easier maintenance, but it's not a priority for this exercise.

I have used [jest](https://jestjs.io) and [react testing library](https://testing-library.com/docs/react-testing-library/intro).

To run the tests, run:

```bash
npm run test
```

## Design & UX limitations

As you can clearly see while running this app, I'm not a designer 🙂. However, I tried to keep it simple and clean and focused on the core functionalities and the engineering behind it.

It is responsive, so it works well on all devices. 

The comparison table has colour indicators that highlight the best and worst features of each product (based on price and rating).

I have added a limitation of __max 5 products__ to be selected. This is a personal choice. I feel that more than 5 products on a table like this would be overwhelming to the user due to the amount of data in place. If I were working on this project for a specific target audience, I would suggest __user testing__ different options and make a decision based on that to remove personal biases.

## Accessibility, performance, and SEO

I have added a few __accessibility__ features to the application and ensured it followed best practices for performance and SEO. It passes [Lightouse](https://web.dev/lighthouse-axe/) checks.

Since the given API doesn't support __pagination__, I output all the products at once. This is OK for this exercise but on a production application, I would have tried to align with backend team to implement pagination. If that was not possible, another solution would to create either a middleware or a custom API route to handle it.

I have also added [Product Schema](https://schema.org/Product) to the application to improve __SEO__ since structured data helps search engines understand the content of the page better.

## Running the application

To run the application, run:

```bash
# install packages
npm install
# run development server
npm run dev
# build and start production server
npm run build
npm run start
```