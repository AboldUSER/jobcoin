import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface IDateSelectorProps {
    updateYear: (arg: number | unknown) => void
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

export default function YearSelector({ updateYear }: IDateSelectorProps) {

    const classes = useStyles();

    const currentYear = new Date().getFullYear();

    const yearArray: Number[] = [];

    for (let i = 0; i < 5; ++i) {
        yearArray.push(currentYear - i);
    }

    const [selectedYear, setSelectedYear] = React.useState<{ year: number | unknown }>({
        year: currentYear
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof selectedYear;
        setSelectedYear({
            [name]: event.target.value,
        });
        updateYear(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-year-native">Year</InputLabel>
                <Select
                    native
                    value={selectedYear.year}
                    onChange={handleChange}
                    label="Year"
                    inputProps={{
                        name: 'year',
                        id: 'outlined-year-native',
                    }}
                >
                    {yearArray.map(year => (
                        <option key={Number(year)} value={Number(year)}>{year}</option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
