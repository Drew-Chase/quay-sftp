import {Switch as OgComp, SwitchProps} from "@heroui/react";
import {forwardRef} from "react";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) =>
{
    const {classNames, ...rest} = props;
    const {...restClassNames} = {...classNames};
    return (
        <OgComp
            ref={ref}
            classNames={{
                label: "text-sm text-ink-2",
                thumb: "group-data-[selected=true]:bg-primary bg-white/50 min-h-3 h-3 max-h-3 min-w-3 max-w-3 w-3",
                wrapper: "group-data-[selected=true]:bg-primary/20 border-1 group-data-[selected=true]:border-primary border-white/50 h-4 w-9",
                ...restClassNames
            }}
            {...rest}
        />);
});