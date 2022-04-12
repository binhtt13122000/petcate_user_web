import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface GraphQLErrorType extends Error {
    response: {
        status: number;
        errors: Array<{
            message: string;
            extensions: {
                path: string;
                code: string;
            };
        }>;
    };
}

export type IId = {
    id: number;
};

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export const getTimeFromStringDate = (dateText: string) => {
    try {
        let dateConvert = new Date(dateText);
        let timeText = dateConvert.toTimeString().split(" ")[0];
        return timeText;
    } catch (e) {
        return e;
    }
};

export const numberFormat = (value: number) =>
    new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    }).format(value);

export const numberFormatWithNoCurrency = (value: number) => {
    const currencyFractionDigits = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    }).resolvedOptions().maximumFractionDigits;

    const result = value.toLocaleString("it-IT", {
        maximumFractionDigits: currencyFractionDigits,
    });
    return result;
};

export const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const getAgeFromDateOfBirth = (dateOfBirth: string): number => {
    let today = new Date();
    let birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age <= 0 ? 0 : age;
};

export const getDateOfBirthFromAge = (age: number): string => {
    let ageInMillis = age * 365 * 24 * 60 * 60 * 1000;
    let dateOfBirth = new Date(new Date().getTime() - ageInMillis);
    return dateOfBirth.toDateString();
};

export const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
};

export const getDateOfBirthFromNumberMonths = (months: number): string => {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let totalDays = 0;
    while (months > 0) {
        let numberDaysInMonth = daysInMonth(currentMonth, currentYear);
        if (months < 1) {
            numberDaysInMonth = Math.floor(months * numberDaysInMonth * 1.0);
        }
        totalDays += numberDaysInMonth;
        if (currentMonth === 1) {
            currentYear -= 1;
            currentMonth = 12;
        } else {
            currentMonth -= 1;
        }
        months -= 1;
    }
    let ageInMillis = totalDays * 24 * 60 * 60 * 1000;
    let dateOfBirth = new Date(new Date().getTime() - ageInMillis);
    return dateOfBirth.toLocaleDateString();
};

export const monthDifferenceTwoDate = (day1: Date, day2: Date) => {
    var months;
    months = (day2.getFullYear() - day1.getFullYear()) * 12;
    months -= day1.getMonth();
    months += day2.getMonth();
    return months <= 0 ? 0 : months;
};

export const addDaysCusom = (date: Date, days: number): Date => {
    date.setDate(date.getDate() + days);
    return date;
};

export const formatDateCustomDateMonthYear = (date: string) => {
    let d = new Date(date);
    date = [
        ("0" + d.getDate()).slice(-2),
        ("0" + (d.getMonth() + 1)).slice(-2),
        d.getFullYear(),
    ].join("-");
    return date;
};

export const convertTimeToDateTime = (time: string) => {
    if (time) {
        const splitTime = time.split(":");
        if (splitTime.length >= 2) {
            return new Date(0, 0, 0, Number.parseInt(splitTime[0]), Number.parseInt(splitTime[1]));
        }
        return null;
    }
    return null;
};
export interface IImage {
    original: string;
    thumbnail: string;
}
