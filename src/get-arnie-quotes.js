const { httpGet } = require("./mock-http-interface");

// add more statuses if needed
const STATUS = {
  FULFILLED: "fulfilled",
};

// add more status codes if needed
const STATUS_CODE = {
  SUCCESS: 200,
};

// const getArnieQuotes = async (urls) => {
//   const responses = await Promise.allSettled(urls.map((url) => httpGet(url)));

//   const results = responses.map((res) => {
//     if (res.status === STATUS.FULFILLED) {
//       const { status, body } = res.value;
//       const { message } = JSON.parse(body);

//       return status === STATUS_CODE.SUCCESS
//         ? { "Arnie Quote": message }
//         : { FAILURE: message };
//     }

//     // In case httpGet rejects, handle it here
//     // and return failure message
//   });

//   return results;
// };

const getArnieQuotes = async (urls, batchSize = 2) => {
  const results = [];

  for (let start = 0; start < urls.length; start += batchSize) {
    const slice = urls.slice(start, start + batchSize);

    await Promise.all(
      slice.map(async (url) => {
        try {
          const { status, body } = await httpGet(url);
          const { message } = JSON.parse(body);

          const result =
            status === STATUS_CODE.SUCCESS
              ? { "Arnie Quote": message }
              : { FAILURE: message };

          results.push(result);
        } catch (err) {
          results.push({ FAILURE: err.message });
        }
      })
    );
  }

  return results;
};

module.exports = {
  getArnieQuotes,
};
