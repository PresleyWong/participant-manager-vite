import {
  extendTheme,
  defineStyle,
  defineStyleConfig,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const UploadFileButton = ({ onChange }) => {
  const bgColor = useColorModeValue("transparent", "transparent");
  const textColor = useColorModeValue("#4E843B", "#80BA69");
  const borderColor = useColorModeValue("#4E843B", "#80BA69");

  return (
    <Input
      sx={{
        "::file-selector-button": {
          border: "1px",
          borderColor: borderColor,
          bg: bgColor,
          color: textColor,
          fontWeight: "600",
          padding: "5px 10px",
          borderRadius: "0.375rem",
          cursor: "pointer",
        },
      }}
      variant="unstyled"
      multiple
      type="file"
      accept=".pdf, .xlsx, .xls"
      onChange={onChange}
    />
  );
};

export const customTheme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: (props) => ({
          bg: props.colorMode === "dark" ? "primary.70" : "primary.80",
          color: props.colorMode === "dark" ? "primary.20" : "primary.10",
        }),
        primaryOutline: (props) => ({
          border: "1px",
          borderColor: props.colorMode === "dark" ? "primary.70" : "primary.50",
          color: props.colorMode === "dark" ? "primary.70" : "primary.50",
        }),
        secondary: (props) => ({
          bg: props.colorMode === "dark" ? "neutral.30" : "neutral.90",
          color: props.colorMode === "dark" ? "neutral.80" : "neutral.10",
        }),
        error: (props) => ({
          bg: props.colorMode === "dark" ? "error.80" : "error.40",
          color: props.colorMode === "dark" ? "error.20" : "error.100",
        }),
        errorOutline: (props) => ({
          border: "1px",
          borderColor: props.colorMode === "dark" ? "error.70" : "error.50",
          color: props.colorMode === "dark" ? "error.70" : "error.50",
        }),
        username: (props) => ({
          bg: props.colorMode === "dark" ? "secondary.60" : "secondary.70",
          color: props.colorMode === "dark" ? "secondary.10" : "secondary.10",
        }),
      },
    },
    Textarea: {
      variants: {
        custom: (props) => ({
          fontSize: "13",
          border: "2px solid",
          borderColor: props.colorMode === "dark" ? "primary.80" : "primary.70",
        }),
      },
    },
    Select: {
      variants: {
        custom: (props) => ({
          field: {
            fontSize: "13",
            border: "2px solid",
            borderColor:
              props.colorMode === "dark" ? "primary.80" : "primary.70",
          },
        }),
      },
    },
    Link: {
      variants: {
        custom: (props) => ({
          _hover: {
            textDecoration: "none",
            bg: props.colorMode === "dark" ? "teal.300" : "teal.600",
          },
        }),
      },
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "neutralVariant.20" : "neutral.100",
        },
      }),
    },
    Switch: {
      variants: {
        custom: (props) => ({
          track: {
            _checked: {
              bg: props.colorMode === "dark" ? "secondary.70" : "secondary.60",
            },
          },
        }),
      },
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'helvetica', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        fontSize: "1rem",
      },
      thead: {
        bg: mode("neutral.40", "neutral.0")(props),
        color: mode("neutral.100", "neutral.80")(props),
      },
      th: {
        color: "#ffffff !important",
        textTransform: "capitalize !important",
        cursor: "pointer",
      },
      tbody: {
        tr: {
          _odd: {
            bg: mode("neutral.95", "neutral.20")(props),
          },
          _even: {
            bg: mode("neutral.100", "neutral.10")(props),
          },
        },
      },
    }),
  },
  colors: {
    primary: {
      0: "#000000",
      10: "#052101",
      20: "#0E3903",
      30: "#1F510E",
      40: "#366A25",
      50: "#4E843B",
      60: "#679F52",
      70: "#80BA69",
      80: "#98D682",
      90: "#B6F29C",
      95: "#CCFFB4",
      99: "#F7FFEE",
      100: "#FFFFFF",
    },
    secondary: {
      0: "#000000",
      10: "#012021",
      20: "#013738",
      30: "#034F50",
      40: "#05686B",
      50: "#098486",
      60: "#0DA0A3",
      70: "#24BDC0",
      80: "#50D9DC",
      90: "#72F5F9",
      95: "#B7FCFE",
      99: "#F1FFFF",
      100: "#FFFFFF",
    },
    error: {
      0: "#000000",
      10: "#410204",
      20: "#68050B",
      30: "#920A14",
      40: "#B92123",
      50: "#DD3C38",
      60: "#FE5850",
      70: "#FE8B80",
      80: "#FEB5AD",
      90: "#FFDAD7",
      95: "#FFEDEA",
      99: "#FFFBFF",
      100: "#FFFFFF",
    },
    neutral: {
      0: "#000000",
      10: "#1A1C18",
      20: "#2F312D",
      30: "#464743",
      40: "#5D5F5A",
      50: "#767872",
      60: "#90918B",
      70: "#ABACA6",
      80: "#C6C7C0",
      90: "#E3E3DC",
      95: "#F1F1EA",
      99: "#FDFDF6",
      100: "#FFFFFF",
    },
    neutralVariant: {
      0: "#000000",
      10: "#181D15",
      20: "#2D3229",
      30: "#43483F",
      40: "#5B6055",
      50: "#73796E",
      60: "#8D9287",
      70: "#A8ADA1",
      80: "#C3C8BB",
      90: "#DFE4D7",
      95: "#EEF3E5",
      99: "#F9FEF0",
      100: "#FFFFFF",
    },
    lightSurface: {
      0: "#FDFDF6",
      1: "#F3F6EB",
      2: "#EDF1E5",
      3: "#E7EDDF",
      4: "#E5EBDC",
      5: "#E1E8D8",
    },
    darkSurface: {
      0: "#1A1C18",
      1: "#20251D",
      2: "#242B20",
      3: "#283023",
      4: "#293224",
      5: "#2C3627",
    },
  },
});
