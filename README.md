# Regex Dictionary

A list of ~500k English words searchable with regex. The project explores the feasibility of filtering and displaying large datasets without hindering UI performance.

Note that this project was for experimental purposes and is not meant to be used as a definitive list of words found in the English language. Further, the list contains many words and phrases which some may find inappropriate. The author is neither the creator nor the host of the word list. For issues regarding words found in the word list, please refer to [this repository](https://github.com/dwyl/english-words).

## Development

Ensure [Node.js](https://nodejs.org/en/) is installed. Clone the repository and navigate to project directory.

`git clone https://github.com/ashtonmeuser/regex-dictionary.git && cd regex-dictionary`

Install dependencies and run the development server.

`npm install && npm run serve`

See the `scripts` portion of [package.json](package.json) for options to build and deploy the project.

## Design

The project is built using [Vue.js](https://vuejs.org/) and [Vuex](https://vuex.vuejs.org/).

The words used in this project are downloaded from [this repository](https://github.com/dwyl/english-words) upon the `created` lifecycle event of the [App](src/App.vue) component. See [lifecycle documentation](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) of Vue components for more information.

This experiment highlighted three interesting problems:

1. Rendering a list of nearly 500k words
2. Efficiently filtering a large list using regex
3. Thread management to avoid interrupting user interaction

### Rendering

Rendering a large list was made trivial by implementing [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller). A `RecycleScroller` component is introduced which renders only elements that are visible. When a user scrolls, the existing list items' DOM is reused.

Simple elements are used within the `RecycleScroller` to avoid the overhead involved with rendering functional Vue components.

A `DynamicScroller` should be used if list items are to have a dynamic height.

### Filtering

The word list is filtered using a regex pattern. The two main ways to match strings against a regex pattern are [String.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) and [RegExp.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test). In practice, the `RegExp.test()` method proved to be far more efficient. See the Regex Performance section of this document for a deeper look into both methods.

The word list is filtered in the `filterWords` action of the [Vuex store](/src/store/index.js).

### Threading

JavaScript is a single-threaded language. There is, however, a relatively new means of offloading work to a background thread known as [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

A Web Worker is instantiated by providing a file containing the JavaScript it is to execute. The author created the [WebWorker](/src/WebWorker.js) wrapper class to handle inline JavaScript. The `run()` method of the class can be used to execute the provided function with supplied arguments. The wrapper class was largely inspired by [simple-web-worker](https://github.com/israelss/simple-web-worker).

The `WebWorker` class returns a standard `Worker` instance. As such, the created workers can be cancelled via the `Worker.terminate()` method. Each time a new regex pattern is entered, the current background worker, if it exists, is terminated and a new worker is created with the updated pattern. If the worker successfully filters the word list before a new pattern is entered, the filtered list is returned to the main thread via the `onmessage()` event handler and the store is updated. This allows the UI to remain responsive.

## Regex Performance

The `RegExp.test()` method proved to be roughly 60 to 350 times faster than `String.match()`. See the table below for tests run againt the word list (466,551 words at the time of writing, n=10 for each test).

| Regex Pattern | RegExp.test (ms) | String.match (ms)   |
|---------------|------------------|---------------------|
| ^aa.*$        | 31.10 (s=5.07)   | 9686.20 (s=46.36)   |
| (.{2,})\1\1   | 189.90 (s=1.64)  | 12843.70 (s=134.82) |
| (.)\1{3,}     | 135.50 (s=8.22)  | 13525.50 (s=123.14) |
| ^\d.*\d$      | 29.30 (s=1.10)   | 10394.20 (s=185.55) |

Based on the fact that the execution times of the two methods are non-linear, it is the author's conclusion that there is an overhead involved with the `String.match()` method. This may involve creating the array which is to store match groups returned by the `String.match()` method. This has been discussed [here](https://stackoverflow.com/questions/10940137/regex-test-v-s-string-match-to-know-if-a-string-matches-a-regular-expression) and [here](https://ultimatecourses.com/blog/understanding-regular-expression-matching-with-test-match-exec-search-and-split).
