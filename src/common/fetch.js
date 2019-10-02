import C from './constants';

const { SERVICE } = C;

if (typeof global.self === 'undefined') global.self = global;

export default async ({ service, ...props }) => (
  new Promise((resolve, reject) => {
    fetch(`${SERVICE}/${service}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'GET',
      props,
    })
      .then(async (response) => {
        const json = await response.json();

        if (response.status >= 400) reject({ code: response.status, message: json.message }); // eslint-disable-line
        else resolve(json);
      }).catch(({ message = 'Something wrong happened. Try again.', response } = {}) => {
        reject({ // eslint-disable-line
          code: response ? response.status : 500,
          message,
        });
      });
  })
);
