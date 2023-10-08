import { defineStore } from "pinia";
import { useJwt } from "@vueuse/integrations/useJwt";
import Toaster from "@/core/services/Toaster";
import { useLocalStorage } from "@vueuse/core";
import AuthenticationService from "@/core/services/AuthenticationService";
import { LoginReponseDto } from "@/types/Authentication";
import router from "@/router";

export const useAuthenticationStore = defineStore({
  id: "authenticationStore",

  state: () => ({
    user: useLocalStorage<Partial<LoginReponseDto>>("user", {}),
    dataLoading: false as boolean,
    userPermissions: useLocalStorage<number[]>("userPermissions", []),
    emailForPasswordReset: useLocalStorage<string>("emailForPasswordReset", ""),
  }),
  getters: {
    hasPermission(state) {
      return (permission: number) => state.userPermissions.includes(permission);
    },
    isAuthenticated(state) {
      return state.user?.accessToken !== undefined;
    },
  },
  actions: {
    async login(email: string, password: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.login({ email, password });

        this.user = result.data;

        const { payload } = useJwt<Record<string, unknown>>(
          result.data.accessToken
        );

        this.userPermissions = JSON.parse(
          payload.value!.Permissions as string
        ) as number[];

        router.push({ name: "dashboard" });
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
      }

      return;
    },
    async refreshToken(email: string, password: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.login({ email, password });

        this.user = result.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
      }
    },
    async logout() {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.logout(
          this.user!.refreshToken!
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
        this.user = {};
        this.userPermissions = [];
      }
    },
    async sendConfirmationCode(email: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.sendConfirmationCode(email);
        this.emailForPasswordReset = email;
        console.log(result);
        router.push({ name: "otp" });
        Toaster.Success("تم إرسال كود التفعيل بنجاح");
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
      }
    },
    async confirmOtp(otp: string) {
      this.dataLoading = true;
      try {
        const result = await AuthenticationService.cofirmOtp(
          this.emailForPasswordReset,
          otp
        );
        console.log(result);
        router.push({ name: "sign-in" });
        Toaster.Success("تم إرسال كلمة المرور إلى بريدك الإلكتروني بنجاح");
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
      }
    },
  },
});
