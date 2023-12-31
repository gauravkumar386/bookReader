import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SelectCheckbox.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectCheckbox = (props) => {
  const { label, filterList = [], filterValues, setFilterValues } = props;

  const handleChange = (value, label) => {
    const clickedObject = filterValues.find((x) => x.label === label);
    if (clickedObject) {
      const data = filterValues.map((data) => {
        if (data.label === label) {
          return {
            ...data,
            values: data.values.includes(value)
              ? data.values.filter((x) => x !== value)
              : [...data.values, value],
          };
        } else {
          return data;
        }
      });
      setFilterValues(data);
    } else {
      setFilterValues([
        ...filterValues,
        {
          label,
          values: [value],
        },
      ]);
    }
  };

  return (
    <div className={styles.selectCheckbox}>
      <FormControl sx={{ width: 240 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          id="grouped-select"
          value={filterValues.reduce((r, e) => (r.push(...e.values), r), [])}
          label={label}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          size="small"
          sx={{ fontSize: 12 }}
        >
          <MenuItem
            value=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "rgba(255,0,0)",
              padding: "10px 20px",
              fontSize: "14px",
            }}
            onClick={() => setFilterValues([])}
          >
            <em>Clear Filter</em>
            <CloseIcon />
          </MenuItem>
          {filterList.map((data, index) => {
            return (
              <>
                <ListSubheader>{data.label}</ListSubheader>
                {data.values?.map((value, index1) => {
                  return (
                    <MenuItem
                      value={value}
                      key={index + "-" + index1}
                      sx={{ padding: 0.7 }}
                    >
                      <Checkbox
                        checked={filterValues
                          .find((x) => x.label === data.label)
                          ?.values.includes(value)}
                        onClick={() => handleChange(value, data.label)}
                      />
                      <ListItemText primary={value} />
                    </MenuItem>
                  );
                })}
              </>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCheckbox;
