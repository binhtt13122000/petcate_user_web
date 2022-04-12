import { useTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";

export interface IHead {
    title: string;
    meta: string;
}

const IndexHead: React.FC<IHead> = (props: IHead) => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Head>
                <title>{t(`${props.title}`)}</title>
                <meta name={props.meta} content={props.meta} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
        </React.Fragment>
    );
};
export default IndexHead;
