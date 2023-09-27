import { defineStore } from "pinia";

import Toaster from "@/core/services/Toaster";
import AuthenticationService from "@/core/services/AuthenticationService";
import { LoginReponseDto } from "@/types/Authentication";

export const useAuthenticationStore = defineStore({
  id: "authenticationStore",

  state: () => ({
    user: null as LoginReponseDto | null,
    dataLoading: false as boolean,
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.login({ email, password });

        localStorage.setItem("token", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        this.user = result.data;
        console.log("test test");
      } catch (error) {
        console.log(error);
        Toaster.error((error as Error).message);
      } finally {
        this.dataLoading = false;
      }

      return;
    },

    async refreshToken(email: string, password: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.login({ email, password });

        localStorage.setItem("token", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        this.user = result.data;
        console.log("test test");
      } catch (error) {
        console.log(error);
        Toaster.error((error as Error).message);
      } finally {
        this.dataLoading = false;
      }

      return;
    },


  },
});
