import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


interface IDateSelectorProps {
  updateMonth: (arg: number | unknown) => void;
  selectedYear: (number | unknown);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(3),
      minWidth: 120,
      margin: 'auto'
    }
  }),
);

export default function MonthSelector({ updateMonth, selectedYear }: IDateSelectorProps) {

  const classes = useStyles();

  const currentMonth = new Date().getMonth();

  const yearToUse = selectedYear;
  

  const [selectedMonth, setSelectedMonth] = React.useState<{ month: number | unknown }>({
    month: currentMonth
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof selectedMonth;
    setSelectedMonth({
      [name]: event.target.value,
    });
    updateMonth(event.target.value);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const monthArray: Number[] = [];

  const currentYear = new Date().getFullYear();

  for (let i = 0; i < 12; ++i) {
    if (Number(currentYear) !== Number(yearToUse)) {
      monthArray[i] = i;
    } else if (currentMonth - i >= 0) {
      monthArray.push(i)
    }
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-month-native">Month</InputLabel>
        <Select
          native
          value={selectedMonth.month}
          onChange={handleChange}
          label="Month"
          inputProps={{
            name: 'month',
            id: 'outlined-month-native',
          }}
        >
          {monthArray.map(month => (
            <option key={Number(month)} value={Number(month)}>{months[Number(month)]}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

