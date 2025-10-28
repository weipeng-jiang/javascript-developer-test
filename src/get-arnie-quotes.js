const { httpGet } = require('./mock-http-interface');

// add more statuses if needed
const STATUS = {
  FULFILLED: 'fulfilled',
}

// add more status codes if needed
const STATUS_CODE = {
  SUCCESS: 200,
}

const getArnieQuotes = async (urls) => {
    const responses = await Promise.allSettled(urls.map((url) => httpGet(url)));

    const results = responses.map((res) => {
      if (res.status === STATUS.FULFILLED) {
        const { status, body } = res.value;
        const { message } = JSON.parse(body);

        return status === STATUS_CODE.SUCCESS
          ? { 'Arnie Quote': message }
          : { FAILURE: message };
      }

      // In case httpGet rejects, handle it here
      // and return failure message
    });

    return results;
};

module.exports = {
  getArnieQuotes,
};
