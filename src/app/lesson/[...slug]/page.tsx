import {loadLesson} from "@/helpers/lessonHelper";
import CustomMDXRemote from "@/components/CustomMDXRemote";
import {Metadata} from "next";
import styles from './styles.module.css';
import {BiError} from "react-icons/bi";
import ColorEmphasis from "../../../components/ColorEmphasis";
import React from "react";
import LessonCompletionButton from "@/components/LessonCompletionButton";
import IconButton from "@/components/IconButton";

interface LessonPageParameters {
    params: { slug: string[] };
}

interface LessonPageProps extends LessonPageParameters {

}

export const dynamic = "force-dynamic";

export async function generateMetadata(pageParams: LessonPageParameters): Promise<Metadata> {
    const lessonData = await loadLesson(pageParams.params.slug.join("/"));
    return {
        title: `${lessonData.meta.title} - The Joy of #100Devs`,
        description: lessonData.meta.description,
    };
}

export default async function Lesson(props: LessonPageProps) {
    const lesson = await loadLesson(props.params.slug.join("/"));
    return <>
        <article className={'bg-background-1 p-[16px] rounded-[8px] pt-12 px-8 xl:px-32 2xl:px-[16rem]'}>
            <h1>
                <ColorEmphasis>{lesson.meta.title}</ColorEmphasis>
            </h1>
            <CustomMDXRemote source={lesson.content}></CustomMDXRemote>
        </article>
        <div className={"flex justify-between items-center"}>
            <IconButton className={"bg-error"} icon={BiError}>Report Problem</IconButton>
            <LessonCompletionButton slug={props.params.slug}></LessonCompletionButton>
        </div>
    </>;
}
