import {cn, NumberInput as OgComp, NumberInputProps} from "@heroui/react";
import {forwardRef} from "react";

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) =>
{
    const {labelPlacement, variant, classNames, ...rest} = props;
    const {label, input, inputWrapper, ...restClassNames} = {...classNames};
    return (
        <OgComp
            ref={ref}
            variant={variant ?? "faded"}
            labelPlacement={labelPlacement ?? "outside-top"}
            classNames={{
                label: cn("uppercase text-2xs text-ink-3 -mb-1", label),
                input: cn("placeholder:text-ink-4 placeholder:text-sm", input),
                inputWrapper: cn("bg-surface-2 border-hairline border-1", inputWrapper),
                ...restClassNames
            }}
            {...rest}
        />);
});