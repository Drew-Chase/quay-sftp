import {Button, cn, Input as OgComp, InputProps} from "@heroui/react";
import {forwardRef, useRef} from "react";
import {open, OpenDialogOptions} from "@tauri-apps/plugin-dialog";

type FileInputProps = InputProps & {
    fileOpenProps?: OpenDialogOptions;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) =>
{
    const {labelPlacement, variant, classNames, fileOpenProps, value, onBlur, ...rest} = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const scrollToEnd = () =>
    {
        requestAnimationFrame(() =>
        {
            const input = inputRef.current;

            if (!input) return;

            const end = input.value.length;
            input.setSelectionRange(end, end);
            input.scrollLeft = input.scrollWidth;
        });
    };

    return (
        <OgComp
            ref={(node: HTMLInputElement | null) =>
            {
                inputRef.current = node;

                if (typeof ref === "function")
                {
                    ref(node);
                } else if (ref)
                {
                    ref.current = node;
                }
            }}
            value={value}
            onBlur={event =>
            {
                onBlur?.(event);
                scrollToEnd();
            }}
            labelPlacement={labelPlacement ?? "outside-top"}
            variant={variant ?? "faded"}
            classNames={{
                label: cn("uppercase text-2xs text-ink-3 -mb-1", classNames?.label),
                input: cn("placeholder:text-ink-4 placeholder:text-sm font-mono", classNames?.input),
                inputWrapper: cn("bg-surface-2 border-hairline border-1", classNames?.inputWrapper),
                ...classNames
            }}
            endContent={
                <Button
                    onPress={async () =>
                    {
                        const result = await open(fileOpenProps);
                        if (result)
                        {
                            rest.onValueChange?.(result);
                        }
                        scrollToEnd();
                    }}
                    variant="light"
                    size="sm"
                >
                    Browse...
                </Button>
            }
            {...rest}
        />
    );
});