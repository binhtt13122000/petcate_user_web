import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const languages: {
    en: { nativeName: string };
    vi: { nativeName: string };
} = {
    en: { nativeName: "English" },
    vi: { nativeName: "Tiếng Việt" },
};

const LanguageSwitcher: React.FC<{ bgColor?: string; color?: string }> = ({ bgColor, color }) => {
    const router = useRouter();
    return (
        <Select
            sx={{
                color: color || "#fff",
                backgroundColor: bgColor || "transparent",
            }}
            size="small"
            labelId="label"
            id="select"
            value={router.locale}
        >
            <MenuItem value={"en"}>
                <Link
                    href={{ pathname: router.pathname, query: router.query }}
                    as={router.asPath}
                    locale="en"
                >
                    {languages["en"].nativeName}
                </Link>
            </MenuItem>
            <MenuItem value={"vi"}>
                <Link
                    href={{ pathname: router.pathname, query: router.query }}
                    as={router.asPath}
                    locale="vi"
                >
                    {languages["vi"].nativeName}
                </Link>
            </MenuItem>
        </Select>
    );
};

export default LanguageSwitcher;
