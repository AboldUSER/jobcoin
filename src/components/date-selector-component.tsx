import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


interface IDateSelectorProps {
  updateMonth: (arg: number | unknown) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(3),
      minWidth: 120,
    }
  }),
);

export default function DateSelector({updateMonth}: IDateSelectorProps) {
  const classes = useStyles();

  const currentMonth = new Date().getMonth();

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

  console.log(selectedMonth.month + ' date selector');

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
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </Select>
      </FormControl>
    </div>
  );
}
