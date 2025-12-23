"use client";

import { useIMask } from "react-imask";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type PhoneInputProps = {
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
};

export function PhoneInput({ register, error, className }: PhoneInputProps) {
  const { ref, setValue } = useIMask(
    {
      mask: "+38 (000) 000 00 00",
      lazy: true,
      placeholderChar: "_",
    },
    {
      onAccept: (value) => {
        register.onChange({ target: { value, name: register.name } });
      },
    },
  );

  return (
    <div>
      <input
        {...register}
        ref={(e) => {
          register.ref(e);
          ref.current = e;
        }}
        type="tel"
        placeholder="+38 (0__) ___ __ __"
        onFocus={(e) => {
          if (!e.target.value) {
            setValue("+38 (0");
          }
        }}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
