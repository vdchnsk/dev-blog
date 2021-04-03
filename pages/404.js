import Link from "next/link";
import { Fragment } from "react";
import { MainLayout } from "../components/MainLayout";
import ErrorStyles from '../styles/error.module.scss'

export default function ErrorPage (){
    return(
        <MainLayout title={"404"}>
            <h1 className={ErrorStyles.errorTitle}>Error 404</h1>
            <h2 className={ErrorStyles.errorTextSecondary}>Plaese, <Link href={"/"}>go back</Link> to safety</h2>
        </MainLayout>
    )
}