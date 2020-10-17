import Arts from "../../models/art.model";

export default {
  hello: () => 'Hello world!',

  api: () => 'api',

  art: () => {
      return Arts.findAll()
  }
};
