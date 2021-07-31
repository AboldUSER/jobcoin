import React from 'react';

export default function GetDaysInMonth (month: number, year : number) {
    console.log(new Date(year, month + 1, 0).getDate() + ' day calculator');
    
    return new Date(year, month + 1, 0).getDate();
}