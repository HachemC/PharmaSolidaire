import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const CustomSelect = styled(Select)(({ theme, focused }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: focused ? "green" : theme.palette.grey[300], // Border color when focused
    },
    "&:hover fieldset": {
      borderColor: focused ? "green" : theme.palette.grey[500], // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "green", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: focused ? "green" : theme.palette.text.primary, // Label color when focused
  },
}));

export default function SelectComponent({ label, options, value, onChange }) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <CustomSelect
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoWidth
        label={label}
        focused={isFocused}
        variant="outlined" // Ensures that the Select uses the outlined style
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
}
