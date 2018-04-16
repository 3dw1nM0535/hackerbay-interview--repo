import _ from "lodash";

// parse error object
export default function parseErrors(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });

  return result;
}
