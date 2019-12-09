const workerActionWrapper = (action) => `
self.onmessage = (event) => {
  const result = (${action}).apply(null, event.data); // Run action
  self.postMessage(result); // Post results back to main thread
  return close(); // Terminate Web Worker
};
`;

export default (action) => {
  const URL = window.URL || window.webkitURL;
  const response = workerActionWrapper(action); // Accepts args, returns action results
  const blob = new Blob([response], { type: 'application/javascript' }); // Action as JS blob
  const objectURL = URL.createObjectURL(blob); // Needed for Web Worker instantiation
  const worker = new Worker(objectURL); // Create worker
  URL.revokeObjectURL(objectURL); // Release object URL
  worker.run = (...args) => new Promise((resolve, reject) => { // Custom method on Web Worker
    worker.onmessage = (event) => resolve(event.data); // Receive results from Web Worker
    worker.onerror = reject; // Relay error
    worker.postMessage(args); // Send args to Web Worker
  });
  return worker;
};
