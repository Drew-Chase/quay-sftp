import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {cn, Tooltip} from "@heroui/react";
import {motion} from "framer-motion";

export type TagOption = {
    name: string;
    code: string;
    color: string;
    selectedColor: string;
}

export const tagOptions: TagOption[] = [
    {name: "production", code: "prod", color: "#d74745", selectedColor: "#9e2625"},
    {name: "staging", code: "stag", color: "#d29000", selectedColor: "#805a00"},
    {name: "development", code: "dev", color: "#04ab62", selectedColor: "#027a46"},
    {name: "other", code: "other", color: "#907ae9", selectedColor: "#6250a3"}
];

type TagGroupSelectorProps = {
    label?: string;
    value?: TagOption | undefined;
    onChange?: Dispatch<SetStateAction<TagOption | undefined>>;
    size?: "sm" | "md" | "lg";
    className?: string;
    classNames?: TagGroupSelectorClassNames;
}

type TagGroupSelectorClassNames = {
    label?: string;
    container?: string;
    button?: string;
}

export function TagGroupSelector(props: TagGroupSelectorProps)
{
    const {value, onChange, label, size = "md", className, classNames} = props;
    const [selectedItem, setSelectedItem] = useState(value);

    useEffect(() =>
    {
        setSelectedItem(value);
    }, [value]);

    const scale = size === "sm" ? 0.08 : size === "lg" ? 0.125 : 0.1;
    return (
        <div className={cn("flex flex-col gap-2 h-full", className)}>
            <label htmlFor="tag-group-selector" className={cn("text-2xs text-ink-3", classNames?.label)}>{label}</label>
            <div className={cn("flex flex-row gap-3 items-center h-full", classNames?.container)}>
                {tagOptions.map((option) => (
                    <Tooltip key={option.code} content={option.name} delay={1000} placement={"top"} classNames={{content: "text-xs text-ink-2 p-2 rounded-md uppercase bg-surface-3"}}>
                        <motion.div
                            key={option.code}
                            className={cn(`rounded-full cursor-pointer`, classNames?.button)}
                            onClick={() =>
                            {
                                onChange?.(option);
                                setSelectedItem(option);
                            }}
                            initial={{scale: 1, opacity: 1, backgroundColor: option.color}}
                            animate={{backgroundColor: selectedItem?.code === option.code ? option.selectedColor : option.color}}
                            whileHover={{scale: 1.15}}
                            whileTap={{scale: 0.95}}
                            transition={{duration: 0.2}}
                            style={{
                                width: `calc(${16 * scale}rem - 8px)`, height: `calc(${16 * scale}rem - 8px)`,
                                boxShadow: `0 0 0 4px ${option.color}`
                            }}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}