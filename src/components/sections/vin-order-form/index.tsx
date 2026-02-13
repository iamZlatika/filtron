"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrderRequestSchema,
  OrderRequestFormValues,
} from "@/schemas/order-request.schema";
import { PhoneInput } from "@/components/sections/vin-order-form/input/phone-input";
import GroupedSelect from "@/components/sections/vin-order-form/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dictionary } from "@/lib/i18n/getDictionary";
import {
  CAR_BRANDS,
  getYearsByDecade,
  stripHtml,
} from "@/components/sections/vin-order-form/helpers";
import { useMemo, useState } from "react";

interface VinOrderFormProps {
  locale: "uk" | "ru";
  dictionary: Dictionary;
}

const VinOrderForm = ({ locale, dictionary }: VinOrderFormProps) => {
  const router = useRouter();

  const [formStartTime] = useState(Date.now());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderRequestFormValues>({
    resolver: zodResolver(
      createOrderRequestSchema({
        form_error_vin: dictionary.form_error_vin,
        form_error_name: dictionary.form_error_name,
        form_error_phone: dictionary.form_error_phone,
        form_error_phone_format: dictionary.form_error_phone_format,
        form_error_problem: dictionary.form_error_problem,
      }),
    ),
    defaultValues: {
      name: "",
      phone: "",
      vin: "",
      brand: "",
      model: "",
      year: "",
      problem: "",
    },
  });
  const onSubmit = async (data: OrderRequestFormValues) => {
    // Anti-bot проверки
    const timeTaken = Date.now() - formStartTime;

    // Honeypot check
    if (data.email) {
      console.log("Bot detected: honeypot filled");
      return;
    }

    // Time check
    if (timeTaken < 3000) {
      console.log("Bot detected: too fast");
      return;
    }

    const safeData = {
      ...data,
      name: stripHtml(data.name ?? ""),
      vin: stripHtml(data.vin ?? ""),
      model: stripHtml(data.model ?? ""),
      problem: stripHtml(data.problem),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safeData),
      });

      if (!res.ok) {
        throw new Error("Failed to send form");
      }

      // 🔐 Флаг успешной отправки
      sessionStorage.setItem("form_submitted", "true");

      // 🚀 Редирект на thank-you
      router.push("/thank-you");
    } catch (e) {
      console.error(e);
      // тут при желании можно показать toast / error state
    }
  };

  const t = dictionary;
  const yearsByDecade = useMemo(() => getYearsByDecade(t), [t]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md md:max-w-none mt-4"
    >
      {/* Desktop: Grid with 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* VIN */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">{t.form_vin}</Label>
          <Input
            {...register("vin")}
            placeholder={t.form_vin}
            maxLength={17}
            className="md:h-12 md:text-base"
          />
          {errors.vin && (
            <p className="text-sm md:text-base text-destructive">
              {errors.vin.message}
            </p>
          )}
        </div>

        {/* Name */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">{t.form_name}</Label>
          <Input
            {...register("name")}
            placeholder={t.form_name}
            className="md:h-12 md:text-base"
          />
          {errors.name && (
            <p className="text-sm md:text-base text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        {/* Phone */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">
            {t.form_phone}
            <span className="text-destructive">*</span>
          </Label>
          <PhoneInput
            register={register("phone")}
            error={errors.phone?.message}
            className="md:h-12 md:text-base"
          />
        </div>
      </div>

      {/* Desktop: Second row with 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Brand */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">{t.form_brand}</Label>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <GroupedSelect
                placeholder="Не выбрано"
                value={field.value}
                onValueChange={field.onChange}
                options={CAR_BRANDS}
                className="md:h-12 md:text-base"
              />
            )}
          />
          {errors.brand && (
            <p className="text-sm md:text-base text-destructive">
              {errors.brand.message}
            </p>
          )}
        </div>

        {/* Model */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">{t.form_model}</Label>
          <Input
            {...register("model")}
            placeholder={t.form_model}
            className="md:h-12 md:text-base"
          />
          {errors.model && (
            <p className="text-sm md:text-base text-destructive">
              {errors.model.message}
            </p>
          )}
        </div>

        {/* Year */}
        <div className="space-y-1 md:space-y-2">
          <Label className="md:text-base">{t.form_year}</Label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <GroupedSelect
                placeholder={t.form_year}
                value={field.value}
                onValueChange={field.onChange}
                options={yearsByDecade}
                className="md:h-12 md:text-base"
              />
            )}
          />
          {errors.year && (
            <p className="text-sm md:text-base text-destructive">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>
      {/* Honeypot field - скрытое поле */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <Input
          {...register("email")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Problem - Full width */}
      <div className="space-y-1 md:space-y-2">
        <Label className="md:text-base">
          {t.form_problem}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          {...register("problem")}
          placeholder={t.form_problem}
          rows={4}
          className="md:min-h-[120px] md:text-base"
        />
        {errors.problem && (
          <p className="text-sm md:text-base text-destructive">
            {errors.problem.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto md:h-12 md:px-8 md:text-base text-white"
      >
        {isSubmitting ? `${t.form_sending}` : `${t.form_send}`}
      </Button>
    </form>
  );
};

export default VinOrderForm;
