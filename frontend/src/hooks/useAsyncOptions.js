import api from "api";
import { isEmpty, isFinite } from "lodash";

export const formatParams = (params) => {
  const _params = {};

  for (let [key, value] of Object.entries({ ...params })) {
    if (!isEmpty(value) || isFinite(value)) {
      if (typeof value === "object" && "id" in value) {
        _params[key] = value.id;
      } else {
        _params[key] = value;
      }
    }
  }
  return _params;
};

export default function useAsyncOptions(name_api, initial_params = {}) {
  const asyncOptions = async (search, params = {}) => {
    const _params = formatParams({ ...initial_params, ...params });
    if (search) _params.search = search;
    _params.async_options = true;
    try {
      const _data = await api.get(name_api, { params: _params });
      if (_data && _data.results) return _data.results;
    } catch (e) {
      return [];
    }
  };

  return { asyncOptions };
}
