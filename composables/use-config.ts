import {get} from 'lodash';

const CONFIG = {
  constants: {}
};
const useConfig = () => {
  const getConfig = (
    keyPath: string,
    defaultValue?: any,
  ): any => get(CONFIG, keyPath, defaultValue);
  return {getConfig};
};

export default useConfig;
