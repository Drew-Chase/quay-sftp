import {cn, Select as OgComp, SelectProps} from "@heroui/react";
import {forwardRef} from "react";

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) =>
{
    const {labelPlacement, variant, classNames, ...rest} = props;
    const {label, value, trigger, ...restClassNames} = {...classNames};
    return (
        <OgComp
            ref={ref}
            labelPlacement={labelPlacement ?? "outside-top"}
            variant={variant ?? "faded"}
            classNames={{
                label: cn("uppercase text-2xs text-ink-3 -mb-1", label),
                value: cn("placeholder:text-ink-4 placeholder:text-sm", value),
                trigger: cn("bg-surface-2 border-hairline border-1", trigger),
                ...restClassNames
            }}
            {...rest}
        />);
});