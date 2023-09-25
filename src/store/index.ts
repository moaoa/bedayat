import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/common/AuthModule";
import BodyModule from "@/store/modules/common/BodyModule";
import BreadcrumbsModule from "@/store/modules/common/BreadcrumbsModule";
import ConfigModule from "@/store/modules/common/ConfigModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
  },
});

export default store;
