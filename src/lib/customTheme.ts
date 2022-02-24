import { extendTheme } from "native-base";

export const customTheme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        _focus: {
          borderWidth: 1,
          borderColor: "rose.500",
        },
      },
    },
  },
});

type CustomThemeType = typeof customTheme;

declare module "native-base" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
