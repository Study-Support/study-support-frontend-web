import {get} from 'lodash';

const CONFIG = {
  constants: {
    statusCodes: {
      unauthorized: 401,
      validation: 422,
      forbidden: 403,
      notFound: 404,
    },
    pagination: 10,
  }
};
const useConfig = () => {
  const getConfig = (
    keyPath: string,
    defaultValue?: any,
  ): any => get(CONFIG, keyPath, defaultValue);
  return {getConfig};
};

export default useConfig;
